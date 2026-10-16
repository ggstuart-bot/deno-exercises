import { SchemaValidationError } from "../tools/errors.js";
import { validateSchema } from "../tools/validation.js";

export default function withValidation(schema, fallback) {
    return async (ctx, next) => { 
        const { request } = ctx;
        const formData = await request.formData();
        try {
            ctx.validated = validateSchema(formData, schema);
            return next(ctx);
        } catch (error) {
            if (!(error instanceof SchemaValidationError)) throw error;
            ctx.data.errors = error.errors;
            return fallback(ctx);
        }
    }
}