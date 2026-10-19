import { getUserByUsername } from "../models/users.js";
import { signin, signout } from "../tools/auth.js";
import { verifyPassword } from "../tools/hash.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signinView } from "../views/signin.js";

export function signinFormController(ctx) {
    return render(signinView, ctx);
}

export async function signinController(ctx) {
    const { validated: { username, password } } = ctx;
    const user = getUserByUsername(username);
    if (!user || !(await verifyPassword(password, user.hashedPassword))) {
        ctx.data.values = { username };
        ctx.data.errors = { credentials: `Invalid credentials` };
        ctx.status = 401;
        return render(signinView, ctx);
    }
    signin(user.id, ctx);
    ctx.flash = `Signed in as '${username}'`;
    return redirect("/", ctx);
}

export function signoutController(ctx) { 
    signout(ctx);
    ctx.flash = `Signed out`;
    return redirect("/", ctx);
}