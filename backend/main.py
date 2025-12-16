from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List, Set
from collections import defaultdict, deque

app = FastAPI()

# Allow frontend (localhost:3000) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}

# -----------------------
# Request Models
# -----------------------

class NodeModel(BaseModel):
    id: str
    type: str | None = None
    data: Dict[str, Any] | None = None


class EdgeModel(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelinePayload(BaseModel):
    nodes: List[NodeModel]
    edges: List[EdgeModel]

# -----------------------
# DAG Check Logic
# -----------------------

def is_dag(nodes: List[NodeModel], edges: List[EdgeModel]) -> bool:
    """
    Checks whether the graph defined by nodes and edges
    is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    Time complexity: O(N + E)
    """
    node_ids: Set[str] = {node.id for node in nodes}

    # Empty graph is a DAG
    if not node_ids:
        return True

    adjacency = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        # Invalid reference => not a valid DAG pipeline
        if edge.source not in node_ids or edge.target not in node_ids:
            return False

        adjacency[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque([nid for nid, deg in indegree.items() if deg == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in adjacency[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    # If all nodes were visited, no cycle exists
    return visited == len(node_ids)

# -----------------------
# API Endpoint
# -----------------------

@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag_status = is_dag(payload.nodes, payload.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status,
    }
