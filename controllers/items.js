import { getItems } from "../models/items.js";
import render from "../tools/render.js";
import itemsView from "../views/items.js";

export function itemsController(ctx) { 
    ctx.data.items = getItems();
    ctx.view = itemsView;
    return render(ctx);
}
