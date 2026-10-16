import { NotFoundError } from "./errors.js";

export default class Router { 
    constructor() { 
        this.routes = [];
        this.middleware = [];
    }

    register(method, pattern, ...handlers) {
        if (typeof pattern == "string") pattern = new URLPattern({ pathname: pattern });
        this.routes.push({ method, pattern, handlers });
    }

    use(fn) {
        this.middleware.push(fn);
    }

    get(...args) { this.register("GET", ...args); }
    post(...args) { this.register("POST", ...args); }

    handle(ctx) {
        const { url, request } = ctx;
        const route = this.routes.find((route) => {
            return route.method == request.method && route.pattern.test(url);
        });
        if (!route) throw new NotFoundError(`${request.method} ${url.pathname} doesn't match any known route`);
        ctx.params = route.pattern.exec(url).pathname.groups;        
        return this.chain(ctx, [...this.middleware, ...route.handlers]);
    }

    chain(ctx, handlers) {
        const [fn, ...remaining] = handlers;
        if (!remaining.length) return fn(ctx);
        const next = (ctx) => this.chain(ctx, remaining);
        return fn(ctx, next);
    }
} 