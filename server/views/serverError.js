import { html } from "../tools/html.js";

export function serverErrorView() {
    return html`
        <section>
            <header>
                <h1>Server error</h1>
                <p>Something went wrong on the server.</p>
            </header>
        </section>
    `;
}
