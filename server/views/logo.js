import { html } from "../tools/html.js";

// The Bookshelves logo. It uses currentColor and --highlight, so it follows the text colour
export const logo = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="url(#logo-fill)"
        aria-hidden="true">
        <defs>
            <linearGradient id="logo-fill">
                <stop offset="0"
                    style="stop-color: color-mix(in oklab, currentColor 50%, var(--highlight))" />
                <stop offset="1" style="stop-color: var(--highlight)" />
                <stop offset="2" style="stop-color: var(--highlight)" />
            </linearGradient>
        </defs>
        <rect x="4" y="8" width="5" height="21" />
        <rect x="10" y="2" width="5" height="27" />
        <rect x="16" y="10" width="5" height="19" />
        <rect x="23" y="8" width="5" height="21" transform="rotate(12 26 26)" />
        <rect x="0" y="30" width="32" height="2" fill="currentColor" />
    </svg>
`;
