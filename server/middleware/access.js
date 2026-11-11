import { ForbiddenError, NotFoundError } from "../tools/errors.js";

export function requireUser(fallback) {
    return (ctx, next) => {
        if (ctx.user) return next(ctx);
        return fallback(ctx);
    };
}

export function requireGuest(fallback) {
    return (ctx, next) => {
        if (!ctx.user) return next(ctx);
        return fallback(ctx);
    };
}

export function requireAdmin(ctx, next) {
    if (ctx.user?.isAdmin) return next(ctx);
    const { url, request } = ctx;
    throw new ForbiddenError(`${request.method} ${url.pathname} is for admins only`);
}

export function requirePermission(predicate, key, DeadEnd = NotFoundError) {
    return (ctx, next) => {
        if (predicate(ctx.user, ctx.data[key])) return next(ctx);
        const { url, request } = ctx;
        throw new DeadEnd(`${request.method} ${url.pathname} is not permitted`);
    };
}
