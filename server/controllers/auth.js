import { getUserByUsername } from "../models/users.js";
import { signin, signout } from "../tools/session.js";
import { verifyPassword } from "../tools/hash.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signinView } from "../views/signin.js";
import { forbiddenView } from "../views/forbidden.js";

export function signinFormController(ctx) {
    ctx.data.title = "Sign in";
    return render(signinView, ctx);
}

export async function signinController(ctx) {
    const { validated: { username, password } } = ctx;
    const user = getUserByUsername(username);
    if (!user || !(await verifyPassword(password, user.hashedPassword))) {
        ctx.data.values = { username };
        ctx.data.errors = { credentials: `Invalid credentials` };
        ctx.status = 401;
        ctx.data.title = "Sign in";
        return render(signinView, ctx);
    }
    signin(user.id, ctx);
    ctx.flash = `Signed in as '${username}'`;
    return redirect("/", ctx);
}

export function signoutController(ctx) { 
    signout(ctx);
    ctx.flash = "Signed out";
    return redirect("/", ctx);
}

export function signinRedirectController(ctx) {
    ctx.flash = "Please sign in to continue";
    return redirect("/signin", ctx);
}

export function alreadySignedInRedirectController(ctx) {
    const { user: { username } } = ctx;
    ctx.flash = `You are already signed in as '${username}'`;
    return redirect("/", ctx);
}

export function forbiddenController(ctx) {
    ctx.status = 403;
    ctx.data.title = "Forbidden";
    return render(forbiddenView, ctx);
}