export default function render(view, layout) { 
    const headers = new Headers({ "content-type": "text/html" }); 
    const content = view();
    const html = layout(content);
    return new Response(html, { headers });    
}
