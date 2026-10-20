import { createItem, deleteItem, updateItem } from "../models/items.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { itemView } from "../views/item.js";

export function createItemController(ctx) {
    const { validated, data: { list } } = ctx;
    const item = createItem({ label: validated.label, listId: list.id });
    ctx.flash = `Item '${item.label}' created`;
    return redirect(`/lists/${list.id}`, ctx);
}

export function itemController(ctx) {
    return render(itemView, ctx);
}

export function editItemController(ctx) {
    const { validated, data: { list, item: { id } } } = ctx;
    const item = updateItem(id, validated.label);
    ctx.flash = `Item '${item.label}' updated`;
    return redirect(`/lists/${list.id}`, ctx);
}

export function deleteItemController(ctx) {
    const { data: { list, item: { id } } } = ctx;
    const item = deleteItem(id);
    ctx.flash = `Item '${item.label}' deleted`;
    return redirect(`/lists/${list.id}`, ctx);
}
