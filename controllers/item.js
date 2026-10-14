import { getById } from "../models/items.js";
import render from "../tools/render.js";
import itemView from "../views/item.js";
import { notFoundController } from "./notFound.js";

export function itemController(ctx) { 
    const { params: { id } } = ctx;
    const item = getById(Number(id));
    if (!item) {
        return notFoundController(ctx);
    }
    ctx.data.item = item;
    ctx.view = itemView;
    return render(ctx);
}
