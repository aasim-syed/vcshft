import React, { memo, useMemo } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

const cx = (...xs) => xs.filter(Boolean).join(" ");

const defaultHandleStyle = {
  width: 10,
  height: 10,
  borderRadius: 999,
};

const RenderHandles = memo(function RenderHandles({ handles = [], side }) {
  const pos = side === "left" ? Position.Left : Position.Right;
  return handles.map((h, idx) => {
    const top = 56 + idx * 22; // stable spacing
    return (
      <Handle
        key={h.id}
        id={h.id}
        type={h.type}
        position={pos}
        style={{
          ...defaultHandleStyle,
          top,
          background: h.color ?? (h.type === "target" ? "#22c55e" : "#3b82f6"),
          border: "2px solid rgba(255,255,255,0.85)",
        }}
        isConnectable={h.isConnectable ?? true}
      />
    );
  });
});

function Field({ nodeId, field, value }) {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const onChange = (next) => updateNodeField(nodeId, field.key, next);

  const common = {
    className: "vs-input",
    value: value ?? "",
    onChange: (e) => onChange(e.target.value),
  };

  if (field.type === "select") {
    return (
      <label className="vs-field">
        <div className="vs-label">{field.label}</div>
        <select {...common}>
          {(field.options ?? []).map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "number") {
    return (
      <label className="vs-field">
        <div className="vs-label">{field.label}</div>
        <input
          className="vs-input"
          type="number"
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          min={field.min}
          max={field.max}
          step={field.step}
        />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="vs-field">
        <div className="vs-label">{field.label}</div>
        <textarea
          className="vs-input vs-textarea"
          rows={field.rows ?? 4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    );
  }

  return (
    <label className="vs-field">
      <div className="vs-label">{field.label}</div>
      <input type="text" {...common} />
    </label>
  );
}

/**
 * BaseNode (config-driven)
 * config = { title, subtitle, icon, accent, inputs, outputs, fields, footer }
 */
export const BaseNode = memo(function BaseNode({ id, data, config }) {
  const inputs = useMemo(() => config.inputs ?? [], [config.inputs]);
  const outputs = useMemo(() => config.outputs ?? [], [config.outputs]);
  const fields = useMemo(() => config.fields ?? [], [config.fields]);

  return (
    <div className="vs-nodeWrap">
      <RenderHandles side="left" handles={inputs} />
      <RenderHandles side="right" handles={outputs} />

      <div className="vs-node">
        <div className={cx("vs-node__top", `bg-gradient-to-r ${config.accent}`)}>
          <div className="vs-node__topLeft">
            <div className="vs-node__icon">{config.icon ?? "⬡"}</div>
            <div>
              <div className="vs-node__title">{config.title}</div>
              {config.subtitle ? (
                <div className="vs-node__subtitle">{config.subtitle}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="vs-node__body">
          {fields.length ? (
            <div className="vs-fields">
              {fields.map((f) => (
                <Field
                  key={f.key}
                  nodeId={id}
                  field={f}
                  value={data?.[f.key]}
                />
              ))}
            </div>
          ) : (
            <div className="vs-muted">No settings</div>
          )}

          {typeof config.renderExtra === "function" ? (
            <div className="vs-extra">{config.renderExtra({ id, data })}</div>
          ) : null}
        </div>

        {config.footer ? (
          <div className="vs-node__footer">{config.footer}</div>
        ) : null}
      </div>
    </div>
  );
});
