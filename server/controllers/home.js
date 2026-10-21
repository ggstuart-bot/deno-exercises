import { getPublicShelves } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { homeView } from "../views/home.js";

export function homeController(ctx) {
    const { user } = ctx;
    if (user) {
        ctx.data.publicShelves = getPublicShelves(user.id);
    }
    return render(homeView, ctx);
}
