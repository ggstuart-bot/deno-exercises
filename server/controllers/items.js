import {
    createItem,
    deleteItem,
    getItemById,
    getItemsByOwnerId,
    updateItem,
} from "../models/items.js";
import { getListsByOwnerId } from "../models/lists.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { itemView } from "../views/item.js";
import { itemsView } from "../views/items.js";

export function createItemController(ctx) {
    const { validated, user } = ctx;
    const [list] = getListsByOwnerId(user.id);
    const item = createItem({ label: validated.label, listId: list.id });
    ctx.flash = `Item '${item.label}' created`;
    return redirect(`/items/${item.id}`, ctx);
}

export function itemsController(ctx) {
    ctx.data.items = getItemsByOwnerId(ctx.user.id);
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

export function editItemController(ctx) {
    const { validated, params: { itemId } } = ctx;
    const item = updateItem(Number(itemId), validated.label);
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    ctx.flash = `Item '${item.label}' updated`;
    return redirect(`/items/${item.id}`, ctx);
}

export function deleteItemController(ctx) {
    const { params: { itemId } } = ctx;
    const item = deleteItem(Number(itemId));
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    ctx.flash = `Item '${item.label}' deleted`;
    return redirect("/items", ctx);
}
