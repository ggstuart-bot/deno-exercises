import { SchemaValidationError, ValidationError } from "./errors.js";

function validateField(name, value, validators) {
    for (const validate of validators) {
        validate(name, value);
    }
}

export function validateSchema(formData, schema) {
    const errors = {};
    const validated = {};
    for (const [key, { validators, displayName }] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        try {
            validateField(displayName || key, value, validators);
            validated[key] = value;
        } catch (error) {
            if (!(error instanceof ValidationError)) throw error;
            errors[key] = { value, message: error.message };
        }
    }
    if (Object.keys(errors).length) {
        throw new SchemaValidationError(errors);
    }
    return validated;
}
