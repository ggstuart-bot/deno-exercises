import { html } from "../tools/html.js";

export function usersView(ctx) {
    const { data: { users }, user: currentUser } = ctx;

    return html`
    <section>
        <h2>Users</h2>
        <ul>
${users.map((user) => userToHTML(user, currentUser))}
        </ul>
    </section>
    `;
}

function userToHTML(user, currentUser) {
    return html`            <li>
                ${user.username}
                ${user.isAdmin ? html`<span class="admin">admin</span>` : ""}
                ${user.id === currentUser.id ? "" : adminButton(user)}
            </li>`;
}

function adminButton(user) {
    return user.isAdmin
        ? html`<form method="POST" action="/users/${user.id}/demote">
                    <button>remove admin</button>
                </form>`
        : html`<form method="POST" action="/users/${user.id}/promote">
                    <button>make admin</button>
                </form>`;
}
