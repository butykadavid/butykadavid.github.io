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
                                <a href="https://www.instagram.com/_btykdvd_" target="_blank">
                                    <img src="img/instagram.png">
                                </a>

                                <a href="https://www.facebook.com/david.butyka" target="_blank">
                                    <img src="img/facebook.png">
                                </a>

                                <a href="https://www.linkedin.com/in/d%C3%A1vid-butyka-565a7a236" target="_blank">
                                    <img src="img/linkedin.png">
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="sm">
                        <div class="footer">
                            <a href="https://www.instagram.com/_btykdvd_" target="_blank">
                                <img src="img/instagram.png">
                            </a>

                            <a href="https://www.facebook.com/david.butyka" target="_blank">
                                <img src="img/facebook.png">
                            </a>

                            <a href="https://www.linkedin.com/in/d%C3%A1vid-butyka-565a7a236" target="_blank">
                                <img src="img/linkedin.png">
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