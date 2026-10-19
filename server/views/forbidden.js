import { html } from "../tools/html.js";

export function forbiddenView() {
    return html`
    <section>
        <h2>Forbidden</h2>
        <p>You do not have permission to view this page.</p>
    </section>
    `;
}
