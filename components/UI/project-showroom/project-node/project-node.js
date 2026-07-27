export class ProjectNode extends HTMLElement {
    async connectedCallback() {
        const css = await fetch(
            "./components/UI/project-showroom/project-node/project-node.css"
        ).then(res => res.text());

        this.render(css);

        this.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("node-clicked",
                {
                    bubbles: true,
                    detail: {
                        id: Number(this.getAttribute("id")),
                        hasChildren: this.getAttribute("hasChildren") === "true",
                    }
                }
            ));
        });
    }

    render(css) {
        const name = this.getAttribute("name");
        const level = Number(this.getAttribute("level"));
        const hasChildren = this.getAttribute("hasChildren") === "true";
        const expanded = this.getAttribute("expanded") === "true";
        const selected = this.getAttribute("selected") === "true";

        const icon = hasChildren ? (expanded ? '-' : '+') : '•'
        this.innerHTML = `
            <style>
                ${css}
            </style>

            <div class="project-node__container ${hasChildren ? 'folder' : 'file'} ${selected ? "selected" : ""} ${expanded && 'expanded'}" style="padding-left:${5 + level * 20}px">
                ${icon} ${name}
            </div>
        `;
    }
}

customElements.define(
    "project-node",
    ProjectNode
);