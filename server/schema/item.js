import { between, required } from "../tools/validators.js";

export const itemSchema = {
    label: {
        displayName: "Label",
        validators: [required, between(3, 25)],
    },
};
