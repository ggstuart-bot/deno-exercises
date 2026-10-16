import { setFlash } from "./flash.js";

export function redirect(location, ctx) {
    const { headers } = ctx;
    setFlash(ctx);
    headers.set("location", location);
    return new Response(null, { headers, status: 303 });
}
