import "./login/login.js";
import "./upload/upload.js";
import "./navigation-bar-blog/navigation-bar-blog.js";

import "./content/blog-index/blog-index.js";
import "./content/blog-display/blog-display.js"

import { auth } from '../UI/auth-status/auth.js'

export class BlogApp extends HTMLElement {
    children = null

    connectedCallback() {
        this.children = this.innerHTML;

        this.updateView();

        window.addEventListener("auth-changed", () => this.updateView());
    }

    updateView() {

        const params = new URLSearchParams(window.location.search);

        const forceLogin = params.get("login") === "true";
        const forceUpload = params.get("upload") === "true";
        const postId = params.get("postId");

        if (forceUpload && auth.authenticated){
            this.showUpload();
            return;
        }

        if (forceLogin && !auth.authenticated) {
            this.showLogin();
            return;
        }

        if (postId) {
            this.showPost(postId);
            return;
        }

        this.showBlog();
    }

    showUpload() {
        this.innerHTML = `
            ${this.children}
            <navigation-bar-blog></navigation-bar-blog>
            <div class="blog">
                <upload-component></upload-component>
            </div>
        `;

        this.querySelector("upload-component").addEventListener("auth-changed", () => this.checkAuth());
    }

    showLogin() {
        this.innerHTML = `
            ${this.children}
            <navigation-bar-blog></navigation-bar-blog>
            <div class="blog">
                <login-component></login-component>
            </div>
        `;

        this.querySelector("login-component").addEventListener("auth-changed", () => this.checkAuth());
    }


    showPost(postId) {
        this.innerHTML = `
            ${this.children}
            <navigation-bar-blog></navigation-bar-blog>
            <div class="blog">
                <blog-display postId="${postId}"></blog-display>
            </div>
        `;
    }

    showBlog() {
        this.innerHTML = `
            ${this.children}
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