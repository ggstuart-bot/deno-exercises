import { html } from "../tools/html.js";
import { canChangeAdmin } from "../tools/permissions.js";
import { userCard } from "./partials/userCard.js";
import { adminButton } from "./partials/adminButton.js";

export function usersView(ctx) {
    const { data: { users }, user: currentUser } = ctx;

    return html`
        <section>
            <header>
                <h1>Users</h1>
            </header>
            <ul class="grid">
        ${users.map((user) =>
            userCard(user, canChangeAdmin(currentUser, user) ? adminButton(user) : "")
        )}
                </ul>
        </section>
    `;
}
