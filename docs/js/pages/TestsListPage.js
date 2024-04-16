import Page from "../data-types/Page.js";

export default class TestsListPage extends Page {
    #arrTests;

    constructor({arrTests}) {
        super({slug: "tests", title: "Tests"});

        this.#arrTests = arrTests;
    }

    mount() {

    }

    getRenderData() {
        return {};
    }

    unmount() {

    }
}
