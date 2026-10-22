import { html } from "../tools/html.js";
import { canChangeAdmin } from "../tools/permissions.js";
import { avatarImage } from "./avatar.js";

export function usersView(ctx) {
    const { data: { users }, user: currentUser } = ctx;

    return html`
    <section>
        <header>
            <h1>Users</h1>
        </header>
        <ul class="striped">
${users.map((user) => userToHTML(user, currentUser))}
        </ul>
    </section>
    `;
}

function userToHTML(user, currentUser) {
    return html`            <li>
                <span>
                    <a href="/users/${user.id}">${avatarImage(user)}${user.username}</a>
                    ${user.isAdmin ? html`<span class="admin">admin</span>` : ""}
                </span>
                ${canChangeAdmin(currentUser, user) ? adminButton(user) : ""}
            </li>`;
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
