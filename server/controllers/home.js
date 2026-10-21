import { getPublicShelves } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { homeView } from "../views/home.js";

export function homeController(ctx) {
    ctx.data.publicShelves = getPublicShelves();
    return render(homeView, ctx);
}
