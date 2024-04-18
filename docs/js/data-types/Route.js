export default class Route {
    #paths;
    #createPage;

    constructor({paths, createPage}) {
        this.#paths = paths;
        this.#createPage = createPage;
    }

    get paths() {
        return this.#paths;
    }

    get createPage() {
        return this.#createPage;
    }
}