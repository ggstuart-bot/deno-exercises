import { html } from "../tools/html.js";

// The Bookshelves logo. It uses currentColor and --highlight, so it follows the text colour
export const logo = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="url(#logo-fill)" aria-hidden="true">
    <defs>
        <linearGradient id="logo-fill">
            <stop offset="0" style="stop-color: color-mix(in oklab, currentColor 50%, var(--highlight))" />
            <stop offset="1" style="stop-color: var(--highlight)" />
        </linearGradient>
    </defs>
    <rect x="4" y="8" width="5" height="18" />
    <rect x="10" y="5" width="5" height="21" />
    <rect x="16" y="10" width="4" height="16" />
    <rect x="21" y="7" width="5" height="19" transform="rotate(12 26 26)" />
    <rect x="2" y="27" width="28" height="2" fill="currentColor" />
</svg>`;
