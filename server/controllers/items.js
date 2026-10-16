import { createItem, deleteItem, getItemById, getItems, updateItem } from "../models/items.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { itemView } from "../views/item.js";
import { itemsView } from "../views/items.js";

export async function createItemController(ctx) { 
    const { request } = ctx;
    const formData = await request.formData();
    const item = createItem(formData.get("label"));
    return redirect(`/items/${item.id}`);
}

export function itemsController(ctx) { 
    ctx.data.items = getItems();
    return render(itemsView, ctx);
}

export function itemController(ctx) {
    const { params: { itemId } } = ctx;
    const item = getItemById(Number(itemId));
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    ctx.data.item = item;
    return render(itemView, ctx);
}

export async function editItemController(ctx) {
    const { request, params: { itemId } } = ctx;
    const formData = await request.formData();
    const item = updateItem(Number(itemId), formData.get("label"));
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    return redirect(`/items/${item.id}`);
}

export function deleteItemController(ctx) {
    const { params: { itemId } } = ctx;
    const item = deleteItem(Number(itemId));
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    return redirect("/items");
}
