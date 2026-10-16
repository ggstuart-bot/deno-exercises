import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";

export function setFlash(ctx) {
    const { headers, flash } = ctx;
    if (!flash) return;
    setCookie(headers, {
        name: "flash",
        value: encodeURIComponent(flash),
        path: "/",
        httpOnly: true
    })
}

export function getFlash(ctx) {
    const { request, headers } = ctx;
    const { flash } = getCookies(request.headers);
    if (flash) {
        ctx.data.flash = decodeURIComponent(flash);        
        deleteCookie(headers, "flash", { path: "/" });
    }
}