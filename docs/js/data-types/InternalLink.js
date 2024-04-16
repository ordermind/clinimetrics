export default class InternalLink {
    #type;
    #targetId;
    #label;

    constructor({type, targetId, label}) {
        this.#type = type;
        this.#targetId = targetId;
        this.#label = label;
    }

    get type() {
        return this.#type;
    }

    get targetId() {
        return this.#targetId;
    }

    get label() {
        return this.#label;
    }
}