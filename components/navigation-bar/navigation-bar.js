export class NavigationBar extends HTMLElement {
    async connectedCallback() {
        const css = await fetch("./components/navigation-bar/navigation-bar.css")
            .then(r => r.text());

        this.render(css);

        this.setActive();
    }

    setActive() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .replace(".html", "");


        const page =
            currentPage === ""
                ? "index"
                : currentPage;


        const item =
            this.querySelector(`[data-page="${page}"]`);


        if (item) {
            item.classList.add("active");
        }
    }

    render(css, js) {
        this.innerHTML = `
            <style>${css}</style>

            <div class="navig">

                <a class="navig__logo">D</a>
                <a class="navig__item" data-page="index" href="/">Home</a>
                <a class="navig__item" data-page="about" href="/about.html">About</a>
                <a class="navig__item" data-page="projects" href="/projects.html">Projects</a>
                <a class="navig__item" data-page="contact" href="/contact.html">Contact</a>

            </div>
        `;
    }
}


customElements.define(
    "navigation-bar",
    NavigationBar
);