import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { getTemplateContent, scrollToNextQuestionOnFormElementChange } from "./utils.js";

function hasKnownScores(newState) {
    return newState?.bbs?.pre?.scores?.length;
}

function updateIndividualScoresFromKnownScores(newState) {
    const splitScores = Array.from(newState.bbs.pre.scores.matchAll(/([0-9]+)/g)).map(item => item[0]);

    for(const [index, score] of splitScores.entries()) {
        newState.bbs[`assignment_${index + 1}`] = score;
    }

    const state = observableState.getObject();
    state.bbs = newState.bbs;
}

function disableAllAssignments() {
    document.querySelectorAll(".test-item").forEach(testItem => {
        testItem.classList.add("disabled");
        testItem.querySelectorAll(`input[type="radio"]`).forEach(radioElement => {
            radioElement.disabled = true;
        })
    });
}

function enableAllAssignments() {
    document.querySelectorAll(".test-item").forEach(testItem => {
        testItem.classList.remove("disabled");
        testItem.querySelectorAll(`input[type="radio"]`).forEach(radioElement => {
            radioElement.disabled = false;
        })
    });
}

function applyShowAllAssignmentsCheckbox(newState) {
    const assignmentsWrapper = document.getElementById("assignments-wrapper");
    if(newState?.bbs?.show_all_assignments) {
        assignmentsWrapper.classList.add("show-all");
    } else {
        assignmentsWrapper.classList.remove("show-all");
    }
}

function applyInterFieldEffects(newState) {
    if(hasKnownScores(newState)) {
        disableAllAssignments();
        updateIndividualScoresFromKnownScores(newState);

        return;
    } else {
        enableAllAssignments();
    }

    // If the patient can stand independently, the sit test does not need to be executed.
    const sitTestScoreElements = document.testForm["bbs.assignment_3"];
    if(newState?.bbs?.assignment_2 === "4") {
        newState.bbs.assignment_3 = "4";

        const state = observableState.getObject();
        state.bbs = newState.bbs;
        sitTestScoreElements[0].closest(".test-item").classList.add("disabled");
        sitTestScoreElements.forEach(element => element.disabled = true);
    } else {
        sitTestScoreElements[0].closest(".test-item").classList.remove("disabled");
        sitTestScoreElements.forEach(element => element.disabled = false);
    }
}

function isEverythingFilledIn(newState) {
    for(let i = 1; i <= 14; i++) {
        if(
            !newState?.bbs?.hasOwnProperty(`assignment_${i}`)
            || !newState?.bbs[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function calculateTotalScore(newState) {
    const assignmentNumbers = Array.from({length: 14}, (_, i) => i + 1);

    return assignmentNumbers.reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.bbs[`assignment_${assignmentNumber}`]), 0);
}

function getScoreInterpretation(totalScore) {
    if(totalScore < 36) {
        return "De score is lager dan 36 => bijna 100% kans op een val de komende 6 maanden";
    }

    if(totalScore < 43) {
        return "De score is lager dan 43 => aanzienlijk valrisico bij zelfstandig lopen";
    }

    if(totalScore < 45) {
        return "De score is lager dan 45 => uitvoering volledig afhankelijk van hulpmiddelen en/of supervisie";
    }

    return "Onafhankelijke en zekere uitvoering zonder fysieke en verbale hulp";
}

function calculateAndDisplayTotalScore(newState) {
    const totalScore = calculateTotalScore(newState);

    document.getElementById("bbs-total-score").innerHTML = `<span class="fs-3 fw-bold">${totalScore}</span>&nbsp;/&nbsp;56`;
    document.getElementById("bbs-interpretation").innerHTML = getScoreInterpretation(totalScore);

    document.getElementById("results-wrapper").classList.remove("d-none");
}

function hideTotalScore() {
    document.getElementById("results-wrapper").classList.add("d-none");
}

const templateContent = await getTemplateContent("BBS.html");

export default new Test({
    id: "bbs",
    shortName: "BBS",
    longName: "Berg Balance Scale",
    description: `
De Berg Balance Scale meet het <strong>evenwicht</strong> tijdens sta- en transfervaardigheden en geeft op basis daarvan een inschatting van het <strong>valrisico</strong> van de patiënt. Doelgroep: CVA-patiënten en patiënten met evenwichtsstoornissen.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/berg-balance-scale/",

    onStateChange: (newState) => {
        applyShowAllAssignmentsCheckbox(newState);
        applyInterFieldEffects(newState);

        // Calculate and show total score
        if(isEverythingFilledIn(newState)) {
            calculateAndDisplayTotalScore(newState);
        } else {
            hideTotalScore();
        }
    },
    onFormElementChange: (e) => {
        const state = observableState.getObject();

        scrollToNextQuestionOnFormElementChange(e, "bbs", state);
    },
});