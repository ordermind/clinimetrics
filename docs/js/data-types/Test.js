import Page from "./Page.js";

export default class Test extends Page {
    #shortName;
    #longName;

    constructor({id, shortName, longName}) {
        super({slug: id, title: longName});

        this.#shortName = shortName;
        this.#longName = longName;
    }

    get id() {
        return this.slug;
    }

    get shortName() {
        return this.#shortName;
    }

    get longName() {
        return this.#longName;
    }

    getFields() {
        throw new Error("Please implement this method in the subclass");
    }
}
