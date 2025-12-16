import React from "react";
import { BaseNode } from "./BaseNode";
import { NODE_DEFS } from "./nodeRegistry";

export const MergeNode = (props) => <BaseNode {...props} config={NODE_DEFS.merge} />;
export const MathNode = (props) => <BaseNode {...props} config={NODE_DEFS.math} />;
export const DelayNode = (props) => <BaseNode {...props} config={NODE_DEFS.delay} />;
export const ApiRequestNode = (props) => <BaseNode {...props} config={NODE_DEFS.apiRequest} />;
export const BooleanGateNode = (props) => <BaseNode {...props} config={NODE_DEFS.booleanGate} />;
