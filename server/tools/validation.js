import { SchemaValidationError, ValidationError } from "./errors.js";

function validateField(name, value, validators) {
    for (const validate of validators) {
        validate(name, value);
    }
}

export function validateSchema(formData, schema) {
    const errors = {};
    const validated = {};
    const values = {};
    for (const [key, { validators, displayName }] of Object.entries(schema)) {
        const value = formData.get(key) ?? "";
        values[key] = value;
        try {
            validateField(displayName || key, value, validators);
            validated[key] = value;
        } catch (error) {
            if (!(error instanceof ValidationError)) throw error;
            errors[key] = error.message;
        }
    }
    if (Object.keys(errors).length) {
        throw new SchemaValidationError(errors, values);
    }
    return validated;
}
