import { currentSession } from "../tools/authentication.js";
import { getUserById } from "../models/users.js";

export function withSession(ctx, next) {
    ctx.session = currentSession(ctx);
    ctx.user = ctx.session && getUserById(ctx.session.userId);
    return next(ctx);
}
