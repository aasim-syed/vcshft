import React from "react";
import { BaseNode } from "./BaseNode";
import { NODE_DEFS } from "./nodeRegistry";

export const OutputNode = (props) => <BaseNode {...props} config={NODE_DEFS.customOutput} />;
