import { render } from "../tools/render.js";
import { errorView } from "../views/error.js";

export function notFoundController(ctx) {
    ctx.status = 404;
    ctx.data.title = "Not found";
    ctx.data.message = "The requested resource was not found.";
    return render(errorView, ctx);
}

export function forbiddenController(ctx) {
    ctx.status = 403;
    ctx.data.title = "Forbidden";
    ctx.data.message = "You do not have permission to take the requested action.";
    return render(errorView, ctx);
}

export function serverErrorController(ctx) {
    ctx.status = 500;
    ctx.data.title = "Server error";
    ctx.data.message = "Something went wrong on the server.";
    return render(errorView, ctx);
}
