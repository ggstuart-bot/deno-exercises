import { html } from "../tools/html.js";

export function signinView(ctx) { 
    const { data: { errors, values } } = ctx;    
    return html`
    <section class="center">
        <header>
            <h1>Sign in</h1>
            <p>Don't have an account? <a href="/signup">sign up</a> to gain access.</p>
        </header>
        <form class="secondary" method="POST">
            <span id="credentials-error" class="error">${errors?.credentials ?? ""}</span>
            <label for="username">Username</label>
            <input id="username" name="username" autocomplete="username" value="${values?.username ?? ""}"
                aria-describedby="credentials-error username-error" aria-invalid="${Boolean(errors?.username)}">
            <span id="username-error" class="error">${errors?.username ?? ""}</span>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" autocomplete="current-password"
                aria-describedby="credentials-error password-error" aria-invalid="${Boolean(errors?.password)}">
            <span id="password-error" class="error">${errors?.password ?? ""}</span>
            <button>sign in</button>
        </form>
    </section>
    `;
}