import { html } from "../tools/html.js";

export function notFoundView() {
    return html`
    <section>
        <h2>Not found</h2>
        <p>The requested resource was not found.</p>
    </section>
    `;
}
