import { deleteCookie, getCookies, setCookie } from "@std/http";
import { createSession, deleteSessionById, getSessionById } from "../models/sessions.js";

export function login(username, ctx) {
    const { headers } = ctx;
    const session = createSession(username);
    console.log(session);
    
    setCookie(headers, {
        name: "sessionId",
        value: session.id,
        path: "/",
        httpOnly: true,
        sameSite: "Strict"
    })
}

export function currentSession(ctx) {
    const { request } = ctx;
    const { sessionId } = getCookies(request.headers);
    return sessionId && getSessionById(sessionId);
}

export function logout(ctx) {
    const session = currentSession(ctx);
    if (!session) return;
    deleteSessionById(session.id);
    const { headers } = ctx;
    deleteCookie(headers, "sessionId", { path: "/" });
}