export default class Test {
    #id;
    #shortName;
    #longName;
    #description;
    #templateContent;
    #externalSourceUrl;

    #getformContentHTML;
    #onStateChange;

    constructor({id, shortName = "", longName, description = "", templateContent, externalSourceUrl = "", getformContentHTML = null, onStateChange = null}) {
        this.#id = id;
        this.#shortName = shortName;
        this.#longName = longName;
        this.#description = description;
        this.#templateContent = templateContent;
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

    get description() {
        return this.#description;
    }

    get templateContent() {
        return this.#templateContent;
    }

    get externalSourceUrl() {
        return this.#externalSourceUrl;
    }

    getContent() {
        const formContentHtml = this.#getformContentHTML ? this.#getformContentHTML() : this.templateContent.replace("${description}", this.description ?? "").trim();

        return `<form name="testForm" class="test-form">${formContentHtml}</form>`;
    }

    onStateChange(newState) {
        if(!this.#onStateChange) {
            return;
        }

        this.#onStateChange(newState);
    }
}
