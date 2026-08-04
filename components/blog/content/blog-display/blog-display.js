import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import "../../../UI/text-label/text-label.js"

export class BlogDisplay extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/blog/content/blog-display/blog-display.css")
            .then(r => r.text());

        const postId = this.getAttribute("postId");

        const post = await fetch(`./data/blog/posts/${postId}/post.md`).then(res => res.text())
        const metadata = await fetch(`./data/blog/posts/${postId}/metadata.json`).then(res => res.json())
        
        this.render(css, metadata.category);

        const container = this.querySelector("#post__container");
        container.innerHTML = ""
        container.innerHTML += marked.parse(post);
    }

    render(css, category) {
        this.innerHTML = `
            <style>
                ${css}
            </style>

            <a href="/blog.html">×</a>

            <text-label text=${category}></text-label>
            <div id="post__container">

            </div>
        `;
    }
}

customElements.define(
    "blog-display",
    BlogDisplay
);