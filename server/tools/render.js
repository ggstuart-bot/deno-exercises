import { getFlash } from "./flash.js";
import { layout } from "../views/layout.js";

export function render(view, ctx) {
    const { headers, status } = ctx;
    headers.set("content-type", "text/html");
    getFlash(ctx);
    const content = view(ctx);
    const html = layout(content, ctx);
    return new Response(html, { headers, status });
}
