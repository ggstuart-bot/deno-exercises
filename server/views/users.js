import { html } from "../tools/html.js";

export function usersView(ctx) {
    const { data: { users } } = ctx;

    return html`
    <section>
        <h2>Users</h2>
        <ul>
${users.map(itemToHTML)}
        </ul>
    </section>
    `;
}

function itemToHTML(user) {
    return html`            <li>
                <a href="/users/${user.username}">${user.username}</a>
            </li>`;
}
