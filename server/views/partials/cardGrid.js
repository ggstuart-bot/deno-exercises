import { html } from "../../tools/html.js";

export function cardGrid(cards, emptyMessage) {
    return cards.length ? html`<ul class="grid">${cards}</ul>` : html`<p>${emptyMessage}</p>`;
}
