import "./login/login.js";
import "./navigation-bar-blog/navigation-bar-blog.js";

import "./content/blog-index/blog-index.js";
import "./content/blog-display/blog-display.js"

export class BlogApp extends HTMLElement {

    async connectedCallback() {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get("postId")
        const forceLogin = params.get("login") === "true";

        const isAuthenticated = await this.checkAuth();

        if (forceLogin && !isAuthenticated) {
            this.showLogin();
            return;
        }

        if (postId) {
            this.showPost(postId)
            return
        }

        this.showBlog();
    }


    async checkAuth() {
        try {
            const response = await fetch(
                "http://localhost:3000/auth/status",
                {
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error("Not authenticated");
            }

            const data = await response.json();

            this.showBlog();
            return true;
        } catch {
            return false;
        }
    }


    showLogin() {
        this.innerHTML = `
            <navigation-bar-blog></navigation-bar-blog>
            <div class="blog">
                <login-component></login-component>
            </div>
        `;

        this.querySelector("login-component")
            .addEventListener(
                "login-success",
                () => this.checkAuth()
            );
    }


    showPost(postId) {
        this.innerHTML = `
            <navigation-bar-blog></navigation-bar-blog>
            <div class="blog">
                <blog-display postId="${postId}"></blog-display>
            </div>
        `;
    }

    showBlog() {
        this.innerHTML = `
            <navigation-bar-blog></navigation-bar-blog>
            <div class="blog">
                <blog-index></blog-index>
            </div>
        `;
    }
}


customElements.define(
    "blog-app",
    BlogApp
);