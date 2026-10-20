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

// Use after withList. Items are owned through their list, so the item must
// belong to the list in the URL, otherwise any item could be reached via any list.
export function withItem(ctx, next) {
    const { params: { itemId }, data: { list } } = ctx;
    const item = getItemById(Number(itemId));
    if (!item || item.listId !== list.id) {
        throw new NotFoundError(`Item ${itemId} not found in list ${list.id}`);
    }
    ctx.data.item = item;
    return next(ctx);
}
