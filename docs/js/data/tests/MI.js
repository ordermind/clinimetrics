import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { formatNumber, getTemplateContent } from "./utils.js";

function applyInterFieldEffects(newState) {
    // Set and disable arm fields if the results are already known
    if(newState?.mi?.pre?.partial_scores?.arm?.length) {
        const splitScores = newState.mi.pre.partial_scores.arm.match(/[0-9]+/g);

        for(let i = 1; i <= 3; i++) {
            newState.mi[`assignment_${i}`] = (splitScores.hasOwnProperty(i - 1) && splitScores[i-1].length) ? parseInt(splitScores[i-1]).toString() : "0";
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.add("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = true);
        }
    } else {
        for(let i = 1; i <= 3; i++) {
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.remove("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = false);
        }
    }

    // Set and disable leg fields if the results are already known
    if(newState?.mi?.pre?.partial_scores?.leg?.length) {
        const splitScores = newState.mi.pre.partial_scores.leg.match(/[0-9]+/g);

        for(let i = 4; i <= 6; i++) {
            newState.mi[`assignment_${i}`] = (splitScores.hasOwnProperty(i - 4) && splitScores[i-4].length) ? parseInt(splitScores[i-4]).toString() : "0";
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.add("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = true);
        }
    } else {
        for(let i = 4; i <= 6; i++) {
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.remove("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = false);
        }
    }

    const state = observableState.getObject();
    state.mi = newState.mi;
}

function isArmDataFilledIn(newState) {
    for(let i = 1; i <= 3; i++) {
        if(
            !newState?.mi?.hasOwnProperty(`assignment_${i}`)
            || !newState?.mi[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function isLegDataFilledIn(newState) {
    for(let i = 4; i <= 6; i++) {
        if(
            !newState?.mi?.hasOwnProperty(`assignment_${i}`)
            || !newState?.mi[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function isEverythingFilledIn(newState) {
    return isArmDataFilledIn(newState) && isLegDataFilledIn(newState);
}

function calculateArmScore(newState) {
    let armScore = [1,2,3].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.mi[`assignment_${assignmentNumber}`]), 0);

    if(armScore === 99) {
        armScore = 100;
    }

    return armScore;
}

function calculateAndDisplayArmScore(newState) {
    const armScore = calculateArmScore(newState);

    document.getElementById("arm-score").innerHTML = armScore;
    document.getElementById("arm-results-wrapper").classList.remove("d-none");
}

function hideArmScore() {
    document.getElementById("arm-results-wrapper").classList.add("d-none");
}

function calculateLegScore(newState) {
    let legScore = [4,5,6].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.mi[`assignment_${assignmentNumber}`]), 0);

    if(legScore === 99) {
        legScore = 100;
    }

    return legScore;
}

function calculateAndDisplayLegScore(newState) {
    const legScore = calculateLegScore(newState);

    document.getElementById("leg-score").innerHTML = legScore;
    document.getElementById("leg-results-wrapper").classList.remove("d-none");
}

function hideLegScore() {
    document.getElementById("leg-results-wrapper").classList.add("d-none");
}

function calculateAndDisplayTotalScore(newState) {
    const totalScore = (calculateArmScore(newState) + calculateLegScore(newState)) / 2;

    document.getElementById("total-score").innerHTML = formatNumber(totalScore) + "%";
    document.getElementById("total-score-wrapper").classList.remove("d-none");
}

function hideTotalScore() {
    document.getElementById("total-score-wrapper").classList.add("d-none");
}

const templateContent = await getTemplateContent("MI.html");

export default new Test({
    id: "mi",
    shortName: "MI",
    longName: "Motricity Index",
    description: `
Met de Motricity Index kan de <strong>mate van hemiplegie</strong> van zowel de armen als de benen gemeten worden. Een hoge score op de Motricity Index komt overeen met een hoge mate van <strong>kracht</strong>. Doelgroep: CVA-patiënten.
    `.trim(),
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/motricity-index/",
    templateContent,
    onStateChange: (newState) => {
        applyInterFieldEffects(newState);

        if(isArmDataFilledIn(newState)) {
            calculateAndDisplayArmScore(newState);
        } else {
            hideArmScore();
        }

        if(isLegDataFilledIn(newState)) {
            calculateAndDisplayLegScore(newState);
        } else {
            hideLegScore();
        }

        if(isEverythingFilledIn(newState)) {
            calculateAndDisplayTotalScore(newState);
        } else {
            hideTotalScore();
        }
    }
});