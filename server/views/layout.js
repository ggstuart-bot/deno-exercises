import { html } from "../tools/html.js";
import { isAdmin } from "../tools/permissions.js";
import { avatarImage } from "./partials/avatarImage.js";
import { postButton } from "./partials/postButton.js";

export function layout(content, ctx) {
    const { data, url, user } = ctx;
    const title = data.title ? `${data.title} | Bookshelves` : "Bookshelves";

    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/assets/styles.css">
                <link rel="icon" href="/assets/icon.svg">
            </head>
            <body>
                <header class="secondary">
                    <a href="/" class="brand"><img src="/assets/icon.svg" alt=""> Bookshelves</a>
                    <nav>
                        ${navLink("/books", "books", url.pathname)}
                        ${adminLinks(user, url.pathname)}
                        ${authLinks(user, url.pathname)}
                    </nav>
                </header>
                ${flashMessage(data.flash)}
                <main>
                ${content}
                </main>
                <footer class="secondary">
                    ${userMessage(user)}
                    <p>
                        &copy; Bookshelves developers
                    </p>
                </footer>
            </body>
        </html>
    `;
}

function flashMessage(flash) {
    return flash ? html`<p id="flash" role="status" tabindex="0">${flash}</p>` : "";
}

function userMessage(user) {
    return user ? html`<p>Signed in as '${user.username}'</p>` : "";
}

function adminLinks(user, path) {
    return isAdmin(user) ? navLink("/users", "users", path) : "";
}

function authLinks(user, path) {
    if (!user) return navLink("/signin", "sign in", path);
    return html`
        ${navLink("/shelves", "my shelves", path)}
        ${navLink(`/users/${user.id}`, html`${avatarImage(user)}profile`, path)}
        ${postButton("/signout", "sign out")}
    `;
}

// A header link, marked as the current page when it matches the path exactly
function navLink(href, content, path) {
    return html`<a href="${href}" aria-current="${
        href === path ? "page" : "false"
    }">${content}</a>`;
}
