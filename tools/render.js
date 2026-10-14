export default function render(ctx) {
    const { view, layout, status } = ctx;
    const headers = new Headers({ "content-type": "text/html" });
    const content = view();
    const html = layout(content);
    return new Response(html, { headers, status });
}
