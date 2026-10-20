import { html } from "../tools/html.js";

export function usersView(ctx) {
    const { data: { users } } = ctx;

    return html`
    <section>
        <h2>Users</h2>
        <ul>
${users.map(userToHTML)}
        </ul>
    </section>
    `;
}

function userToHTML(user) {
    return html`            <li>
                ${user.username}
                ${adminControl(user)}
            </li>`;
}

function adminControl(user) {
    return user.isAdmin
        ? html`<em>admin</em>`
        : html`<form method="POST" action="/users/${user.id}/admin">
                    <button>make admin</button>
                </form>`;
}
