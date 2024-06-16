import Test from "../../data-types/Test.js";
import { getTemplateContent } from "./utils.js";
import observableState from "../../state.js";

function getCriteriaResultText(criteriaCount) {
    if(criteriaCount === 0) {
        return "Er is geen sprake van paratonie en ook niet van een andere tonusstoornis. Hertest over drie maanden.";
    }

    if(criteriaCount < 5) {
        return "Er is geen sprake van paratonie, maar mogelijk wel van een andere tonusstoornis. Doe een andere test of verwijs naar neuroloog.";
    }

    return "Er is sprake van paratonie. Neem de Modified Ashworth Scale (MAS) af om de ernst te bepalen.";
}

function displayResults(newState) {
    if(!newState?.pai?.hasOwnProperty("criteria")) {
        hideResults();

        return;
    }

    const criteriaCount = Object.values(newState.pai.criteria).filter(value => value === true).length;
    const criteriaResultText = getCriteriaResultText(criteriaCount);

    document.getElementById("pai-criteria-results").innerText = criteriaResultText;
    document.getElementById("pai-criteria-results-wrapper").classList.remove("d-none");

    if(criteriaCount === 5) {
        showMas();
    } else {
        hideMas();
    }
}

function hideResults() {
    document.getElementById("pai-criteria-results-wrapper").classList.add("d-none");
    document.getElementById("pai-criteria-results").innerText = "";
    hideMas();
}

function showMas() {
    document.getElementById("pai-mas-wrapper").classList.remove("d-none");
}

function hideMas() {
    document.getElementById("pai-mas-wrapper").classList.add("d-none");

    const state = observableState.getObject();
    const newState = JSON.parse(JSON.stringify(state));
    delete newState.pai.mas;

    state.pai = newState.pai;
}

function onFormElementChange(e) {
    if(e.target.id.startsWith("pai.criteria.")) {
        hideResults();
    }
}

function onClickClearForm() {
    hideResults();
}

function onDisplayCriteriaResultsClick(e) {
    const state = observableState.getObject();
    displayResults(state);
}

function postRender() {
    document.getElementById("pai-display-criteria-results").addEventListener("click", onDisplayCriteriaResultsClick);
}

function cleanup() {
    document.getElementById("pai-display-criteria-results").removeEventListener("click", onDisplayCriteriaResultsClick);
}

const templateContent = await getTemplateContent("PAI.html");

export default new Test({
    id: "pai",
    shortName: "PAI",
    longName: "Paratonia Assessment Instrument",
    description: `
De PAI inventariseert de aanwezigheid van paratonie bij de dementerende cliënt in lig of zit door de
extremiteiten passief te bewegen. Doelgroep: patiënten met dementie.
    `.trim(),
    templateContent,
    onFormElementChange,
    onClickClearForm,
    onClickClearAll: onClickClearForm,
    postRender,
    cleanup,
});