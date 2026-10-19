import { between, hasDigit, hasSymbol, minLength, required } from "../tools/validators.js";

export const userSchema = {
    username: {
        displayName: "Username",
        validators: [required, between(3, 50)],
    },
    password: {
        displayName: "Password",
        validators: [required, minLength(8), hasDigit, hasSymbol],
    }
};
