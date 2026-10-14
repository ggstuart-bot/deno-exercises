function server(request) {
    console.log(request.url);    
    const headers = new Headers({ "content-type": "text/html" }); 
    return new Response("<h1>hello world</h1>", { headers });
}

Deno.serve(server);
