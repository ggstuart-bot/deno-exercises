export function render(view, ctx) {
    const { headers, layout, status } = ctx;
    headers.set("content-type", "text/html");
    const content = view(ctx);
    const html = layout(content, ctx);
    return new Response(html, { headers, status });
}
