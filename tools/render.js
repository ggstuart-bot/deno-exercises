export default function render(view, layout, { status } = {}) {
    const headers = new Headers({ "content-type": "text/html" });
    const content = view();
    const html = layout(content);
    return new Response(html, { headers, status });
}
