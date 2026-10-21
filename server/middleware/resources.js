import { getUserById } from "../models/users.js";
import { getListById } from "../models/lists.js";
import { getBookById } from "../models/books.js";
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

export function withBook(ctx, next) {
    const { params: { bookId } } = ctx;
    const book = getBookById(Number(bookId));
    if (!book) {
        throw new NotFoundError(`Book ${bookId} not found`);
    }
    ctx.data.book = book;
    return next(ctx);
}
