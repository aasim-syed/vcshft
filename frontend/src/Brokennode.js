import { useStore } from "./store";

export const BrokenDemoButton = () => {
  const { setNodes, setEdges } = useStore();

  const loadBrokenDemo = () => {
    const nodes = [
      {
        id: "text-incident",
        type: "text",
        position: { x: 300, y: 200 },
        data: {
          text: "Incident {{incident_id}} impacted {{service}}"
        }
      },
      {
        id: "llm-analyze",
        type: "llm",
        position: { x: 600, y: 200 },
        data: {}
      },
      {
        id: "merge-loop",
        type: "merge",
        position: { x: 900, y: 200 },
        data: {}
      }
    ];

    const edges = [
      {
        id: "e1",
        source: "text-incident",
        target: "llm-analyze"
      },
      {
        id: "e2",
        source: "llm-analyze",
        target: "merge-loop"
      },
      {
        id: "e3",
        source: "merge-loop",
        target: "text-incident"
      }
    ];

    setNodes(nodes);
    setEdges(edges);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 6 }}>
      <button
        onClick={loadBrokenDemo}
        style={{ background: "#5c1a1a", color: "#fff" }}
      >
        Load Broken Pipeline (Intentional)
      </button>
    </div>
  );
};
