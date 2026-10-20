import { createUser, getUsers, updateIsAdmin } from "../models/users.js";
import { getFile } from "../models/files.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";
import { usersView } from "../views/users.js";
import { userDetailView } from "../views/userDetail.js";

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

export function userController(ctx) {
    return render(userDetailView, ctx);
}

export function avatarController(ctx) {
    const { data: { targetUser } } = ctx;
    const avatarFile = targetUser.avatarId && getFile(targetUser.avatarId);
    if (!avatarFile) {
        throw new NotFoundError(`No avatar for user ${targetUser.id}`);
    }
    return new Response(avatarFile);
}

export function profileController(ctx) {
    return redirect(`/users/${ctx.user.id}`, ctx);
}

export function selfChangeController(ctx) {
    ctx.flash = "You can't change your own admin status";
    return redirect("/users", ctx);
}

function adminStatusController(isAdmin) {
    return (ctx) => {
        const { data: { targetUser } } = ctx;
        updateIsAdmin(targetUser.id, isAdmin);
        ctx.flash = isAdmin
            ? `'${targetUser.username}' is now an admin`
            : `'${targetUser.username}' is no longer an admin`;
        return redirect("/users", ctx);
    };
}

export const promoteController = adminStatusController(1);
export const demoteController = adminStatusController(0);