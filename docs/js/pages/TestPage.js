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
        const scopedState = {general: state.general ?? {}, "6mwt": state["6mwt"] ?? {}}
        const scopedStateDot = convertObjectToDotNotation(scopedState);
        for(const key in scopedStateDot) {
            const element = document.querySelector(`[name="${key}"]`);
            if(!element) {
                continue;
            }

            element.value = scopedStateDot[key];
        }
    }

    mount() {
        super.mount();
    }

    render() {
        const content = `
<div class="page page-test">
    <h1 class="display-1 fs-1">${this.#test.fullName}</h1>
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
    }

    unmount() {
        document.querySelector(".test-form").removeEventListener("change", this.#onFormElementChange);
    }
}
