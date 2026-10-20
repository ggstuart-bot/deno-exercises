import { createUser, getUserById, getUsers, makeAdmin } from "../models/users.js";
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

export function makeAdminController(ctx) {
    const { params: { userId } } = ctx;
    const user = getUserById(Number(userId));
    if (!user) {
        throw new NotFoundError(`User ${userId} not found`);
    }
    makeAdmin(user.id);
    ctx.flash = `'${user.username}' is now an admin`;
    return redirect("/users", ctx);
}