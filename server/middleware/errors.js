import { NotFoundError } from "../tools/errors.js";
import { notFoundController } from "../controllers/notFound.js";
import { serverErrorController } from "../controllers/serverError.js";

export async function withErrors(ctx, next) {
    try {
        return await next(ctx);
    } catch (error) {
        ctx.error = error;
        if (error instanceof NotFoundError) return notFoundController(ctx);
        return serverErrorController(ctx);
    }
}
