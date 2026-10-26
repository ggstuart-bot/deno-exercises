import { required } from "../tools/validators.js";

export const signinSchema = {
    username: { validators: [required] },
    password: { validators: [required] },
};
