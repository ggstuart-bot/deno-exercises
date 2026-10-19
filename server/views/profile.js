import { html } from "../tools/html.js";

export function profileView(ctx) {
    const { user: { username, isAdmin } } = ctx;

    return html`
    <section>
        <h2>Profile</h2>
        <p>Username: ${username}</p>
        <p>${isAdmin ? "You are an admin." : "You are not an admin."}</p>
    </section>
    `;
}
