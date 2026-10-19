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
            <a href="/register">sign up</a>            
        </nav>
    </header>
    ${flashMessage(ctx.data.flash)}
    <main>        
    ${content}
    </main>
    <footer>
        &copy; My website developers
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
