import "./project-tree/project-tree.js";
import "./project-node/project-node.js";
import "./project-detail/project-detail.js";

export class ProjectShowroom extends HTMLElement {
    selectedProject = null;
    treeOpen = false;

    async connectedCallback() {
        const css = await fetch("./components/UI/project-showroom/project-showroom.css").then(res => res.text());

        const height = this.getAttribute("height") ?? 'auto'

        this.render(css, height);

        const tree = this.querySelector("project-tree");
        const detail = this.querySelector("project-detail");

        tree.addEventListener("project-selected", e => {
            if (!e.detail) return;

            this.selectedProject = e.detail;
            detail.project = this.selectedProject;
            tree.selectedId = this.selectedProject.id;

            tree.classList.remove("open");
            this.treeOpen = false;

            this.querySelector(".project-tree-toggle").innerHTML = `<span>${this.selectedProject.name}</span><span>▼</span>`;
        });

        const toggle = this.querySelector(".project-tree-toggle");

        toggle.addEventListener("click", () => {
            this.treeOpen = !this.treeOpen;

            tree.classList.toggle("open", this.treeOpen);

            toggle.innerHTML = this.treeOpen ? `<span>${this.selectedProject?.name ?? "Select"}</span><span>▲</span>` : `<span>${this.selectedProject?.name ?? "Select"}</span><span>▼</span>`;
        });

    }

    render(css, height) {
        this.innerHTML = `
            <style>${css}</style>
            <div class="project-showroom__container" style="height: ${height}">
                <button class="project-tree-toggle">
                    <span>Select</span><span>⯆</span>
                </button>
                <project-tree></project-tree>
                <project-detail></project-detail>
            </div>
        `;
    }
}

customElements.define(
    "project-showroom",
    ProjectShowroom
);