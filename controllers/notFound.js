import render from "../tools/render.js";
import notFoundView from "../views/notFound.js";

export function notFoundController(ctx) {
    ctx.view = notFoundView;
    ctx.status = 404;
    return render(ctx);
}
