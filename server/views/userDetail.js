import { html } from "../tools/html.js";
import { canChangeAdmin } from "../tools/permissions.js";
import { adminButton } from "./users.js";

export function userDetailView(ctx) {
    const { data: { targetUser }, user: currentUser } = ctx;

    return html`
    <section>
        <h2>${targetUser.username}</h2>
        ${targetUser.isAdmin ? html`<p><span class="admin">admin</span></p>` : ""}
        ${canChangeAdmin(currentUser, targetUser) ? adminButton(targetUser) : ""}
    </section>
    `;
}
