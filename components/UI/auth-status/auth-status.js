import { auth } from "./auth.js"

export class AuthStatus extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/UI/auth-status/auth-status.css").then(r => r.text());
        this.render(css);

        window.addEventListener("auth-changed", () => this.render());
    }

    async logout() {
        await auth.logout();
    }

    render(css) {
        if (!auth.authenticated) {
            this.innerHTML = "";
            return;
        }

        this.innerHTML = `
        <style>${css}</style>

        <div>
            <span>🟩 Admin mode</span>
            <div class="button__container">
                <a href="blog.html?upload=true" class="ghost__button">New post</a>
                <button id="logout" class="ghost__button">Log out</button>
            </div>
        </div>
        `;

        this.querySelector("#logout").addEventListener("click", () => this.logout());
    }
}


customElements.define(
    "auth-status",
    AuthStatus
);