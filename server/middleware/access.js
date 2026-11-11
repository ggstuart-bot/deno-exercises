import { ForbiddenError, NotFoundError } from "../tools/errors.js";

export function requireUser(fallback) {
    return (ctx, next) => ctx.user ? next(ctx) : fallback(ctx);
}

export function requireGuest(fallback) {
    return (ctx, next) => ctx.user ? fallback(ctx) : next(ctx);
}

export function requireAdmin(ctx, next) {
    if (ctx.user?.isAdmin) return next(ctx);
    const { url, request } = ctx;
    throw new ForbiddenError(`${request.method} ${url.pathname} is for admins only`);
}

export function requirePermission(predicate, key, fallback = hidden) {
    return (ctx, next) => predicate(ctx.user, ctx.data[key]) ? next(ctx) : fallback(ctx);
}

function hidden(ctx) {
    const { url, request } = ctx;
    throw new NotFoundError(`${request.method} ${url.pathname} is hidden from this user`);
}
