import { useStore } from "./store";
import { shallow } from "zustand/shallow";

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (s) => ({ nodes: s.nodes, edges: s.edges }),
    shallow
  );

  const onSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error (${res.status}): ${text}`);
      }

      const data = await res.json();

      alert(
        `Pipeline analysis:\n\n` +
          `• Nodes: ${data.num_nodes}\n` +
          `• Edges: ${data.num_edges}\n` +
          `• DAG: ${data.is_dag ? "Yes ✅" : "No ❌ (cycle detected)"}`
      );
    } catch (err) {
      alert(err?.message ?? "Submit failed");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};
