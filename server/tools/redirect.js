export function redirect(location) { 
    const headers = new Headers({ location });
    return new Response(null, { headers, status: 303 });
}
