import AbstractPage from "./AbstractPage.js";
import { renderPage } from "../renderer.js";
import observableState from "../state.js";
import { convertObjectToDotNotation } from "../utils.js";

export default class TestPage extends AbstractPage {
    #test;

    constructor({test}) {
        super({slug: test.id, title: test.longName});

        this.#test = test;
    }

    #getPageTitle() {
        let title = this.#test.fullName;

        if(this.#test.externalSourceUrl) {
            title += `&nbsp;<a href="${this.#test.externalSourceUrl}">🔗</a>`;
        }

        return title;
    }

    #onFormElementChange(e) {
        const element = e.target;

        if(!element.name) {
            return;
        }


        const setStateValueRecursive = (state, keys) => {
            if(keys.length === 1) {
                state[keys[0]] = element.value;
                return state;
            }

            const key = keys.shift();
            if(!state.hasOwnProperty(key)) {
                state[key] = {};
            }

            setStateValueRecursive(state[key], keys);
            return state;
        };

        const state = observableState.getObject();
        const keys = element.name.split(".");
        const firstKey = keys[0];
        const newState = setStateValueRecursive(JSON.parse(JSON.stringify(state)), keys);
        state[firstKey] = newState[firstKey]; //Trigger reactivity
    }

    #setDefaultValues() {
        const state = observableState.getObject();
        const testId = this.#test.id;
        const scopedState = {general: state.general ?? {}, [testId]: state[testId] ?? {}}
        const scopedStateDot = convertObjectToDotNotation(scopedState);
        for(const key in scopedStateDot) {
            for(const element of document.querySelectorAll(`[name="${key}"]`)) {
                this.#setDefaultValueForElement(element, scopedStateDot[key]);
            };
        }
    }

    #setDefaultValueForElement(element, value) {
        if(["text", "number"].includes(element.type)) {
            element.value = value;
            return;
        }

        if(element.tagName === "SELECT") {
            element.value = value;
            return;
        }

        if(element.type === "radio" && element.value === value) {
            element.checked = true;
        }
    }

    mount() {
        super.mount();
    }

    render() {
        const content = `
<div class="page page-test">
    <h1 class="display-1 fs-1">${this.#getPageTitle()}</h1>
    ${this.#test.getContent()}
</div>
        `.trim();

        renderPage({
            header: [

            ],
            main: [
                content
            ],
        });
    }

    postRender() {
        this.#setDefaultValues();

        document.querySelector(".test-form").addEventListener("change", this.#onFormElementChange);

        observableState.addSubscriber(this.#test.id, this.#test.onStateChange);
        this.#test.onStateChange(observableState.getObject());
    }

    unmount() {
        document.querySelector(".test-form").removeEventListener("change", this.#onFormElementChange);

        observableState.removeSubscriber(this.#test.id);
    }
}
