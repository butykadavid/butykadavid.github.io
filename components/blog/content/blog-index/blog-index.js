import "../blog-card/blog-card.js";
import "../../../UI/text-label/text-label.js"

const sizes = ["small", "medium", "large"];
const sideCategories = ["fun", "creativity"];

export class BlogIndex extends HTMLElement {

    async connectedCallback() {
        const css = await fetch("./components/blog/content/blog-index/blog-index.css")
            .then(r => r.text());

        const allPosts = await fetch("./data/blog/posts.json")
            .then(r => r.json());

        const params = new URLSearchParams(window.location.search);
        const categoryFilter = params.get("category")

        let filteredPosts = allPosts;
        let isFiltered = false

        if (categoryFilter) {
            filteredPosts = filteredPosts.filter(fp => fp.category == categoryFilter)
            isFiltered = true
        }

        const mainPanelPosts = filteredPosts.filter(p => !sideCategories.includes(p.category))
        const mainPanelRows = this.allocateSizes(mainPanelPosts);
        const sidePanelPosts = filteredPosts.filter(p => sideCategories.includes(p.category))

        const uniqueCategories = allPosts.map(p => p.category).reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])

        this.render(css, mainPanelRows, sidePanelPosts, uniqueCategories, isFiltered);

        const resetFilter = document.querySelector("#reset_filter")
        resetFilter.addEventListener("click", () => {
            window.location.replace("/blog.html")
        })
    }

    allocateSizes(posts) {
        if (!posts.length) return [];

        const rows = [];

        rows.push({
            type: "featured",
            posts: [
                {
                    ...posts[0],
                    size: "featured"
                }
            ]
        });

        let index = 1;

        const patterns = [
            {
                type: "large-small",
                sizes: ["large", "small"]
            },
            {
                type: "medium-medium",
                sizes: ["medium", "medium"]
            },
            {
                type: "small-small-small",
                sizes: ["small", "small", "small"]
            }
        ];

        let patternIndex = 0;

        while (index < posts.length) {
            const remaining = posts.length - index;
            const pattern = patterns[patternIndex];

            if (remaining === 1) {
                rows.push({
                    type: "featured",
                    posts: [
                        {
                            ...posts[index],
                            size: "large"
                        }
                    ]
                });

                break;
            }

            if (remaining === 2) {
                rows.push({
                    type: "medium-medium",
                    posts: [
                        {
                            ...posts[index],
                            size: "medium"
                        },
                        {
                            ...posts[index + 1],
                            size: "medium"
                        }
                    ]
                });

                break;
            }

            rows.push({
                type: pattern.type,
                posts: pattern.sizes.map((size, offset) => ({
                    ...posts[index + offset],
                    size
                }))
            });

            index += pattern.sizes.length;
            patternIndex = (patternIndex + 1) % patterns.length;
        }

        return rows;
    }

    render(css, mainPanelRows, sidePanelPosts, categories, isFiltered) {
        this.innerHTML = `
            <style>
                ${css}
            </style>

            ${mainPanelRows.length > 0 ? `
                <div class="blog__index">
                    <div class="categories__container">
                        <div>
                            <p>Categories</p> ${isFiltered ? '<span id="reset_filter">Reset filter</span>' : ''}
                        </div>
                        <div class="blog__index__categories">
                            ${categories.map(cat => `<text-label text="${cat}" font-size="14px"></text-label>`).join("")}
                        </div>
                    </div>
                    <div class="blog-view">
                        <div class="blog-grid">
                        ${mainPanelRows.map(row => `
                            <div class="blog-grid__row blog-grid__row--${row.type}">
                                ${row.posts.map(post => `
                                    <blog-card
                                        id="${post.id}"
                                        title="${post.title}"
                                        description="${post.description}"
                                        timestamp="${post.timestamp}"
                                        category="${post.category}"
                                        tags="${post.tags.join(";")}"
                                        size="${post.size}"
                                        cover="${post.cover}">
                                    </blog-card>
                                `).join("")}
                            </div>
                        `).join("")}
                        </div>
                        <div class="blog-sidebar">
                            ${sidePanelPosts.map(post => `
                                <blog-card 
                                    id="${post.id}"
                                    title="${post.title}" 
                                    description="${post.description}"
                                    timestamp="${post.timestamp}"
                                    category="${post.category}"
                                    tags="${post.tags.join(";")}"
                                    cover="${post.cover}">
                                </blog-card>
                            `).join("")}
                        </div>
                    </div>
                </div>`
                : `<center><h1>No posts yet!<h1/></center>`
            }
        `;
    }
}

customElements.define(
    "blog-index",
    BlogIndex
);