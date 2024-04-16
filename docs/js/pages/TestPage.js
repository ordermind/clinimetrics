import Page from "../data-types/Page.js";

export default class TestPage extends Page {
    #test;

    constructor({test}) {
        super({slug: test.id, title: test.longName});

        this.#test = test;
    }

    mount() {
        for(const field of test.getFields()) {

        }
    }

    getRenderData() {
        return {};
    }

    unmount() {

    }
}
