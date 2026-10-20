import { getUserById } from "../models/users.js";
import { getListById } from "../models/lists.js";
import { getItemById } from "../models/items.js";
import { NotFoundError } from "../tools/errors.js";

export function withTargetUser(ctx, next) {
    const { params: { userId } } = ctx;
    const targetUser = getUserById(Number(userId));
    if (!targetUser) {
        throw new NotFoundError(`User ${userId} not found`);
    }
    ctx.data.targetUser = targetUser;
    return next(ctx);
}

export function withList(ctx, next) {
    const { params: { listId } } = ctx;
    const list = getListById(Number(listId));
    if (!list) {
        throw new NotFoundError(`List ${listId} not found`);
    }
    ctx.data.list = list;
    return next(ctx);
}

// Items are owned through their list, so this also loads the item's list.
// If withList already ran (a /lists/:listId/items/:itemId route), the item
// must belong to that list, otherwise any item could be reached via any list.
export function withItem(ctx, next) {
    const { params: { itemId }, data } = ctx;
    const item = getItemById(Number(itemId));
    if (!item) {
        throw new NotFoundError(`Item ${itemId} not found`);
    }
    if (data.list && item.listId !== data.list.id) {
        throw new NotFoundError(`Item ${itemId} is not in list ${data.list.id}`);
    }
    data.item = item;
    data.list ??= getListById(item.listId);
    return next(ctx);
}
