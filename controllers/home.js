import render from "../tools/render.js";
import homeView from "../views/home.js";

export function homeController(ctx) {
    ctx.view = homeView;
    return render(ctx);
}
