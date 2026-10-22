import { getPublicShelves } from "../models/shelves.js";
import { addThumbnails } from "../models/shelfBooks.js";
import { render } from "../tools/render.js";
import { homeView } from "../views/home.js";

export function homeController(ctx) {
    ctx.data.publicShelves = addThumbnails(getPublicShelves());
    return render(homeView, ctx);
}
