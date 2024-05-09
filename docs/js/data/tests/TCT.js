import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { cloneObject } from "../../utils.js";
import { getTemplateContent } from "./utils.js";

function isEverythingFilledIn() {
    const state = observableState.getObject();

    for(let i = 1; i <= 4; i++) {
        if(
            !state?.tct?.hasOwnProperty(`assignment_${i}`)
            || !state?.tct[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function createPartialScores() {
    const state = observableState.getObject();

    return `${state?.tct?.assignment_1}-${state?.tct?.assignment_2}-${state?.tct?.assignment_3}-${state?.tct?.assignment_4}`;
}

function updateIndividualScoresFromPartialScores(partialScores) {
    const state = observableState.getObject();
    const newState = cloneObject(state);
    const splitScores = partialScores.match(/[0-9]+/g);

    for(let i = 1; i <= 4; i++) {
        newState.tct[`assignment_${i}`] = (splitScores.hasOwnProperty(i - 1) && splitScores[i-1].length) ? parseInt(splitScores[i-1]).toString() : "0";
    }

    state.tct = newState.tct;
}

function disableFields() {
    document.querySelectorAll(".test-item").forEach(element => element.classList.add("disabled"));
    for(let i = 1; i <= 4; i++) {
        document.testForm[`tct.assignment_${i}`].forEach(element => element.disabled = true);
    }
}

function enableFields() {
    document.querySelectorAll(".test-item").forEach(element => element.classList.remove("disabled"));
    for(let i = 1; i <= 4; i++) {
        document.testForm[`tct.assignment_${i}`].forEach(element => element.disabled = false);
    }
}

function calculateTotalScore() {
    const state = observableState.getObject();

    return [1,2,3,4].map(
        assignmentNumber => parseInt(state?.tct[`assignment_${assignmentNumber}`] ?? 0)
    ).reduce((previousValue, currentValue) => previousValue += currentValue);
}

const templateContent = await getTemplateContent("TCT.html");

export default new Test({
    id: "tct",
    shortName: "TCT",
    longName: "Trunk Control Test",
    description: `
De Trunk Control Test evalueert de <strong>rompstabiliteit</strong> van <strong>CVA-patiënten</strong> en geeft op basis daarvan een inschatting van de  <strong>zelfstandigheid</strong> van de patiënt.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/trunk-control-test/",

    onStateChange: (newState) => {
        if(newState?.tct?.pre?.partial_scores?.length) {
            const knownPartialScores = newState.tct.pre.partial_scores;

            disableFields();
            updateIndividualScoresFromPartialScores(knownPartialScores);
        } else {
            enableFields();
        }

        if(isEverythingFilledIn()) {
            document.getElementById("tct-results-wrapper").classList.remove("d-none");

            const partialScores = createPartialScores();
            document.getElementById("tct-partial-scores").innerText = partialScores;

            const totalScore = calculateTotalScore();
            document.getElementById("tct-total-score").innerHTML = `<span class="fs-3 fw-bold">${totalScore}</span>&nbsp;/&nbsp;100`;
        } else {
            document.getElementById("tct-results-wrapper").classList.add("d-none");
        }
    }
});