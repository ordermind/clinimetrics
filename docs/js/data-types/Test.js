export default class Test {
    #id;
    #shortName;
    #longName;

    constructor({id, shortName, longName}) {
        this.#id = id;
        this.#shortName = shortName;
        this.#longName = longName;
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

    getFields() {
        throw new Error("Please implement this method in the subclass");
    }
}
