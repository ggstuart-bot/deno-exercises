import { createUser, getUserById, getUsers, setAdmin } from "../models/users.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";
import { usersView } from "../views/users.js";
import { profileView } from "../views/profile.js";

export function signupFormController(ctx) { 
    return render(signupView, ctx);
}

export async function createUserController(ctx) {
    const { validated } = ctx;
    const user = await createUser(validated);
    ctx.flash = `User '${user.username}' created`;
    return redirect("/signin", ctx);
}

export function usersController(ctx) {
    ctx.data.users = getUsers();
    return render(usersView, ctx);
}

export function profileController(ctx) {
    return render(profileView, ctx);
}

export function promoteController(ctx) {
    return changeAdmin(ctx, 1);
}

export function demoteController(ctx) {
    return changeAdmin(ctx, 0);
}

function changeAdmin(ctx, isAdmin) {
    const { params: { userId } } = ctx;
    const targetUser = getUserById(Number(userId));
    if (!targetUser) {
        throw new NotFoundError(`User ${userId} not found`);
    }
    if (targetUser.id === ctx.user.id) {
        ctx.flash = "You can't change your own admin status";
        return redirect("/users", ctx);
    }
    setAdmin(targetUser.id, isAdmin);
    ctx.flash = isAdmin
        ? `'${targetUser.username}' is now an admin`
        : `'${targetUser.username}' is no longer an admin`;
    return redirect("/users", ctx);
}