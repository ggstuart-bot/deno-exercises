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
        <h3>Public shelves</h3>
        ${publicLists.length
            ? html`<ul>
${publicLists.map(listToHTML)}
        </ul>`
            : html`<p>No public shelves</p>`}
    </section>
    <aside>
        ${canChangeAvatar(currentUser, targetUser) ? avatarForm(targetUser, errors) : ""}
        ${canChangeAdmin(currentUser, targetUser) ? html`<h3>Admin status</h3>${adminButton(targetUser)}` : ""}
        ${canPublishProfile(currentUser, targetUser) ? visibilityForm(targetUser) : ""}
    </aside>
    `;
}

function avatarForm(user, errors) {
    return html`
        <h3>Change avatar</h3>
        <form method="POST" action="/users/${user.id}/avatar" enctype="multipart/form-data">
            <label for="avatar">Avatar</label>
            <input id="avatar" type="file" name="avatar" accept="${AVATAR_TYPES.join(",")}" required>
            <span class="error">${errors?.avatar ?? ""}</span>
            <button>upload avatar</button>
        </form>`;
}

function visibilityForm(user) {
    return user.isPublic
        ? html`
        <h3>Profile is public</h3>
        <p>Anyone signed in can see your profile and public shelves</p>
        <form method="POST" action="/users/${user.id}/unpublish">
            <button>make profile private</button>
        </form>
        <p>This also makes all of your shelves private</p>`
        : html`
        <h3>Profile is private</h3>
        <p>Only you can see your profile</p>
        <form method="POST" action="/users/${user.id}/publish">
            <button>make profile public</button>
        </form>`;
}

function listToHTML(list) {
    return html`            <li>
                <a href="/lists/${list.id}">${list.title}</a>
                <span>${list.bookCount} ${list.bookCount === 1 ? "book" : "books"}</span>
            </li>`;
}
