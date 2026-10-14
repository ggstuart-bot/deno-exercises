import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { notFoundController } from "./controllers/notFound.js";

function server(request) {
    const url = new URL(request.url);
    console.log(url.pathname);

    if (url.pathname == "/") {
        return homeController()
    }

    if (url.pathname == "/about") {
        return aboutController();
    }

    return notFoundController();
}

Deno.serve(server);
