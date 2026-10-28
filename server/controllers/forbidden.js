import { render } from "../tools/render.js";
import { forbiddenView } from "../views/forbidden.js";

export function forbiddenController(ctx) {
    ctx.status = 403;
    ctx.data.title = "Forbidden";
    return render(forbiddenView, ctx);
}
