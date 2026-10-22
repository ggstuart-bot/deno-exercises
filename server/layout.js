import { html } from "./tools/html.js";
import { avatarImage } from "./views/avatar.js";

export function layout(content, ctx) {
    return html`
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bookshelves</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/styles.css">
    <link rel="icon" href="/assets/icon.svg">
</head>
<body>
    <header>
        <h1><a href="/">Bookshelves</a></h1>
        <nav>
            <a href="/books">books</a>
            ${adminLinks(ctx.user)}
            ${authLinks(ctx.user)}
        </nav>
    </header>
    ${flashMessage(ctx.data.flash)}
    <main>        
    ${content}
    </main>
    <footer>
        ${userMessage(ctx.user)}
        
        <p>
            <a href="/about">about</a>
        </p>
        <p>
            &copy; Bookshelves developers
        </p>
    </footer>
</body>
</html>`;
}

function flashMessage(flash) {
    return flash
        ? html`<aside id="flash" role="status" aria-label="flash message">
        <p>${flash}</p>
    </aside>`
        : "";
}


function userMessage(user) {
    return user
        ? html`<p>Signed in as '${user.username}'</p>`
        : "";
}

function adminLinks(user) {
    return user?.isAdmin
        ? html`<a href="/users">users</a>`
        : "";
}

function authLinks(user) {
    return user
        ? html`<a href="/shelves">my shelves</a>
            <a href="/profile">${avatarImage(user)}profile</a>
            <form method="POST" action="/signout">
                <button>sign out</button>
            </form>`
        : html`<a href="/signin">sign in</a>`
}