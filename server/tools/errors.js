export class NotFoundError extends Error {}

export class ValidationError extends Error {}
export class SchemaValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
    }
}
