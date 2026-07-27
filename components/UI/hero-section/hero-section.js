export class HeroSection extends HTMLElement {

    async connectedCallback() {

        const css = await fetch("./components/UI/hero-section/hero-section.css").then((res) => res.text())

        const title = this.getAttribute("title") ?? "Hero title";
        const description = this.getAttribute("description") ?? "Hero description lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque eros quis felis ullamcorper, at hendrerit justo mattis. Nulla augue justo, placerat quis purus non, auctor imperdiet neque. Fusce condimentum tincidunt nunc ut placerat.";
        const width = this.getAttribute("width") ?? "80%"

        this.render(title, description, width, css)
    }

    render(title, description, width, css) {
        this.innerHTML = `
            <style>${css}</style>

            <div class="hero__container">
            <div style="width: ${width}" class="hero__inner">
                <h1>${title}</h1>
                <p>${description}</p>
            </div>
            </div>
        `;
    }
}


customElements.define(
    "hero-section",
    HeroSection
);