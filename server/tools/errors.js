export class NotFoundError extends Error {}

export class ValidationError extends Error {}

export class SchemaValidationError extends Error {
    constructor(errors, values) {
        super("validation failed");
        this.errors = errors;
        this.values = values;
    }
}
