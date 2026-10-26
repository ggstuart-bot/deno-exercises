import { NotFoundError } from "./errors.js";

export class Router {
    constructor() {
        this.routes = [];
    }

    register(method, pattern, ...handlers) {
        if (typeof pattern == "string") {
            pattern = new URLPattern({ pathname: pattern });
        }
        this.routes.push({ method, pattern, handlers });
    }

    get(...args) {
        this.register("GET", ...args);
    }

    handle(ctx) {
        const { url, request } = ctx;
        const route = this.routes.find((route) => {
            return route.method == request.method && route.pattern.test(url);
        });
        if (!route) {
            throw new NotFoundError(
                `${request.method} ${url.pathname} doesn't match any known route`,
            );
        }
        // Placeholder: this will need to change when we add middleware
        const [handler] = route.handlers;
        return handler(ctx);
    }
}
