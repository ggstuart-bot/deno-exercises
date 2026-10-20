import { between, required } from "../tools/validators.js";

export const listSchema = {
    title: {
        displayName: "Title",
        validators: [required, between(3, 25)],
    },
};
