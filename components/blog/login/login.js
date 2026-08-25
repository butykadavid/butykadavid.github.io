import { auth } from "../../UI/auth-status/auth.js"

export class LoginComponent extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/blog/login/login.css")
            .then(r => r.text());

        this.render(css);

        this.querySelector("form")
            .addEventListener("submit", this.login.bind(this));
    }

    async login(event) {
        event.preventDefault();

        const username = this.querySelector("#username").value;
        const password = this.querySelector("#password").value;

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            auth.authenticated = true
            auth.user = data.user

            this.dispatchEvent(new CustomEvent("auth-changed", {
                bubbles: true,
                detail: data
            }));
        } catch (error) {
            const errorContainer = this.querySelector("#error-message");
            errorContainer.style.display = "flex";
            errorContainer.textContent = `Login failed: ${error.message}`;
        }
    }

    render(css) {
        this.innerHTML = `
            <style>${css}</style>

            <div class="login__container">
                <h1>Welcome, admin!</h1>
                <form>
                    <input 
                        id="username"
                        type="text"
                        placeholder="Username"
                        autocomplete="username"
                        required
                    />

                    <input 
                        id="password"
                        type="password"
                        placeholder="Password"
                        autocomplete="current-password"
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                    
                    <p id="error-message">Login failed</p>
                </form>
            </div>
        `;
    }
}

customElements.define(
    "login-component",
    LoginComponent
);