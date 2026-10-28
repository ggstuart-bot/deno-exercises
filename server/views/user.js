import { html } from "../tools/html.js";
import { shelfCard } from "./partials/shelfCard.js";
import {
    canChangeAdmin,
    canChangeAvatar,
    canPublishProfile,
    isSelf,
} from "../tools/permissions.js";
import { adminButton } from "./partials/adminButton.js";
import { cardGrid } from "./partials/cardGrid.js";
import { avatarImage } from "./partials/avatarImage.js";
import { postButton } from "./partials/postButton.js";
import { AVATAR_TYPES } from "../schema/avatar.js";

export function userView(ctx) {
    const { data: { targetUser, publicShelves, errors }, user: currentUser } = ctx;
    // Only you (or an admin) get controls, so only then is there an aside
    const hasControls = isSelf(currentUser, targetUser) || canChangeAdmin(currentUser, targetUser);

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
                ${targetUser.isAdmin ? html`<p><span class="badge">admin</span></p>` : ""}
            </header>
            ${avatarImage(targetUser, `Avatar for '${targetUser.username}'`)}
            <h2>Public shelves</h2>
            ${cardGrid(publicShelves.map((shelf) => shelfCard(shelf)), "No public shelves")}
        </section>
        ${hasControls
            ? html`<aside>
        ${canChangeAvatar(currentUser, targetUser) ? avatarForm(targetUser, errors) : ""}
        ${
                canChangeAdmin(currentUser, targetUser)
                    ? html`<h2>Admin status</h2>${adminButton(targetUser)}`
                    : ""
            }
        ${canPublishProfile(currentUser, targetUser) ? visibilityForm(targetUser) : ""}
    </aside>`
            : ""}
    `;
}

function avatarForm(user, errors) {
    return html`
        <h2>Change avatar</h2>
        <form class="secondary" method="POST" action="/users/${user.id}/avatar"
            enctype="multipart/form-data">
            <label for="avatar">Avatar</label>
            <input id="avatar" type="file" name="avatar" accept="${AVATAR_TYPES.join(",")}" required
                aria-describedby="avatar-error" aria-invalid="${Boolean(errors?.avatar)}">
            <span id="avatar-error" class="error">${errors?.avatar ?? ""}</span>
            <button>upload avatar</button>
        </form>
    `;
}

function visibilityForm(user) {
    const action = user.isPublic ? "unpublish" : "publish";
    const label = user.isPublic ? "make profile private" : "make profile public";
    return html`
        <h2>Profile is ${user.isPublic ? "public" : "private"}</h2>
        <p>${user.isPublic ? "Anyone" : "Only you"} can see your profile and public shelves</p>
        ${postButton(`/users/${user.id}/${action}`, label)}
    `;
}
