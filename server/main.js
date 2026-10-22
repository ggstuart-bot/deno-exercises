import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { notFoundController } from "./controllers/notFound.js";
import { layout } from "./layout.js";
import { NotFoundError } from "./tools/errors.js";

export function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, layout, data: {}, headers };

    try {
        // Placeholder: this will need to change when we add a router
        if (url.pathname == "/") return homeController(ctx);
        if (url.pathname == "/about") return aboutController(ctx);
        throw new NotFoundError(
            `${url.pathname} doesn't match any known route`,
        );
    } catch (error) {
        if (error instanceof NotFoundError) {
            return notFoundController(ctx);
        }
        throw error;
    }
}
