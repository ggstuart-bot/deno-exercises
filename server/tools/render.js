export function render(view, ctx) {
    const { headers, layout } = ctx;
    headers.set("content-type", "text/html");
    const content = view(ctx);
    const html = layout(content);
    return new Response(html, { headers });
}
