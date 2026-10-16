export function render(view, ctx) {
    const { layout, status } = ctx;
    const headers = new Headers({ "content-type": "text/html" });
    const content = view(ctx);
    const html = layout(content);
    return new Response(html, { headers, status });
}
