import { html } from "./tools/html.js";
import { avatarImage } from "./views/avatar.js";
import { logo } from "./views/logo.js";

export function layout(content, ctx) {
    return html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${ctx.data.title ? `${ctx.data.title} | ` : ""}Bookshelves</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/styles.css">
    <link rel="icon" href="/assets/icon.svg">
</head>
<body>
    <header class="secondary">
        <a href="/" class="brand">${logo} Bookshelves</a>
        <nav>
            ${adminLinks(ctx.user, ctx.url.pathname)}
            ${authLinks(ctx.user, ctx.url.pathname)}
        </nav>
    </header>
    ${flashMessage(ctx.data.flash)}
    <main>
    ${content}
    </main>
    <footer class="secondary">
        ${userMessage(ctx.user)}
        <nav>
            <a href="/about">about</a>
        </nav>
        <p>
            &copy; Bookshelves developers
        </p>
    </footer>
</body>
</html>`;
}

function flashMessage(flash) {
    return flash
        ? html`<p id="flash" role="status">${flash}</p>`
        : "";
}

function userMessage(user) {
    return user
        ? html`<p>Signed in as '${user.username}'</p>`
        : "";
}

function adminLinks(user, path) {
    return user?.isAdmin
        ? navLink("/users", "users", path)
        : "";
}

function authLinks(user, path) {
    return user
        ? html`${navLink("/shelves", "my shelves", path)}
            ${navLink(`/users/${user.id}`, html`${avatarImage(user)}profile`, path)}
            <form method="POST" action="/signout">
                <button>sign out</button>
            </form>`
        : navLink("/signin", "sign in", path);
}

// A header link, marked as the current page when it matches the path exactly
function navLink(href, content, path) {
    return html`<a href="${href}" aria-current="${href === path ? "page" : "false"}">${content}</a>`;
}