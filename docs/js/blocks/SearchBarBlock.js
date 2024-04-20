import { replaceInternalLinks } from "../renderer.js";
import { addLinkEventListeners, cleanUpLinkEventListeners } from "../router.js";
import { debounce, massageStringForFlexibleComparison, removeChildren } from "../utils.js";

export default class SearchBarBlock {
    #items;

    constructor({items}) {
        this.#items = items;

        this.onUpdateFilters = debounce(this.onUpdateFilters.bind(this));
        this.onDocumentClick = this.onDocumentClick.bind(this);
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
        const inputElement = document.querySelector([`.search-wrapper input[name="fullName"]`]);

        document.body.removeEventListener("click", this.onDocumentClick);
        inputElement.removeEventListener("keyup", this.onUpdateFilters);

    }
}