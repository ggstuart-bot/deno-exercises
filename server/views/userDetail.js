import { html } from "../tools/html.js";
import { canChangeAdmin } from "../tools/permissions.js";
import { adminButton } from "./users.js";

export function userDetailView(ctx) {
    const { data: { targetUser }, user: currentUser } = ctx;

    return html`
    <section>
        ${targetUser.avatarId ? avatarImage(targetUser) : ""}
        <h2>${targetUser.username}</h2>
        ${targetUser.isAdmin ? html`<p><span class="admin">admin</span></p>` : ""}
        ${canChangeAdmin(currentUser, targetUser) ? adminButton(targetUser) : ""}
    </section>
    `;
}

function avatarImage({ id, username, avatarId }) {
    return html`<img class="avatar" src="/users/${id}/avatar?v=${avatarId}" alt="Avatar for '${username}'">`;
}
