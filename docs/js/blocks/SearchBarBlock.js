import { replaceInternalLinks } from "../renderer.js";
import { addLinkEventListeners, cleanUpLinkEventListeners } from "../router.js";
import { debounce, massageStringForFlexibleComparison, removeChildren } from "../utils.js";

export default class SearchBarBlock {
    #items;

    constructor({items}) {
        this.#items = items;

        this.onUpdateFilters = debounce(this.onUpdateFilters.bind(this));
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onSearchKeyDown = this.onSearchKeyDown.bind(this);
    }

    #createSearchBarElement() {
        const inputElement = document.createElement("input");
        inputElement.name = "fullName";
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Naam test");
        inputElement.classList.add("form-control");
        inputElement.addEventListener("keyup", this.onUpdateFilters);

        const spyglassElement = document.createElement("span");
        spyglassElement.classList.add("ico", "ico-mglass");

        const searchResultsWrapper = document.createElement("div");
        searchResultsWrapper.classList.add("search-results");

        const wrapper = document.createElement("div");
        wrapper.classList.add("form-control-wrapper", "search-wrapper");

        wrapper.appendChild(inputElement);
        wrapper.appendChild(spyglassElement);
        wrapper.appendChild(searchResultsWrapper);

        document.body.addEventListener("click", this.onDocumentClick);
        wrapper.addEventListener("keydown", this.onSearchKeyDown);

        return wrapper;
    }

    #getFilteredItems() {
        const searchElement = document.querySelector([`.search-wrapper input[name="fullName"]`]);
        const filterValue = searchElement.value;

        if(!filterValue) {
            return [];
        }

        if(filterValue.length < 3) {
            return [];
        }

        return this.#items.filter(item => this.#filterSingleItemValue(item.fullName, filterValue)).slice(0, 10);
    }

    #filterSingleItemValue(itemValue, filterValue) {
        if(Array.isArray(itemValue)) {
            itemValue = itemValue.map(part => {
                if((typeof part === 'object' && part !== null)) {
                    return part.value;
                }

                return part;
            }).join("");
        }

        if (!(typeof itemValue === 'string' || itemValue instanceof String)) {
            return false;
        }

        return massageStringForFlexibleComparison(itemValue).includes(massageStringForFlexibleComparison(filterValue));
    }

    #renderSearchResults() {
        const searchResultsWrapper = document.querySelector([`.search-wrapper .search-results`]);
        removeChildren(searchResultsWrapper);

        const filteredItems = this.#getFilteredItems();
        if(!filteredItems.length) {
            return;
        }

        const tableElement = document.createElement("table");
        tableElement.classList.add("table");
        for(const item of filteredItems) {
            const rowElement = document.createElement("tr");
            rowElement.innerHTML = replaceInternalLinks(`<td>[Link type="Test" targetId="${item.id}" label="${item.fullName}"]</td>`);
            tableElement.appendChild(rowElement);
        }

        searchResultsWrapper.appendChild(tableElement);

        cleanUpLinkEventListeners();
        addLinkEventListeners();
    }

    onSearchKeyDown(e) {
        const wrapper = document.querySelector([`.search-wrapper`]);
        const searchResultsWrapper = wrapper.querySelector('.search-results');
        const inputElement = wrapper.querySelector([`input[name="fullName"]`]);

        function getNextSelection(currentSelection, firstResult) {
            if(!currentSelection || currentSelection.tagName === "INPUT") {
                return firstResult;
            }

            const nextSibling = currentSelection.closest("tr").nextSibling;
            if(!nextSibling) {
                return inputElement;
            }

            return nextSibling.querySelector("td a");
        }

        function getPreviousSelection(currentSelection, lastResult) {
            if(!currentSelection || currentSelection.tagName === "INPUT") {
                return lastResult;
            }

            const previousSibling = currentSelection.closest("tr").previousSibling;
            if(!previousSibling) {
                return inputElement;
            }

            return previousSibling.querySelector("td a");
        }

        if(!searchResultsWrapper.hasChildNodes()) {
            return;
        }

        const currentSelection = searchResultsWrapper.querySelector("table > tr td a:focus");
        const firstResult = searchResultsWrapper.querySelector("table > tr:first-child td a");
        const lastResult = searchResultsWrapper.querySelector("table > tr:last-child td a");

        if(e.code === 'ArrowDown') {
            e.preventDefault(); // prevent moving the cursor

            const newSelection = getNextSelection(currentSelection, firstResult);
            newSelection.focus();

            return;
        }

        if(e.code === 'ArrowUp') {
            e.preventDefault(); // prevent moving the cursor

            const newSelection = getPreviousSelection(currentSelection, lastResult);
            newSelection.focus();

            return;
        }
    }

    onUpdateFilters() {
        this.#renderSearchResults();
    }

    onDocumentClick(e) {
        if(e.target.closest(".search-wrapper")) {
            return;
        }

        const searchResultsWrapper = document.querySelector([`.search-wrapper .search-results`]);
        removeChildren(searchResultsWrapper);
    }

    getElement() {
        return this.#createSearchBarElement();
    }

    cleanUp() {
        const wrapper = document.querySelector([`.search-wrapper`]);
        const inputElement = wrapper.querySelector([`input[name="fullName"]`]);

        document.body.removeEventListener("click", this.onDocumentClick);
        wrapper.removeEventListener("keydown", this.onSearchKeyDown);
        inputElement.removeEventListener("keyup", this.onUpdateFilters);

    }
}