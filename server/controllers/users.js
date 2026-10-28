import {
    createUser,
    getUsers,
    updateUserAvatarId,
    updateUserIsAdmin,
    updateUserIsPublic,
} from "../models/users.js";
import { getPublicShelvesByOwnerId, unpublishShelvesByOwnerId } from "../models/shelves.js";
import { addThumbnails } from "../models/shelfBooks.js";
import { createFile, deleteFileById, getFileById } from "../models/files.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";
import { usersView } from "../views/users.js";
import { userView } from "../views/user.js";

export function signupFormController(ctx) {
    ctx.data.title = "Sign up";
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
    ctx.data.title = "Users";
    return render(usersView, ctx);
}

export function userController(ctx) {
    const { data: { targetUser } } = ctx;
    ctx.data.publicShelves = addThumbnails(getPublicShelvesByOwnerId(targetUser.id));
    ctx.data.title = targetUser.username;
    return render(userView, ctx);
}

export function avatarController(ctx) {
    const { data: { targetUser } } = ctx;
    const avatarFile = targetUser.avatarId && getFileById(targetUser.avatarId);
    if (!avatarFile) {
        throw new NotFoundError(`No avatar for user ${targetUser.id}`);
    }
    return new Response(avatarFile);
}

export async function uploadAvatarController(ctx) {
    const { validated: { avatar }, data: { targetUser } } = ctx;
    const avatarId = await createFile(avatar);
    updateUserAvatarId(targetUser.id, avatarId);
    if (targetUser.avatarId) {
        deleteFileById(targetUser.avatarId);
    }
    ctx.flash = "Avatar updated";
    return redirect("/profile", ctx);
}

export function profileController(ctx) {
    return redirect(`/users/${ctx.user.id}`, ctx);
}

export function ownAdminStatusController(ctx) {
    ctx.flash = "You can't change your own admin status";
    return redirect("/users", ctx);
}

function adminStatusController(isAdmin) {
    return (ctx) => {
        const { data: { targetUser } } = ctx;
        updateUserIsAdmin(targetUser.id, isAdmin);
        ctx.flash = isAdmin
            ? `'${targetUser.username}' is now an admin`
            : `'${targetUser.username}' is no longer an admin`;
        return redirect("/users", ctx);
    };
}

export const promoteController = adminStatusController(1);
export const demoteController = adminStatusController(0);

// Unpublishing a profile also unpublishes its shelves,
// so a public shelf always has a public owner
function profileVisibilityController(isPublic) {
    return (ctx) => {
        const { data: { targetUser } } = ctx;
        updateUserIsPublic(targetUser.id, isPublic);
        if (!isPublic) {
            unpublishShelvesByOwnerId(targetUser.id);
        }
        ctx.flash = isPublic ? "Your profile is now public" : "Your profile is now private";
        return redirect("/profile", ctx);
    };
}

export const publishProfileController = profileVisibilityController(1);
export const unpublishProfileController = profileVisibilityController(0);
