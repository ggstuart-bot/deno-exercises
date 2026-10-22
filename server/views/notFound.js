import { html } from "../tools/html.js";

export function notFoundView() {
    return html`
    <section>
        <header>
            <h1>Not found</h1>
            <p>The requested resource was not found.</p>
        </header>
    </section>
    `;
}
