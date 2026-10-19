import { html } from "../tools/html.js";

export function registrationView(ctx) { 
    const { data: { errors, values } } = ctx;
    console.log(errors, values);
    
    return html`
    <section class="center">
        <h2>Sign up</h2>
        <p>Already have an account? <a href="/signin">sign in</a> to gain access.</p>
        <form method="POST">
            <label for="username">Username</label>
            <input id="username" name="username" value="${values?.username ?? ""}">
            <span class="error">${errors?.username ?? ""}</span>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" value="${values?.password ?? ""}"> 
            <span class="error">${errors?.password ?? ""}</span>
            <button>Register</button>
        </form>
    </section>
    `;
}