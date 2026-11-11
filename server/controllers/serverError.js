import { render } from "../tools/render.js";
import { serverErrorView } from "../views/serverError.js";

export function serverErrorController(ctx) {
    ctx.status = 500;
    ctx.data.title = "Server error";
    return render(serverErrorView, ctx);
}
