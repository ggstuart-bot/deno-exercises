import {
    createItem,
    deleteItem,
    getItemsByOwnerId,
    updateItem,
} from "../models/items.js";
import { getListsByOwnerId } from "../models/lists.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { itemView } from "../views/item.js";
import { itemsView } from "../views/items.js";

export function createItemController(ctx) {
    const { validated, data: { list } } = ctx;
    const item = createItem({ label: validated.label, listId: list.id });
    ctx.flash = `Item '${item.label}' created`;
    return redirect(`/items/${item.id}`, ctx);
}

export function itemsController(ctx) {
    const { user } = ctx;
    ctx.data.items = getItemsByOwnerId(user.id);
    [ctx.data.list] = getListsByOwnerId(user.id);
    return render(itemsView, ctx);
}

export function itemController(ctx) {
    return render(itemView, ctx);
}

export function editItemController(ctx) {
    const { validated, data: { item: { id } } } = ctx;
    const item = updateItem(id, validated.label);
    ctx.flash = `Item '${item.label}' updated`;
    return redirect(`/items/${item.id}`, ctx);
}

export function deleteItemController(ctx) {
    const { data: { item: { id } } } = ctx;
    const item = deleteItem(id);
    ctx.flash = `Item '${item.label}' deleted`;
    return redirect("/items", ctx);
}
