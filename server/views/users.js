import { html } from "../tools/html.js";
import { canChangeAdmin } from "../tools/permissions.js";
import { userCard } from "./userCard.js";

export function usersView(ctx) {
    const { data: { users }, user: currentUser } = ctx;

    return html`
    <section>
        <header>
            <h1>Users</h1>
        </header>
        <ul class="grid">
${users.map((user) => userCard(user, canChangeAdmin(currentUser, user) ? adminButton(user) : ""))}
        </ul>
    </section>
    `;
}

export function adminButton(user) {
    return user.isAdmin
        ? html`<form method="POST" action="/users/${user.id}/demote">
                    <button>remove admin</button>
                </form>`
        : html`<form method="POST" action="/users/${user.id}/promote">
                    <button>make admin</button>
                </form>`;
}
