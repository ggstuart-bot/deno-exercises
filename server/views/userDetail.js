import { html } from "../tools/html.js";
import { canChangeAdmin, canChangeAvatar } from "../tools/permissions.js";
import { adminButton } from "./users.js";
import { avatarImage } from "./avatar.js";
import { AVATAR_TYPES } from "../schema/avatar.js";

export function userDetailView(ctx) {
    const { data: { targetUser, errors }, user: currentUser } = ctx;

    return html`
    <section>
        ${avatarImage(targetUser, `Avatar for '${targetUser.username}'`)}
        <h2>${targetUser.username}</h2>
        ${targetUser.isAdmin ? html`<p><span class="admin">admin</span></p>` : ""}
        ${canChangeAdmin(currentUser, targetUser) ? adminButton(targetUser) : ""}
        ${canChangeAvatar(currentUser, targetUser) ? avatarForm(targetUser, errors) : ""}
    </section>
    `;
}

function avatarForm(user, errors) {
    return html`<form method="POST" action="/users/${user.id}/avatar" enctype="multipart/form-data">
            <label for="avatar">Avatar</label>
            <input id="avatar" type="file" name="avatar" accept="${AVATAR_TYPES.join(",")}" required>
            <span class="error">${errors?.avatar ?? ""}</span>
            <button>upload avatar</button>
        </form>`;
}
