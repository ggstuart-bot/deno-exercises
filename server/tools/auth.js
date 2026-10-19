import { deleteCookie, getCookies, setCookie } from "@std/http";
import { createSession, deleteSessionById, getSessionById } from "../models/sessions.js";

export function signin(username, ctx) {
    const { headers } = ctx;
    const session = createSession(username);
    setCookie(headers, {
        name: "sessionId",
        value: session.id,
        path: "/",
        httpOnly: true
    })
}

export function currentSession(ctx) {
    const { request } = ctx;
    const { sessionId } = getCookies(request.headers);
    return sessionId && getSessionById(sessionId);
}

export function signout(ctx) {
    if (!ctx.session) return;
    deleteSessionById(ctx.session.id);
    const { headers } = ctx;
    deleteCookie(headers, "sessionId", { path: "/" });
}