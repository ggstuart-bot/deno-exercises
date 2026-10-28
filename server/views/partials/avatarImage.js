import { html } from "../../tools/html.js";

const DEFAULT_AVATAR = "/assets/default-avatar.svg";

export function avatarImage({ id, avatarId }, alt = "") {
    const src = avatarId ? `/users/${id}/avatar?v=${avatarId}` : DEFAULT_AVATAR;
    return html`<img class="avatar" src="${src}" alt="${alt}">`;
}
