import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { backendBaseUrl } from "../../../../appsettings.js";


export class UploadComponent extends HTMLElement {

    async connectedCallback() {
        const css = await fetch(
            "./components/blog/upload/upload.css"
        ).then(r => r.text());

        this.render(css);
        this.bindEvents();
    }

    render(css) {
        this.innerHTML = `
            <style>${css}</style>

            <div class="upload__container">

                <header class="upload__header">
                    <h1>Create post</h1>
                </header>

                <section class="post__metadata">
                    <label>
                        <span>Title</span>
                        <input
                            id="title"
                            type="text"
                            placeholder="Post title..."
                        >
                    </label>

                    <label>
                        <span>Description</span>
                        <textarea
                            id="description"
                            rows="3"
                            placeholder="Short description..."
                        ></textarea>
                    </label>

                    <div class="metadata__row">
                        <label>
                            <span>Category</span>

                            <select id="category">
                                <option value="development">
                                    Development
                                </option>
                                
                                <option value="engineering">
                                    Engineering
                                </option>

                                <option value="creativity">
                                    Creativity
                                </option>

                                <option value="career">
                                    Career
                                </option>

                                <option value="thoughts">
                                    Thoughts
                                </option>

                                <option value="tutorials">
                                    Tutorials
                                </option>

                                <option value="fun">
                                    Fun
                                </option>
                            </select>
                        </label>

                        <label class="tags__field">
                            <span>Tags</span>

                            <input
                                id="tags"
                                type="text"
                                placeholder="javascript, web-components, css"
                            >
                        </label>
                    </div>

                    <label class="img__upload">
                        <span>Cover image</span>

                        <div
                            id="cover-drop"
                            class="cover__drop"
                        >
                            <input
                                id="cover"
                                type="file"
                                accept="image/*"
                                hidden
                            >

                            <div>
                                <strong>Choose cover image</strong>
                                <small>
                                    PNG, JPG or WebP
                                </small>
                            </div>
                        </div>
                    </label>

                </section>


                <section class="editor">

                    <div class="editor__header">

                        <span>Markdown</span>

                        <div class="editor__actions">
                            <button
                                type="button"
                                data-action="bold"
                            >
                                B
                            </button>

                            <button
                                type="button"
                                data-action="italic"
                            >
                                I
                            </button>

                            <button
                                type="button"
                                data-action="heading"
                            >
                                H
                            </button>

                            <button
                                type="button"
                                data-action="code"
                            >
                                &lt;/&gt;
                            </button>

                        </div>

                    </div>


                    <div class="editor__workspace">

                        <textarea
                            id="markdown"
                            spellcheck="false"
                            placeholder="# Start writing..."
                        ></textarea>


                        <article
                            id="preview"
                            class="markdown__preview"
                        ></article>

                    </div>


                    <footer class="editor__footer">
                        <span id="word-count">
                            0 words
                        </span>

                        <span id="char-count">
                            0 characters
                        </span>
                    </footer>

                </section>

                <button
                        id="publish"
                        class="publish__button"
                    >
                        Publish
                    </button>

            </div>
        `;
    }

    bindEvents() {
        const markdown = this.querySelector("#markdown");
        const preview = this.querySelector("#preview");

        markdown.addEventListener("input", () => {
            preview.innerHTML = marked.parse(markdown.value);
            this.updateStats();
        });

        this.querySelector("#publish").addEventListener("click", () => this.publish());
        this.querySelector("#cover-drop").addEventListener("click", () => this.querySelector("#cover").click());
        this.querySelector("#cover").addEventListener("change", (event) => this.handleCover(event));

        this.querySelectorAll("[data-action]").forEach(button => {
            button.addEventListener("click", () => this.applyMarkdown(button.dataset.action));
        });
    }

    updateStats() {
        const text = this.querySelector("#markdown").value;

        const words = text.trim() ? text.trim().split(/\s+/).length : 0;

        this.querySelector("#word-count").textContent = `${words} words`;

        this.querySelector("#char-count").textContent = `${text.length} characters`;
    }

    handleCover(event) {
        const file = event.target.files[0];

        if (!file) return;

        const drop = this.querySelector("#cover-drop");

        drop.querySelector("strong").textContent = file.name;
    }

    applyMarkdown(action) {
        const editor = this.querySelector("#markdown");

        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const selected = editor.value.substring(start, end);

        let replacement = selected;

        switch (action) {
            case "bold":
                replacement = `**${selected || "bold text"}**`;
                break;

            case "italic":
                replacement = `*${selected || "italic text"}*`;
                break;

            case "heading":
                replacement = `## ${selected || "Heading"}`;
                break;

            case "code":
                replacement = `\`${selected || "code"}\``;
                break;
        }

        editor.setRangeText(replacement, start, end, "select");

        editor.dispatchEvent(new Event("input"));

        editor.focus();
    }

    async publish() {
        const formData = new FormData()

        formData.append("title", this.querySelector("#title").value.trim());
        formData.append("description", this.querySelector("#description").value.trim());
        formData.append("category", this.querySelector("#category").value);
        formData.append("tags", JSON.stringify(this.querySelector("#tags").value.split(",").map(tag => tag.trim()).filter(Boolean)));
        formData.append("cover", this.querySelector("#cover").files[0] ?? null)
        formData.append("content", this.querySelector("#markdown").value);

        const res = await fetch(`${backendBaseUrl}/blog/publish`, {
            method: "POST",
            credentials: "include",
            body: formData
        });

        if (res?.status === 200) {
            window.location.replace("/blog.html")
        } else {
            alert("Failed to upload post:", res?.statusText)
        }
    }
}

customElements.define(
    "upload-component",
    UploadComponent
);