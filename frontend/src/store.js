import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodeIDs: {},

  nodes: [],
  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  getNodeID: (type) => {
    const nodeIDs = { ...get().nodeIDs };
    nodeIDs[type] = (nodeIDs[type] ?? 0) + 1;
    set({ nodeIDs });
    return `${type}-${nodeIDs[type]}`;
  },

  addNode: (node) => set({ nodes: [...get().nodes, node] }),

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: (connection) =>
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    }),

  // field-level updates (simple nodes)
  updateNodeField: (nodeId, fieldName, fieldValue) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...(node.data ?? {}), [fieldName]: fieldValue } }
          : node
      ),
    }),

  // full data replacement (needed for BaseNode + TextNode autosize)
  updateNodeData: (nodeId, nextData) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: nextData } : node
      ),
    }),
}));
