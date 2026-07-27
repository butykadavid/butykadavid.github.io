import "./navigationBar/navigation-bar.js";
import "./footer/footer.js";

import "./UI/hero-section/hero-section.js"
import "./UI/project-showroom/project-showroom.js"

export class PortfolioApp extends HTMLElement {

    connectedCallback() {

        const children = this.innerHTML;

        this.render(children)
    }

    render(children) {
        this.innerHTML = `
            <navigation-bar></navigation-bar>
            
            <main id="view">
                ${children}
            </main>

            <portfolio-footer year="2026" version="2.0"></portfolio-footer>
        `;
    }
}


customElements.define(
    "portfolio-app",
    PortfolioApp
);