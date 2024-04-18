import AbstractPage from "./AbstractPage.js";
import { renderPage } from "../renderer.js";

export default class TestPage extends AbstractPage {
    #test;

    constructor({test}) {
        super({slug: test.id, title: test.longName});

        this.#test = test;
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
