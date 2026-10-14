import layout from './layout.js';
import render from "./tools/render.js";
import aboutView from "./views/about.js";
import homeView from "./views/home.js";
import notFoundView from "./views/notFound.js";

function server(request) {
    const url = new URL(request.url); 
    console.log(url.pathname);    

    if (url.pathname == "/") {
        return render(homeView, layout);
    }

    if (url.pathname == "/about") {
        return render(aboutView, layout);
    }

    return render(notFoundView, layout);
}

Deno.serve(server);
