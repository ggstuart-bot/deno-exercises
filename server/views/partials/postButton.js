import { html } from "../../tools/html.js";

export function postButton(action, label) {
    return html`
        <form method="POST" action="${action}">
            <button>${label}</button>
        </form>
    `;
}
