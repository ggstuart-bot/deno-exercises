function server(request) {
    const url = new URL(request.url); 
    console.log(url.pathname);    
    const headers = new Headers({ "content-type": "text/html" }); 
    return new Response("<h1>hello world</h1>", { headers });
}

Deno.serve(server);
