import { html } from "../tools/html.js";

export function avatarImage({ id, avatarId }, alt = "") {
    return avatarId
        ? html`<img class="avatar" src="/users/${id}/avatar?v=${avatarId}" alt="${alt}">`
        : html`<span class="avatar"></span>`;
}
