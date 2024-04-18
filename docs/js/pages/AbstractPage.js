import { renderPage } from "../renderer.js";

export default class AbstractPage {
    #slug;
    #title;

    constructor({slug, title}) {
        this.#slug = slug;
        this.#title = title;
    }

    get slug() {
        return this.#slug;
    }

    get title() {
        return this.#title;
    }

    mount() {
        document.title = `Clinimetrie | ${this.#title}`;
        window.scrollTo(0, 0);
    }

    render() {
        const content = `
<div class="page">
    <h1 class="display-1 fs-1">${this.#title}</h1>
</div>
        `.trim();


        renderPage({
            header: [

            ],
            main: [
                content,
            ],
        })
    }

    postRender() {

    }

    unmount() {

    }
}
