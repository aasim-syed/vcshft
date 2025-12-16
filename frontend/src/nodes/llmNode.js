import React from "react";
import { BaseNode } from "./BaseNode";
import { NODE_DEFS } from "./nodeRegistry";

export const LLMNode = (props) => <BaseNode {...props} config={NODE_DEFS.llm} />;
