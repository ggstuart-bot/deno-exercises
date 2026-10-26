export function server(request) {
    // Placeholder: this will need to change when we add middleware
    console.log(request.method, request.url);
    // Placeholder: this will need to change when we add HTML views
    const headers = new Headers({ "content-type": "text/html" });
    return new Response("<h1>hello world</h1>", { headers });
}
