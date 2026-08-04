export class TextLabel extends HTMLElement {

    async connectedCallback() {

        const css = await fetch("./components/UI/text-label/text-label.css").then((res) => res.text())

        const text = this.getAttribute("text")
        const fontSize = this.getAttribute("font-size")

        this.render(css, text, fontSize)
    }

    render(css, text, fontSize) {
        this.innerHTML = `
            <style>${css}</style>

            <span ${fontSize && `style="font-size: ${fontSize}"`}>${text}</span>
        `;
    }
}


customElements.define(
    "text-label",
    TextLabel
);