export class NavigationBarBlog extends HTMLElement {
    async connectedCallback() {
        const css = await fetch("./components/blog/navigation-bar-blog/navigation-bar-blog.css")
            .then(r => r.text());

        this.render(css);
    }

    render(css, js) {
        this.innerHTML = `
            <style>${css}</style>

            <div class="navig">
            <div class="nav__ad">
                <span>DVDBTYK</span>
                <span>Developer blog</span>
            </div>
                <button class="nav__item" href="/">Back to home</button>
            </div>
        `;
    }
}


customElements.define(
    "navigation-bar-blog",
    NavigationBarBlog
);