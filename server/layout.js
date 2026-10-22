export function layout(content, ctx) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${ctx.data.title ? `${ctx.data.title} | ` : ""}Bookshelves</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <header>
        <a href="/">Bookshelves</a>
    </header>
    <main>
    ${content}
    </main>
    <footer>
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
