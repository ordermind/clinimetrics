export default class Page {
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

    }

    getRenderData() {

    }

    unmount() {

    }
}
