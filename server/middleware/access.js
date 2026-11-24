// The require* middlewares are about you alone: signed in, signed out or an admin.
// The may* guards in main.js are made with requirePermission from the can* predicates
// in permissions.js, and the views use the same predicate to hide the button.
// What belongs to whom is a 404, so we don't let on that it exists.
// Your status (an admin, a public profile) is a 403.
import { ForbiddenError, NotFoundError } from "../tools/errors.js";
import { isAdmin } from "../tools/permissions.js";

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
    if (isAdmin(ctx.user)) return next(ctx);
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
