import { getUserById } from "../models/users.js";
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
