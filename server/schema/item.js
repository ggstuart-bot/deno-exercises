import { between, required } from "../tools/validators.js";

export const LABEL_MIN = 3;
export const LABEL_MAX = 25;

export const itemSchema = {
    label: {
        displayName: "Label",
        validators: [required, between(LABEL_MIN, LABEL_MAX)],
    },
};
