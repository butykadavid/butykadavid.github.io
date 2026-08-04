import "../blog-card/blog-card.js";
import "../../../UI/text-label/text-label.js"

const sizes = ["small", "medium", "large"];

export class BlogIndex extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/blog/content/blog-index/blog-index.css")
            .then(r => r.text());

        const posts = await fetch("./data/blog/posts.json")
            .then(r => r.json());


        this.render(css, posts);
    }

    render(css, posts) {
        this.innerHTML = `
            <style>
                ${css}
            </style>

            <div class="blog__index">
                <div class="categories__container">
                    <p>Categories</p>
                    <div class="blog__index__categories">
                        ${posts.map(post => `<text-label text="${post.category}" font-size="14px"></text-label>`).join("")}
                    </div>
                </div>
                <div class="blog-grid">
                    ${posts.map(post => `
                        <blog-card 
                            id="${post.id}"
                            title="${post.title}" 
                            description="${post.description}" 
                            timestamp="${post.timestamp}"
                            category="${post.category}"
                            tags="${post.tags.join(";")}"
                            size="${post.id == posts[0].id ? "featured" : sizes[Math.floor(Math.random() * sizes.length)]}">
                        </blog-card>
                    `).join("")}
                </div>
            </div>
        `;
    }
}

customElements.define(
    "blog-index",
    BlogIndex
);