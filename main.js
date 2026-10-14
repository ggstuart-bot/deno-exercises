import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { notFoundController } from "./controllers/notFound.js";
import layout from "./layout.js";

function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, layout };
    console.log(url.pathname);

    if (url.pathname == "/") {
        return homeController(ctx)
    }

    if (url.pathname == "/about") {
        return aboutController(ctx);
    }

    return notFoundController(ctx);
}

Deno.serve(server);
