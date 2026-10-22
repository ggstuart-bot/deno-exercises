import { html } from "../tools/html.js";
import { shelfCard } from "./shelfCard.js";
import { canChangeAdmin, canChangeAvatar, canPublishProfile, isSelf } from "../tools/permissions.js";
import { adminButton } from "./users.js";
import { avatarImage } from "./avatar.js";
import { AVATAR_TYPES } from "../schema/avatar.js";

export function userDetailView(ctx) {
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
        ${publicShelves.length
            ? html`<ul class="grid wide">
${publicShelves.map((shelf) => shelfCard(shelf))}
        </ul>`
            : html`<p>No public shelves</p>`}
    </section>
    ${hasControls ? html`<aside>
        ${canChangeAvatar(currentUser, targetUser) ? avatarForm(targetUser, errors) : ""}
        ${canChangeAdmin(currentUser, targetUser) ? html`<h2>Admin status</h2>${adminButton(targetUser)}` : ""}
        ${canPublishProfile(currentUser, targetUser) ? visibilityForm(targetUser) : ""}
    </aside>` : ""}
    `;
}

function avatarForm(user, errors) {
    return html`
        <h2>Change avatar</h2>
        <form class="secondary" method="POST" action="/users/${user.id}/avatar" enctype="multipart/form-data">
            <label for="avatar">Avatar</label>
            <input id="avatar" type="file" name="avatar" accept="${AVATAR_TYPES.join(",")}" required
                aria-describedby="avatar-error" aria-invalid="${Boolean(errors?.avatar)}">
            <span id="avatar-error" class="error">${errors?.avatar ?? ""}</span>
            <button>upload avatar</button>
        </form>`;
}

function visibilityForm(user) {
    return user.isPublic
        ? html`
        <h2>Profile is public</h2>
        <p>Anyone can see your profile and public shelves</p>
        <form method="POST" action="/users/${user.id}/unpublish">
            <button>make profile private</button>
        </form>
        <p>This also makes all of your shelves private</p>`
        : html`
        <h2>Profile is private</h2>
        <p>Only you can see your profile</p>
        <form method="POST" action="/users/${user.id}/publish">
            <button>make profile public</button>
        </form>`;
}
