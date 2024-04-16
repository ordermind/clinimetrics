export default class Subscriber {
    #id;
    #handler;

    constructor({id, handler}) {
        this.#id = id;
        this.#handler = handler;
    }

    get id() {
        return this.#id;
    }

    get handler() {
        return this.#handler;
    }
}