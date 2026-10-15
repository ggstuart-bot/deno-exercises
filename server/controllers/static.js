import { serveDir } from "@std/http";

export function staticController(ctx) { 
    const { request } = ctx;
    return serveDir(request, {
        fsRoot: "public",
        urlRoot: "assets"
    })
} 
