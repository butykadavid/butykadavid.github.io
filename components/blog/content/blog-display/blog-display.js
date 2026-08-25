import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import "../../../UI/text-label/text-label.js"
import { auth } from "../../../UI/auth-status/auth.js";

export class BlogDisplay extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/blog/content/blog-display/blog-display.css")
            .then(r => r.text());

        const postId = this.getAttribute("postId");

        const post = await fetch(`./data/blog/posts/${postId}/post.md`).then(res => res.text())
        const postsData = await fetch("./data/blog/posts.json").then(res => res.json())

        const postMetadata = postsData.find(p => p.id == postId)
        const postCoverPath = postMetadata?.cover != "null" ? `./data/blog/posts/${postId}/${postMetadata?.cover}` : null

        this.render(css, postMetadata.category, auth.authenticated, postCoverPath);

        const container = this.querySelector("#post__container");
        container.innerHTML = ""
        container.innerHTML += marked.parse(post);

        const deleteButton = this.querySelector("#delete_post")
        deleteButton.addEventListener("click", async () => {
            try {
                const response = await fetch("http://localhost:3000/blog/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        postId
                    })
                })

                const data = await response.json();
                console.log(data)

                if (!response.ok) {
                    throw new Error(data.error)
                }

                window.location.replace("/blog.html")
            } catch (error) {
                alert("Something went wrong :/")
                console.error(`Login failed: ${error.message}`)
            }
        })
    }

    render(css, category, isAuthenticated, postCoverPath) {
        this.innerHTML = `
            <style>
                ${css}
            </style>

            <div class="post_action_container">
                ${isAuthenticated ? `
                    <a class="post_action update_post" id="update_post" role="button">UPD</a>
                    <a class="post_action delete_post" id="delete_post" role="button">DEL</a>` : ""}
                
                <a class="post_action close_post" href="/blog.html">BACK</a>
            </div>

            <text-label text=${category}></text-label>
            <section>
                <div id="post__container"></div>
            </section>
            <section class="image__section">
                <img src="${postCoverPath}">
            </section>
        `;
    }
}

customElements.define(
    "blog-display",
    BlogDisplay
);