import { required } from "../tools/validators.js";

export const signinSchema = {
    username: {
        displayName: "Username",
        validators: [required],
    },
    password: {
        displayName: "Password",
        validators: [required],
    },
};
