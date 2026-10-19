import { createUser, getUsers } from "../models/users.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { registrationView } from "../views/registration.js";
import { usersView } from "../views/users.js";

export function registrationFormController(ctx) { 
    return render(registrationView, ctx);
}

export async function createUserController(ctx) {
    const { validated } = ctx;
    const user = await createUser(validated);
    ctx.flash = `User '${user.username}' created`;
    return redirect("/", ctx);
}

export function usersController(ctx) {
    ctx.data.users = getUsers();
    return render(usersView, ctx);
}