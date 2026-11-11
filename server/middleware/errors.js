import { NotFoundError } from "../tools/errors.js";
import { notFoundController } from "../controllers/notFound.js";
import { serverErrorController } from "../controllers/serverError.js";

export async function withErrors(ctx, next) {
    try {
        return await next(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log("Not found:", error.message);
            return notFoundController(ctx);
        }
        console.error(error);
        return serverErrorController(ctx);
    }
}
