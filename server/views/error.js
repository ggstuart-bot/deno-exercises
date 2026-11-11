import { html } from "../tools/html.js";

export function errorView(ctx) {
    const { data: { title, message } } = ctx;
    return html`
        <section>
            <header>
                <h1>${title}</h1>
                <p>${message}</p>
            </header>
        </section>
    `;
}
