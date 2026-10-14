import render from "../tools/render.js";
import itemsView from "../views/items.js";

export function itemsController(ctx) { 
    ctx.view = itemsView;
    return render(ctx);
}
