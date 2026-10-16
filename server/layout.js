export function layout(content, ctx) {
    return`
<!DOCTYPE html>
<html>
<head>
    <title>My website</title>
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
    return flash ? `<aside id="flash" role="status" aria-label="flash message">
        <p>${flash}</p>
    </aside>` : "";
}