import { render } from "../tools/render.js";
import { aboutView } from "../views/about.js";

export function aboutController(ctx) {
    ctx.data.title = "About";
    return render(aboutView, ctx);
}
