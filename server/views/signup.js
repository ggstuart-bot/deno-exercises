import { html } from "../tools/html.js";

export function signupView(ctx) { 
    const { data: { errors, values } } = ctx;
    return html`
    <section class="center">
        <h2>Sign up</h2>
        <p>Already have an account? <a href="/signin">sign in</a> to gain access.</p>
        <form method="POST">
            <label for="username">Username</label>
            <input id="username" name="username" value="${values?.username ?? ""}">
            <span class="error">${errors?.username ?? ""}</span>
            <label for="password">Password</label>
            <input id="password" type="password" name="password"> 
            <span class="error">${errors?.password ?? ""}</span>
            <button>sign up</button>
        </form>
    </section>
    `;
}