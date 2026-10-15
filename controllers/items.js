import { getItemById, getItems } from "../models/items.js";
import { NotFoundError } from "../tools/errors.js";
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
    const item = getItemById(Number(itemId));
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    ctx.data.item = item;
    ctx.view = itemView;
    return render(ctx);
}