import Page from "../data-types/Page.js";
import { renderPage } from "../renderer.js";

export default class TestsListPage extends Page {
    #arrTests;

    constructor({arrTests}) {
        super({slug: "tests", title: "Tests"});

        this.#arrTests = arrTests;
    }

    mount() {
        super.mount();
    }

    render() {
        renderPage({});
    }

    postRender() {

    }

    unmount() {

    }
}
