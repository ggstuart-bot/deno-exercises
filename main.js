import layout from './layout.js';
import aboutView from "./views/about.js";
import homeView from "./views/home.js";
import notFoundView from "./views/notFound.js";

function server(request) {
    const url = new URL(request.url); 
    console.log(url.pathname);    
    const headers = new Headers({ "content-type": "text/html" }); 

    if (url.pathname == "/") {
        const content = homeView();
        const html = layout(content);
        return new Response(html, { headers });
    }

    if (url.pathname == "/about") {
        const content = aboutView();
        const html = layout(content);
        return new Response(html, { headers });
    }

    const content = notFoundView();
    const html = layout(content);
    return new Response(html, { headers });
}

Deno.serve(server);
