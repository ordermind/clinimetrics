export default class Test {
    #id;
    #shortName;
    #longName;
    #externalSourceUrl;
    #getformContentHTML;
    #onStateChange;

    constructor({id, shortName = "", longName, externalSourceUrl = "", getformContentHTML, onStateChange = null}) {
        this.#id = id;
        this.#shortName = shortName;
        this.#longName = longName;
        this.#externalSourceUrl = externalSourceUrl;
        this.#getformContentHTML = getformContentHTML;
        this.#onStateChange = onStateChange;

        this.getContent = this.getContent.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
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
        if(!this.#shortName) {
            return this.#longName;
        }

        return `${this.#longName} (${this.#shortName})`;
    }

    get externalSourceUrl() {
        return this.#externalSourceUrl;
    }

    getContent() {
        return `<form class="test-form">${this.#getformContentHTML()}</form>`;
    }

    onStateChange(state) {
        if(!this.#onStateChange) {
            return;
        }

        this.#onStateChange(state);
    }
}
