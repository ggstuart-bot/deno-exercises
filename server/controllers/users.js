import { createUser, getUserById, getUsers, setAdmin } from "../models/users.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";
import { usersView } from "../views/users.js";
import { profileView } from "../views/profile.js";
import { forbiddenController } from "./auth.js";

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
    const user = getUserById(Number(userId));
    if (!user) {
        throw new NotFoundError(`User ${userId} not found`);
    }
    if (user.id === ctx.user.id) {
        return forbiddenController(ctx);
    }
    setAdmin(user.id, isAdmin);
    ctx.flash = isAdmin
        ? `'${user.username}' is now an admin`
        : `'${user.username}' is no longer an admin`;
    return redirect("/users", ctx);
}