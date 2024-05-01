import AbstractPage from "./AbstractPage.js";
import { renderPage } from "../renderer.js";
import observableState, { defaultValue } from "../state.js";
import { cloneObject, convertObjectToDotNotation } from "../utils.js";
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
        this.onClickClearAll = this.onClickClearAll.bind(this);
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
        const isCheckBox = element.type === "checkbox";

        const elementValue = isCheckBox ? element.checked : element.value;

        if(!element.name) {
            return;
        }

        const setStateValueRecursive = (state, keys) => {
            if(keys.length === 1) {
                state[keys[0]] = elementValue;
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
        const newState = setStateValueRecursive(cloneObject(state), keys);
        state[firstKey] = newState[firstKey]; //Trigger reactivity
    }

    onClickClearForm() {
        const state = observableState.getObject();
        const testId = this.#test.id;

        if(defaultValue.hasOwnProperty("general")) {
            state.general = cloneObject(defaultValue.general);
        } else {
            state.general = {};
        }


        if(defaultValue.hasOwnProperty(testId)) {
            state[testId] = cloneObject(defaultValue[testId]);
        } else {
            state[testId] = {};
        }
    }

    onClickClearAll() {
        const state = observableState.getObject();

        for(const key in state) {
            if(defaultValue.hasOwnProperty(key)) {
                state[key] = cloneObject(defaultValue[key]);
            } else {
                state[key] = {};
            }
        }
    }

    onStateChange() {
        this.#setDefaultValues();
    }

    #removeAllTestItemFilledClasses() {
        for(const testItemElement of document.querySelectorAll(".test-form .test-item")) {
            testItemElement.classList.remove("filled");
            if(testItemElement.attributes["data-item-type"].value === "radio") {
                testItemElement.querySelectorAll(".form-check").forEach(element => element.classList.remove("selected"));
            }
        }
    }

    #setOrRemoveTestItemFilledClass(element, value) {
        const testItemElement = element.closest(".test-item");

        if(!testItemElement) {
            return;
        }

        const isFilled = value !== null && value !== "";

        if(isFilled && testItemElement.checkVisibility()) {
            testItemElement.classList.add("filled");
        } else {
            testItemElement.classList.remove("filled");
        }

        if(element.type === "radio") {
            const wrapperElement = element.closest(".form-check");
            wrapperElement.classList.add("selected");
        }
    }

    #setDefaultValues() {
        this.#removeAllTestItemFilledClasses();

        const state = observableState.getObject();
        const testId = this.#test.id;
        const scopedState = {general: state.general ?? {}, [testId]: state[testId] ?? {}}
        const scopedStateDot = convertObjectToDotNotation(scopedState);
        for(const element of document.testForm.elements) {
            const key = element.name;
            this.#setDefaultValueForElement(element, scopedStateDot[key] ?? null);
        }
    }

    #setDefaultValueForElement(element, value) {
        if(["text", "number"].includes(element.type)) {
            element.value = value;
            this.#setOrRemoveTestItemFilledClass(element, value);

            return;
        }

        if(element.tagName === "SELECT") {
            element.value = value;
            this.#setOrRemoveTestItemFilledClass(element, value);

            return;
        }

        if(element.type === "radio") {
            if(element.value === value) {
                element.checked = true;
                this.#setOrRemoveTestItemFilledClass(element, true);
            } else {
                element.checked = false;
            }

            return;
        }

        if(element.type === "checkbox") {
            if(value) {
                element.checked = true;
                this.#setOrRemoveTestItemFilledClass(element, true);
            } else {
                element.checked = false;
            }
        }
    }

    mount() {
        super.mount();
    }

    render() {
        const content = `
<div class="page page-test">
    <div class="d-flex justify-content-between align-items-start flex-wrap | title-wrapper">
        <h1 class="display-1 fs-1 mb-3">${this.#getPageTitle()}</h1>
        <div class="d-flex mb-3">
            <button type="button" class="btn btn-secondary | btn-clear-form">Deze test wissen</button>
            <button type="button" class="btn btn-danger ms-2 | btn-clear-all">Alle tests wissen</button>
        </div>
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
        document.querySelector(".btn-clear-all")?.addEventListener("click", this.onClickClearAll);

        observableState.addSubscriber("set-form-values", this.onStateChange);
        observableState.addSubscriber(this.#test.id, this.#test.onStateChange);
        this.#test.onStateChange(cloneObject(observableState.getObject()));
    }

    unmount() {
        document.querySelector(".test-form").removeEventListener("change", this.#onFormElementChange);
        document.querySelector(".btn-clear-form")?.removeEventListener("click", this.onClickClearForm);
        document.querySelector(".btn-clear-all")?.removeEventListener("click", this.onClickClearAll);

        observableState.removeSubscriber("set-form-values");
        observableState.removeSubscriber(this.#test.id);
        this.#homeLinkBlock.cleanUp();
        this.#searchBarBlock.cleanUp();
    }
}
