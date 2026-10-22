export function layout(content) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Bookshelves</title>
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
            &copy; Bookshelves developers
        </p>
    </footer>
</body>
</html>`;
}
