import { html } from "../tools/html.js";

export function forbiddenView() {
    return html`
        <section>
            <header>
                <h1>Forbidden</h1>
                <p>You do not have permission to view this page.</p>
            </header>
        </section>
    `;
}
