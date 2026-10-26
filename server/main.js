import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { layout } from "./layout.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";

const app = new Router();

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/about", aboutController);

export function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, layout, data: {}, headers };

    try {
        return app.handle(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return notFoundController(ctx);
        }
        throw error;
    }
}
