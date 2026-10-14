import layout from './layout.js';

function server(request) {
    const url = new URL(request.url); 
    console.log(url.pathname);    
    const headers = new Headers({ "content-type": "text/html" }); 
    const html = layout();
    return new Response(html, { headers });
}

Deno.serve(server);
