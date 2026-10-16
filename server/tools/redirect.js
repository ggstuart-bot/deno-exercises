export function redirect(location, ctx) {
    const { headers } = ctx;
    headers.set("location", location);
    return new Response(null, { headers, status: 303 });
}
