import { between, required } from "../tools/validators.js";

export const shelfSchema = {
    title: {
        displayName: "Title",
        validators: [required, between(3, 25)],
    },
};
