import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { itemController, itemsController } from "./controllers/items.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import layout from "./layout.js";

const itemPattern = new URLPattern({ pathname: "/items/:itemId" });

function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, layout, data: {} };
    console.log(url.pathname);

    if(url.pathname.startsWith("/assets/")) {
        return staticController(ctx);
    }

    if (url.pathname == "/") {
        return homeController(ctx)
    }

    if (url.pathname == "/about") {
        return aboutController(ctx);
    }

    if (url.pathname == "/items") {
        return itemsController(ctx);
    }

    if (itemPattern.test(url)) {
        ctx.params = itemPattern.exec(url).pathname.groups;
        return itemController(ctx);
    }

    return notFoundController(ctx);
}

Deno.serve(server);
