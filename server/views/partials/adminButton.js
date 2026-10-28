import { html } from "../../tools/html.js";

export function adminButton(user) {
    return user.isAdmin
        ? html`
            <form method="POST" action="/users/${user.id}/demote">
                <button>remove admin</button>
            </form>
        `
        : html`
            <form method="POST" action="/users/${user.id}/promote">
                <button>make admin</button>
            </form>
        `;
}
