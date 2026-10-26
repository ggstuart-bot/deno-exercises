import { homeController } from "./controllers/home.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { layout } from "./layout.js";
import { NotFoundError } from "./tools/errors.js";

export function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, layout, headers };

    try {
        // Placeholder: this will need to change when we add a router
        if (url.pathname.startsWith("/assets/")) return staticController(ctx);
        if (url.pathname == "/") return homeController(ctx);
        throw new NotFoundError(`${url.pathname} doesn't match any known route`);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return notFoundController(ctx);
        }
        throw error;
    }
}
