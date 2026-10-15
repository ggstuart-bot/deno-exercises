import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { createItemController, itemController, itemsController } from "./controllers/items.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import layout from "./layout.js";
import { NotFoundError } from "./tools/errors.js";

const itemPattern = new URLPattern({ pathname: "/items/:itemId" });

function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, layout, data: {} };
    console.log(url.pathname);

    try {
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
            if (request.method == "GET") {
                return itemsController(ctx);
            }
            if (request.method == "POST") {
                return createItemController(ctx);
            }
        }

        if (itemPattern.test(url)) {
            ctx.params = itemPattern.exec(url).pathname.groups;
            return itemController(ctx);
        }

        throw new NotFoundError();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return notFoundController(ctx);
        }
        throw error;
    }
}

Deno.serve(server);
