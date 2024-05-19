import { replaceNotes } from "../utils.js";

export default class Test {
    #id;
    #shortName;
    #longName;
    #description;
    #templateContent;
    #externalSourceUrl;

    #getformContentHTML;
    #onStateChange;
    #onFormElementChange;

    constructor({id, shortName = "", longName, description = "", templateContent, externalSourceUrl = "", getformContentHTML = null, onStateChange = null, onFormElementChange = null}) {
        this.#id = id;
        this.#shortName = shortName;
        this.#longName = longName;
        this.#description = description;
        this.#templateContent = templateContent;
        this.#externalSourceUrl = externalSourceUrl;

        this.#getformContentHTML = getformContentHTML;
        this.#onStateChange = onStateChange;
        this.#onFormElementChange = onFormElementChange;

        this.getContent = this.getContent.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onFormElementChange = this.onFormElementChange.bind(this);
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

        const htmlWithNotes = replaceNotes(formContentHtml);

        return `<form name="testForm" class="test-form">${htmlWithNotes}</form>`;
    }

    onStateChange(newState) {
        if(!this.#onStateChange) {
            return;
        }

        this.#onStateChange(newState);
    }

    onFormElementChange(e) {
        if(!this.#onFormElementChange) {
            return;
        }

        this.#onFormElementChange(e);
    }
}
