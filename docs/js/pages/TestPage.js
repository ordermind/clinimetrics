import AbstractPage from "./AbstractPage.js";
import { renderPage } from "../renderer.js";
import observableState, { defaultValue } from "../state.js";
import { convertObjectToDotNotation } from "../utils.js";
import HomeLinkBlock from "../blocks/HomeLinkBlock.js";
import SearchBarBlock from "../blocks/SearchBarBlock.js";
import { arrTests } from "../data/tests.js";

export default class TestPage extends AbstractPage {
    #test;
    #homeLinkBlock;
    #searchBarBlock;

    constructor({test}) {
        super({slug: test.id, title: test.longName});

        this.#test = test;
        this.#homeLinkBlock = new HomeLinkBlock();
        this.#searchBarBlock = new SearchBarBlock({items: arrTests.filter(item => item.id !== test.id)});

        this.onClickClearForm = this.onClickClearForm.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
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

    onClickClearForm() {
        const state = observableState.getObject();
        const testId = this.#test.id;

        if(defaultValue.hasOwnProperty("general")) {
            state.general = defaultValue.general;
        }
        if(defaultValue.hasOwnProperty(testId)) {
            state[testId] = defaultValue[testId];
        }
    }

    onStateChange() {
        this.#setDefaultValues();
    }

    #setDefaultValues() {
        const state = observableState.getObject();
        const testId = this.#test.id;
        const scopedState = {general: state.general ?? {}, [testId]: state[testId] ?? {}}
        const scopedStateDot = convertObjectToDotNotation(scopedState);
        for(const element of document.querySelectorAll(`.test-form [name]`)) {
            const key = element.name;
            this.#setDefaultValueForElement(element, scopedStateDot[key] ?? null);
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
        } else {
            element.checked = false;
        }
    }

    mount() {
        super.mount();
    }

    render() {
        const content = `
<div class="page page-test">
    <div class="d-flex justify-content-between align-items-start">
        <h1 class="display-1 fs-1">${this.#getPageTitle()}</h1>
        <button type="button" class="btn btn-secondary | btn-clear-form">Gegevens wissen</button>
    </div>
    ${this.#test.getContent()}
</div>
        `.trim();

        renderPage({
            header: [
                this.#homeLinkBlock.getElement(),
                this.#searchBarBlock.getElement(),
            ],
            main: [
                content,
            ],
        });
    }

    postRender() {
        this.#setDefaultValues();

        document.querySelector(".test-form").addEventListener("change", this.#onFormElementChange);
        document.querySelector(".btn-clear-form")?.addEventListener("click", this.onClickClearForm);

        observableState.addSubscriber("set-form-values", this.onStateChange);
        observableState.addSubscriber(this.#test.id, this.#test.onStateChange);
        this.#test.onStateChange(observableState.getObject());
    }

    unmount() {
        document.querySelector(".test-form").removeEventListener("change", this.#onFormElementChange);
        document.querySelector(".btn-clear-form")?.removeEventListener("click", this.onClickClearForm);

        observableState.removeSubscriber("set-form-values");
        observableState.removeSubscriber(this.#test.id);
        this.#homeLinkBlock.cleanUp();
        this.#searchBarBlock.cleanUp();
    }
}
