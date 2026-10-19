import { html } from "../tools/html.js";

export function signinView(ctx) { 
    const { data: { errors, values } } = ctx;    
    return html`
    <section class="center">
        <h2>Sign in</h2>
        <p>Don't have an account? <a href="/signup">sign up</a> to gain access.</p>
        <form method="POST">
            <span class="error">${errors?.credentials ?? ""}</span>
            <label for="username">Username</label>
            <input id="username" name="username" value="${values?.username}">
            <span class="error">${errors?.username ?? ""}</span>
            <label for="password">Password</label>
            <input id="password" type="password" name="password"> 
            <span class="error">${errors?.password ?? ""}</span>
            <button>sign in</button>
        </form>
    </section>
    `;
}