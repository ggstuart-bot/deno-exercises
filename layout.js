export default function layout() {
    return`
<!DOCTYPE html>
<html>
<head>
    <title>My website</title>
    <link rel="stylesheet" href="/styles.css">
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
        <h2>This is an experiment.</h2>
        <p>See the <a href="/about">about</a> page for more information</p>
    </main>
    <footer>
        &copy; My website developers
    </footer>
</body>
</html>`;
}
