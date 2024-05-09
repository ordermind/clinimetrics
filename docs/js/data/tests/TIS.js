import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { getTemplateContent } from "./utils.js";

function enableTestItem(elements) {
    elements[0].closest(".test-item").classList.remove("disabled");
    elements.forEach(element => element.disabled = false);
}

function disableTestItem(elements) {
    elements[0].closest(".test-item").classList.add("disabled");
    elements.forEach(element => element.disabled = true);
}

function applyShowAllAssignmentsCheckbox(newState) {
    const assignmentsWrapper = document.getElementById("assignments-wrapper");
    if(newState?.tis?.show_all_assignments) {
        assignmentsWrapper.classList.add("show-all");
    } else {
        assignmentsWrapper.classList.remove("show-all");
    }
}

function applyInterFieldEffects(newState) {
    const state = observableState.getObject();

    if(!newState.hasOwnProperty("tis")) {
        newState.tis = {};
    }

    // First enable all assignments
    for(let i = 1; i <= 17; i++) {
        enableTestItem(document.testForm[`tis.assignment_${i}`]);
    }

    // If the S.1 scores 0, score 0 and disable all other assignments
    if(newState?.tis?.assignment_1 === "0") {
        for(let i = 2; i <= 17; i++) {
            newState.tis[`assignment_${i}`] = "0";
            disableTestItem(document.testForm[`tis.assignment_${i}`]);
        }
    }

    // Logic for specific assignments that should be scored 0 and disabled if another assignment is scored 0
    const disablingLogicMapping = {
        4: 5,
        5: 6,
        7: 8,
        8: 9,
        10: 11,
        12: 13,
        14: 15,
        16: 17,
    }

    for(const sourceAssignmentKey in disablingLogicMapping) {
        if(newState?.tis[`assignment_${sourceAssignmentKey}`] === "0") {
            newState.tis[`assignment_${disablingLogicMapping[sourceAssignmentKey]}`] = "0";
            disableTestItem(document.testForm[`tis.assignment_${disablingLogicMapping[sourceAssignmentKey]}`]);
        }
    }

    state.tis = newState.tis;
}

function isEverythingFilledIn(newState) {
    for(let i = 1; i <= 17; i++) {
        if(
            !newState?.tis?.hasOwnProperty(`assignment_${i}`)
            || !newState?.tis[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function calculateAndDisplayTotalScore(newState) {
    const staticSitScore = [1,2,3].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.tis[`assignment_${assignmentNumber}`]), 0);

    const dynamicSitScore = [4,5,6,7,8,9,10,11,12,13].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.tis[`assignment_${assignmentNumber}`]), 0);

    const coordinationScore = [14,15,16,17].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.tis[`assignment_${assignmentNumber}`]), 0);

    const totalScore = staticSitScore + dynamicSitScore + coordinationScore;

    document.getElementById("tis-static-sit-score").innerHTML = `${staticSitScore}&nbsp;/&nbsp;7`;
    document.getElementById("tis-dynamic-sit-score").innerHTML = `${dynamicSitScore}&nbsp;/&nbsp;10`;
    document.getElementById("tis-coordination-score").innerHTML = `${coordinationScore}&nbsp;/&nbsp;6`;
    document.getElementById("tis-total-score").innerHTML = `<span class="fs-3 fw-bold">${totalScore}</span>&nbsp;/&nbsp;23`;

    document.getElementById("results-wrapper").classList.remove("d-none");
}

function hideTotalScore() {
    document.getElementById("results-wrapper").classList.add("d-none");
}

const templateContent = await getTemplateContent("TIS.html");

export default new Test({
    id: "tis",
    shortName: "TIS",
    longName: "Trunk Impairment Scale",
    description: `
De Trunk Impairment Scale test evalueert het <strong>statisch en dynamisch evenwicht van het zitten</strong>. Doelgroep: patiënten met hersenaandoening, cerebral palsy, MS, Parkinson en CVA.`
    .trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/trunk-impairment-scale/",

    onStateChange: (newState) => {
        applyShowAllAssignmentsCheckbox(newState);
        applyInterFieldEffects(newState);

        if(isEverythingFilledIn(newState)) {
            calculateAndDisplayTotalScore(newState);
        } else {
            hideTotalScore();
        }
    }
});