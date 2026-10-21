import { html } from "../tools/html.js";
import { canChangeAdmin, canChangeAvatar, canPublishProfile } from "../tools/permissions.js";
import { adminButton } from "./users.js";
import { avatarImage } from "./avatar.js";
import { AVATAR_TYPES } from "../schema/avatar.js";

export function userDetailView(ctx) {
    const { data: { targetUser, publicLists, errors }, user: currentUser } = ctx;

    return html`
    <section>
        ${avatarImage(targetUser, `Avatar for '${targetUser.username}'`)}
        <h2>${targetUser.username}</h2>
        ${targetUser.isAdmin ? html`<p><span class="admin">admin</span></p>` : ""}
        ${canChangeAdmin(currentUser, targetUser) ? adminButton(targetUser) : ""}
        ${canChangeAvatar(currentUser, targetUser) ? avatarForm(targetUser, errors) : ""}
        ${canPublishProfile(currentUser, targetUser) ? visibilityForm(targetUser) : ""}
        <h3>Public lists</h3>
        ${publicLists.length
            ? html`<ul>
${publicLists.map(listToHTML)}
        </ul>`
            : html`<p>No public lists</p>`}
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

function visibilityForm(user) {
    return user.isPublic
        ? html`<p>Anyone signed in can see your profile and public lists</p>
        <form method="POST" action="/users/${user.id}/unpublish">
            <button>make profile private</button>
        </form>
        <p>This also makes all of your lists private</p>`
        : html`<p>Only you can see your profile</p>
        <form method="POST" action="/users/${user.id}/publish">
            <button>make profile public</button>
        </form>`;
}

function listToHTML(list) {
    return html`            <li>
                <a href="/lists/${list.id}">${list.title}</a>
                <span>${list.itemCount} ${list.itemCount === 1 ? "item" : "items"}</span>
            </li>`;
}
