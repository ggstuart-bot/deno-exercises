import { html } from "../tools/html.js";

export function signupView(ctx) { 
    const { data: { errors, values } } = ctx;
    return html`
    <section>
        <header>
            <h1>Sign up</h1>
            <p>Already have an account? <a href="/signin">sign in</a> to gain access.</p>
        </header>
        <form class="secondary" method="POST">
            <label for="username">Username</label>
            <input id="username" name="username" autocomplete="username" value="${values?.username ?? ""}"
                aria-describedby="username-error" aria-invalid="${Boolean(errors?.username)}">
            <span id="username-error" class="error">${errors?.username ?? ""}</span>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" autocomplete="new-password"
                aria-describedby="password-error" aria-invalid="${Boolean(errors?.password)}">
            <span id="password-error" class="error">${errors?.password ?? ""}</span>
            <button>sign up</button>
        </form>
    </section>
    `;
}