import { html } from "./tools/html.js";

export function layout(content, ctx) {
    return html`
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My website</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/assets/styles.css">
    <link rel="icon" href="/assets/icon.svg">
</head>
<body>
    <header>
        <h1>My website</h1>
        <nav>
            <a href="/">home</a>
            <a href="/about">about</a>
            <a href="/items">items</a>
            <a href="/users">users</a>            
            ${authLinks(ctx.session)}
        </nav>
    </header>
    ${flashMessage(ctx.data.flash)}
    <main>        
    ${content}
    </main>
    <footer>
        ${sessionMessage(ctx.session)}
        <p>&copy; My website developers</p>
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


function sessionMessage(session) {
    return session
        ? html`<p>Logged in as '${session.username}'</p>`
        : html`<p><a href="/signin">sign in</a></p>`
        
}

function authLinks(session) {
    return session
        ? html`     <form method="POST" action="/signout">
                <button>sign out</button>
            </form>`
        : html`<a href="/signin">sign in</a>
    </nav>
    `
}