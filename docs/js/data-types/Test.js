export default class Test {
    #id;
    #shortName;
    #longName;
    #getformContentHTML;

    constructor({id, shortName, longName, getformContentHTML}) {
        this.#id = id;
        this.#shortName = shortName;
        this.#longName = longName;
        this.#getformContentHTML = getformContentHTML;
    }

    get id() {
        return this.#id;
    }

    get shortName() {
        return this.#shortName;
    }

    get longName() {
        return this.#longName;
    }

    get fullName() {
        return `${this.#longName} (${this.#shortName})`;
    }

    getContent() {
        return `<form class="test-form">${this.#getformContentHTML()}</form>`;
    }
}
