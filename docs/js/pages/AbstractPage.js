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
        window.scrollTo(0, 0);
    }

    render() {

    }

    postRender() {

    }

    unmount() {

    }
}
