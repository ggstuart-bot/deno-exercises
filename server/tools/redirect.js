export default function redirect(location) { 
    const headers = new Headers({ location });
    return new Response(null, { headers, status: 303 });
}
