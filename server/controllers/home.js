import { getListsByOwnerId } from "../models/lists.js";
import { render } from "../tools/render.js";
import { homeView } from "../views/home.js";

export function homeController(ctx) {
    const { user } = ctx;
    if (user) {
        ctx.data.lists = getListsByOwnerId(user.id);
    }
    return render(homeView, ctx);
}
