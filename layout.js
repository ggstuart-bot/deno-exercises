export default function layout(content) {
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
        </nav>
    </header>
    <main>        
    ${content}
    </main>
    <footer>
        &copy; My website developers
    </footer>
</body>
</html>`;
}
