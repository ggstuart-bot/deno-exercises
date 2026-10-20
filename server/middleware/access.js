export function requireUser(fallback) {
    return (ctx, next) => ctx.user ? next(ctx) : fallback(ctx);
}

export function requireGuest(fallback) {
    return (ctx, next) => ctx.user ? fallback(ctx) : next(ctx);
}

export function requireAdmin(fallback) {
    return (ctx, next) => ctx.user?.isAdmin ? next(ctx) : fallback(ctx);
}

export function allow(predicate, key, fallback) {
    return (ctx, next) => predicate(ctx.user, ctx.data[key]) ? next(ctx) : fallback(ctx);
}