export const NODE_DEFS = {
    customInput: {
      title: "Input",
      subtitle: "Entry point",
      icon: "⟲",
      accent: "from-emerald-500 to-teal-400",
      outputs: [{ id: "out", type: "source" }],
      fields: [
        { key: "inputName", label: "Name", type: "text" },
        { key: "inputType", label: "Type", type: "select", options: ["Text", "File"] },
      ],
    },
  
    llm: {
      title: "LLM",
      subtitle: "Model call",
      icon: "🧠",
      accent: "from-fuchsia-500 to-indigo-500",
      inputs: [
        { id: "system", type: "target" },
        { id: "prompt", type: "target" },
      ],
      outputs: [{ id: "response", type: "source" }],
      fields: [
        { key: "model", label: "Model", type: "select", options: ["gpt-4o-mini", "gpt-4.1-mini", "claude", "local"] },
        { key: "temperature", label: "Temperature", type: "number", min: 0, max: 2, step: 0.1 },
      ],
    },
  
    customOutput: {
      title: "Output",
      subtitle: "Terminal",
      icon: "⤴",
      accent: "from-sky-500 to-indigo-500",
      inputs: [{ id: "in", type: "target" }],
      fields: [
        { key: "outputName", label: "Name", type: "text" },
        { key: "outputType", label: "Type", type: "select", options: ["Text", "Image"] },
      ],
    },
  
    // ---- 5 NEW NODES (demo) ----
    merge: {
      title: "Merge",
      subtitle: "Join streams",
      icon: "⎇",
      accent: "from-violet-500 to-fuchsia-500",
      inputs: [{ id: "a", type: "target" }, { id: "b", type: "target" }, { id: "c", type: "target" }],
      outputs: [{ id: "out", type: "source" }],
      fields: [{ key: "mode", label: "Mode", type: "select", options: ["concat", "json_merge", "array"] }],
    },
  
    math: {
      title: "Math",
      subtitle: "Basic ops",
      icon: "∑",
      accent: "from-cyan-500 to-sky-500",
      inputs: [{ id: "x", type: "target" }, { id: "y", type: "target" }],
      outputs: [{ id: "out", type: "source" }],
      fields: [{ key: "op", label: "Operation", type: "select", options: ["+", "-", "*", "/"] }],
    },
  
    delay: {
      title: "Delay",
      subtitle: "Throttle",
      icon: "⏳",
      accent: "from-rose-500 to-pink-500",
      inputs: [{ id: "in", type: "target" }],
      outputs: [{ id: "out", type: "source" }],
      fields: [{ key: "ms", label: "Delay (ms)", type: "number", min: 0, step: 50 }],
    },
  
    apiRequest: {
      title: "API Request",
      subtitle: "HTTP call",
      icon: "⇄",
      accent: "from-lime-500 to-emerald-500",
      inputs: [{ id: "payload", type: "target" }],
      outputs: [{ id: "response", type: "source" }],
      fields: [
        { key: "method", label: "Method", type: "select", options: ["GET", "POST", "PUT", "DELETE"] },
        { key: "url", label: "URL", type: "text" },
      ],
    },
  
    booleanGate: {
      title: "Boolean Gate",
      subtitle: "AND / OR / NOT",
      icon: "∧",
      accent: "from-amber-500 to-orange-500",
      inputs: [{ id: "a", type: "target" }, { id: "b", type: "target" }],
      outputs: [{ id: "out", type: "source" }],
      fields: [{ key: "op", label: "Operation", type: "select", options: ["AND", "OR", "NOT"] }],
    },
  };
  