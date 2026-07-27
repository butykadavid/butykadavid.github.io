import { data } from "../../../../data/projects/data.js";

export class ProjectTree extends HTMLElement {
    flatTree = [];
    _selectedId = null;

    set selectedId(value) {
        this._selectedId = value;
        this.renderNodes();
    }

    get selectedId() {
        return this._selectedId;
    }

    async connectedCallback() {
        const css = await fetch("./components/UI/project-showroom/project-tree/project-tree.css").then(res => res.text());
        const selectedProjectId = this.getAttribute("selectedProjectId") ?? null

        this.createFlatTree(data);

        this.render(css);
        this.renderNodes();

        const featured = this.flatTree.find(node => node.featured);
        if (featured) {
            this.selectedId = featured.id

            this.dispatchEvent(new CustomEvent("project-selected", {
                bubbles: true,
                detail: featured
            }));
        }

        this.addEventListener("node-clicked", e => {
            const node = this.flatTree.find(x => x.id === e.detail.id);

            if (!node)
                return;

            if (node.hasChildren) {
                node.expanded = !node.expanded;
                this.renderNodes();
            }
            else {
                this.dispatchEvent(
                    new CustomEvent("project-selected", {
                        bubbles: true,
                        detail: node
                    })
                );
            }
        });
    }

    navigateToNode(id) {
        const node = this.flatTree.find(x => x.id === id);

        if (!node) return;

        let parent = this.flatTree.find(x => x.id === node.parentId);

        while (parent) {
            parent.expanded = true;
            parent = this.flatTree.find(x => x.id === parent.parentId);
        }

        this.selectedId = id;

        this.renderNodes();

        this.dispatchEvent(new CustomEvent("project-selected", {
            bubbles: true,
            detail: node
        }));
    }

    getVisibleNodes() {
        return this.flatTree.filter(node => {
            if (node.parentId === null)
                return true;

            let parent = this.flatTree.find(x => x.id === node.parentId);

            while (parent) {
                if (parent.hasChildren && !parent.expanded)
                    return false;

                parent = this.flatTree.find(x => x.id === parent.parentId);
            }

            return true;
        });
    }

    createFlatTree(data) {
        let nextId = 0;

        const flatten = (node, level = 0, parentId = null) => {
            const id = nextId++;

            this.flatTree.push({
                id,
                parentId,
                level,
                name: node.name,
                description: node.description ?? "",
                content: node.content ?? "error.md",
                tags: node.tags ?? [],
                type: node.type ?? "folder",
                hasChildren: !!node.children?.length,
                expanded: true,
                featured: node.featured
            });

            node.children?.forEach(child => {
                flatten(child, level + 1, id);
            });
        };

        flatten(data);
    }

    render(css) {
        this.innerHTML = `
            <style>${css}</style>

            <div class="project-tree__container"></div>
        `;
    }

    renderNodes() {
        const container = this.querySelector(".project-tree__container");

        container.innerHTML =
            this.getVisibleNodes()
                .map(node => `
                    <project-node
                        id="${node.id}"
                        name="${node.name}"
                        level="${node.level}"
                        type="${node.type}"
                        hasChildren="${node.hasChildren}"
                        expanded="${node.expanded}"
                        selected="${node.id === this.selectedId}">
                    </project-node>
                `).join("");
    }

}

customElements.define(
    "project-tree",
    ProjectTree
);