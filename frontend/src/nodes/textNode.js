import React, { memo, useEffect, useMemo, useRef } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

const VAR_RE = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;

function extractVars(text) {
  const set = new Set();
  if (!text) return [];
  let m;
  while ((m = VAR_RE.exec(text)) !== null) set.add(m[1]);
  return Array.from(set);
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export const TextNode = memo(function TextNode({ id, data }) {
  const updateNodeData = useStore((s) => s.updateNodeData);
  const text = data?.text ?? "{{input}}";
  const textareaRef = useRef(null);

  const vars = useMemo(() => extractVars(text), [text]);

  const setText = (next) => {
    updateNodeData(id, { ...(data ?? {}), text: next });
  };

  // Autosize height + width
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const h = clamp(el.scrollHeight, 90, 420);
    el.style.height = `${h}px`;

    const lines = text.split("\n");
    const longest = lines.reduce((mx, l) => Math.max(mx, l.length), 0);
    const w = clamp(260 + longest * 6.5, 260, 460);

    // Only update if changed (prevents render loops)
    const prevW = data?.width ?? 260;
    const prevH = data?.height ?? 90;
    if (prevW !== w || prevH !== h) {
      updateNodeData(id, { ...(data ?? {}), text, width: w, height: h });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const w = data?.width ?? 260;
  const h = data?.height ?? 90;

  return (
    <div className="vs-nodeWrap" style={{ width: w }}>
      {/* variable handles */}
      {vars.map((v, idx) => (
        <Handle
          key={v}
          id={`var:${v}`}
          type="target"
          position={Position.Left}
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            top: 56 + idx * 22,
            background: "#22c55e",
            border: "2px solid rgba(255,255,255,0.85)",
          }}
        />
      ))}

      {/* output handle */}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          top: 56,
          background: "#3b82f6",
          border: "2px solid rgba(255,255,255,0.85)",
        }}
      />

      <div className="vs-node" style={{ minHeight: h + 70 }}>
        <div className="vs-node__top bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          <div className="vs-node__topLeft">
            <div className="vs-node__icon">✎</div>
            <div>
              <div className="vs-node__title">Text</div>
              <div className="vs-node__subtitle">
                Variables: {vars.length ? vars.join(", ") : "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="vs-node__body">
          <label className="vs-field">
            <div className="vs-label">Text (supports {"{{ var }}"})</div>
            <textarea
              ref={textareaRef}
              className="vs-input vs-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Hello {{ input }}!"
              style={{ width: "100%" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
});
