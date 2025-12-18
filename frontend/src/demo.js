import { useStore } from "./store";

export const DemoButton = () => {
  const { setNodes, setEdges } = useStore();

  const loadDemo = () => {
    // --- Nodes ---
    const nodes = [
      {
        id: "input-incident",
        type: "customInput",
        position: { x: 50, y: 80 },
        data: { inputName: "incident_id", inputType: "Text" },
      },
      {
        id: "input-service",
        type: "customInput",
        position: { x: 50, y: 160 },
        data: { inputName: "affected_service", inputType: "Text" },
      },
      {
        id: "input-start",
        type: "customInput",
        position: { x: 50, y: 240 },
        data: { inputName: "start_time", inputType: "Text" },
      },
      {
        id: "input-end",
        type: "customInput",
        position: { x: 50, y: 320 },
        data: { inputName: "end_time", inputType: "Text" },
      },
      {
        id: "text-template",
        type: "text",
        position: { x: 350, y: 180 },
        data: {
          text: `Incident {{incident_id}} affected {{affected_service}}.

Timeline:
- Start: {{start_time}}
- End: {{end_time}}`,
        },
      },
      {
        id: "llm-analysis",
        type: "llm",
        position: { x: 700, y: 180 },
        data: { model: "gpt-4o-mini", temperature: 0.3 },
      },
      {
        id: "output-postmortem",
        type: "customOutput",
        position: { x: 1000, y: 200 },
        data: { outputName: "postmortem_doc", outputType: "Text" },
      },
    ];

    // --- Edges ---
    const edges = [
      { id: "e1", source: "input-incident", target: "text-template", targetHandle: "var:incident_id" },
      { id: "e2", source: "input-service", target: "text-template", targetHandle: "var:affected_service" },
      { id: "e3", source: "input-start", target: "text-template", targetHandle: "var:start_time" },
      { id: "e4", source: "input-end", target: "text-template", targetHandle: "var:end_time" },
      { id: "e5", source: "text-template", target: "llm-analysis", sourceHandle: "out" },
      { id: "e6", source: "llm-analysis", target: "output-postmortem" },
    ];

    setNodes(nodes);
    setEdges(edges);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
      <button onClick={loadDemo}>Load Demo Pipeline</button>
    </div>
  );
};
