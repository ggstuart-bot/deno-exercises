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
                <a href="/users/${user.username}">${user.username}</a>
            </li>`;
}
