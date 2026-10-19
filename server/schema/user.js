import { usernameExists } from "../models/users.js";
import { between, hasDigit, hasSymbol, minLength, required, unique } from "../tools/validators.js";

export const userSchema = {
    username: {
        displayName: "Username",
        validators: [required, between(3, 50), unique(usernameExists)],
    },
    password: {
        displayName: "Password",
        validators: [required, minLength(8), hasDigit, hasSymbol],
    }
};
