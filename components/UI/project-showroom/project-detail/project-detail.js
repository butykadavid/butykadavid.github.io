import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export class ProjectDetail extends HTMLElement {

    _project = null;
    css = "";
    requestId = 0;

    set project(value) {
        this._project = value;
        this.update();
    }

    get project() {
        return this._project;
    }

    async connectedCallback() {
        this.css = await fetch(
            "./components/UI/project-showroom/project-detail/project-detail.css"
        ).then(res => res.text());

        this.render();

        if (this.project) {
            this.update();
        }
    }

    async update() {
        if (!this.css || !this.project) return;

        const currentRequest = ++this.requestId;

        const markdown = await fetch(`./data/projects/content/${this.project?.content}`).then(res => res.text());

        if (currentRequest !== this.requestId) return;

        const container = this.querySelector(".project-detail__container");
        container.innerHTML = ""
        container.innerHTML += marked.parse(markdown);
        this.project?.tags.forEach(element => {
            container.innerHTML += `<span>#${element}</span>`
        });
    }

    render() {
        if (!this.css)
            return;

        this.innerHTML = `
            <style>${this.css}</style>

            <div class="project-detail__container">
                <p>Select a project</p>
            </div>
        `;
    }
}

customElements.define(
    "project-detail",
    ProjectDetail
);