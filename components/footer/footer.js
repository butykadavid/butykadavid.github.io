export class PortfolioFooter extends HTMLElement {

    async connectedCallback() {
        const year = this.getAttribute("year") ?? "2026";
        const version = this.getAttribute("version") ?? "1.0";

        const css = await fetch("./components/footer/footer.css")
            .then(r => r.text());

        this.render(year, version, css);
    }

    render(year, version, css) {
        this.innerHTML = `
                <style>${css}</style>
                
                    <div class="lg">
                        <div class="footer">
                            <div class="left">
                                <p>Dávid Butyka - ${year} - ${version}</p>
                            </div>

                            <div class="right">
                                <a href="/blog.html" title="Blog">
                                    <img src="/components/footer/news.png">
                                </a>

                                <a href="https://www.github.com/butykadavid" target="_blank" title="GitHub">
                                    <img src="/components/footer/github.png">
                                </a>

                                <a href="https://www.linkedin.com/in/d%C3%A1vid-butyka-565a7a236" target="_blank" title="LinkedIn">
                                    <img src="/components/footer/linkedin.png">
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="sm">
                        <div class="footer">
                            <a href="/blog.html" title="Blog">
                                <img src="/components/footer/news.png">
                            </a>

                            <a href="https://www.github.com/butykadavid" target="_blank" title="GitHub">
                                <img src="/components/footer/github.png">
                            </a>

                            <a href="https://www.linkedin.com/in/d%C3%A1vid-butyka-565a7a236" target="_blank" title="LinkedIn">
                                <img src="/components/footer/linkedin.png">
                            </a>
                        </div>
                    </div>
            `;
    }
}

customElements.define(
    "portfolio-footer",
    PortfolioFooter
);