import { getItem, getItems } from "../models/items.js";
import render from "../tools/render.js";
import itemView from "../views/item.js";
import itemsView from "../views/items.js";

export function itemsController(ctx) { 
    ctx.data.items = getItems();
    ctx.view = itemsView;
    return render(ctx);
}

export function itemController(ctx) {
    const { params: { itemId } } = ctx;
    ctx.data.item = getItem(itemId);
    ctx.view = itemView;
    return render(ctx);
}