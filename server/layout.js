export function layout(content, ctx) {
    return `
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
                <a href="/">Bookshelves</a>
            </header>
            <main>
            ${content}
            </main>
            <footer class="secondary">
                <nav>
                    <a href="/about">about</a>
                </nav>
                <p>
                    &copy; Bookshelves developers
                </p>
            </footer>
            </body>
        </html>
    `;
}
