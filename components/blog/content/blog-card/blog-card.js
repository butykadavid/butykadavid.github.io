export class BlogCard extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/blog/content/blog-card/blog-card.css")
            .then(r => r.text());

        const id = this.getAttribute("id");
        const title = this.getAttribute("title");
        const description = this.getAttribute("description");
        const timestamp = this.getAttribute("timestamp");
        const category = this.getAttribute("category");
        const tags = this.getAttribute("tags").split(";");
        const size = this.getAttribute("size");
        const coverFileName = this.getAttribute("cover");

        const coverSrc = coverFileName != "null" ? `./data/blog/posts/${id}/${coverFileName}` : null;
        const date = new Date(timestamp * 1000).toString().split("(")[0]


        this.render(css, { title, description, date, category, tags, coverSrc, size });

        this.classList.add("blog-card");
        this.classList.add(size);

        const article = this.querySelector(".blog__article__card")
        article.addEventListener("click", () => {
            window.location.href = `/blog.html?postId=${id}`
        })
    }

    render(css, post) {
        this.innerHTML = `
            <style>
                ${css}
            </style>

            <article class="blog__article__card">
                <div class="blog__article__container">
                    ${post.coverSrc ? `<img src="${post.coverSrc}" alt="${post.title}">` : ``}
                    <div class="blog-card__content">
                        <span class="tag">${post.category}</span>
                        <h2>${post.title}</h2>
                        <p>${post.description}</p>
                        <time>${post.date}</time>
                    </div>
                </div>
            </article>
        `;
    }
}

customElements.define(
    "blog-card",
    BlogCard
);