import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { formatNumber, getTemplateContent, scrollToNextQuestionOnFormElementChange } from "./utils.js";

function applyShowAllAssignmentsCheckbox(newState) {
    const assignmentsWrapper = document.getElementById("assignments-wrapper");
    if(newState?.demmi?.show_all_assignments) {
        assignmentsWrapper.classList.add("show-all");
    } else {
        assignmentsWrapper.classList.remove("show-all");
    }
}

function isEverythingFilledIn(newState) {
    if(!newState?.general?.hasOwnProperty("age")) {
        return false;
    }

    if(!newState?.general?.hasOwnProperty("sex")) {
        return false;
    }

    for(let i = 1; i <= 15; i++) {
        if(
            !newState?.demmi?.hasOwnProperty(`assignment_${i}`)
            || !newState?.demmi[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function calculateAndDisplayTotalScore(newState) {
    const rawToDemmiScoreTranslation = [0,8,15,20,24,27,30,33,36,39,41,44,48,53,57,62,67,74,85,100];

    const averageScores = {
        men: {
            "60-69": 82.8,
            "70-79": 88.4,
            "80-89": 76,
            "90+": 62,
            "total": 82.6,
        },
        women: {
            "60-69": 87.2,
            "70-79": 83.4,
            "80-89": 78.6,
            "total": 83.7,
        },
    }

    const sexKey = newState.general.sex === "M" ? "men" : "women";
    const sexPlural = newState.general.sex === "M" ? "mannen" : "vrouwen";

    function getInterpretationForTotalGenderValues(demmiScore) {
        const relativeScore = demmiScore / averageScores[sexKey].total;

        return `Score is ${formatNumber(relativeScore * 100, 0)}% van de gemiddelde score (${formatNumber(averageScores[sexKey].total)}) voor onafhankelijke ${sexPlural} ongeacht leeftijd`;
    }

    function getInterpretationForAgeSpecificGenderValues(demmiScore) {
        function getAgeKey() {
            if(newState.general.age < 60) {
                return null;
            }

            if(newState.general.age < 70) {
                return "60-69";
            }

            if(newState.general.age < 80) {
                return "70-79";
            }

            if(newState.general.age < 90) {
                return "80-89";
            }

            return "90+";
        }

        const ageKey = getAgeKey();

        const expectedScore = averageScores[sexKey]?.[ageKey] ?? null;
        if(!expectedScore) {
            return null;
        }

        const relativeScore = demmiScore / expectedScore;

        return `Score is ${formatNumber(relativeScore * 100, 0)}% van de gemiddelde score (${formatNumber(averageScores[sexKey][ageKey])}) voor onafhankelijke ${sexPlural} van de leeftijd ${ageKey}`;
    }

    const rawScores = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(assignmentNumber => {
        if(assignmentNumber === 11) {
            const walkedDistance = parseInt(newState?.demmi?.[`assignment_${assignmentNumber}`] ?? 0);

            if(walkedDistance < 10) {
                return 0;
            }

            if(walkedDistance < 50) {
                return 1;
            }

            return 2;
        }

        if(assignmentNumber === 12) {
            const selectedValue = newState?.demmi?.[`assignment_${assignmentNumber}`];
            return parseInt(document.getElementById(`demmi.assignment_${assignmentNumber}-${selectedValue}`).getAttribute("data-score"));
        }

        return parseInt(newState?.demmi?.[`assignment_${assignmentNumber}`] ?? 0);
    });

    const partialScores = {
        bedTransfers: [1,2,3].reduce((previousValue, assignmentNumber) => previousValue += rawScores[assignmentNumber - 1], 0),
        chairTransfers: [4,5,6].reduce((previousValue, assignmentNumber) => previousValue += rawScores[assignmentNumber - 1], 0),
        staticBalance: [7,8,9,10].reduce((previousValue, assignmentNumber) => previousValue += rawScores[assignmentNumber - 1], 0),
        walking: [11,12].reduce((previousValue, assignmentNumber) => previousValue += rawScores[assignmentNumber - 1], 0),
        dynamicBalance: [13,14,15].reduce((previousValue, assignmentNumber) => previousValue += rawScores[assignmentNumber - 1], 0),
    }
    const rawTotalScore = rawScores.reduce((previousValue, currentValue) => previousValue += currentValue, 0);
    const demmiScore = rawToDemmiScoreTranslation[rawTotalScore];

    let interpretation = `
<li>Een hogere score wijst op een grotere mate van onafhankelijke mobiliteit.</li>
    `.trim();

    const ageSpecificInterpretation = getInterpretationForAgeSpecificGenderValues(demmiScore);
    if(ageSpecificInterpretation) {
        interpretation += `
<li>${ageSpecificInterpretation}</li>
        `.trim();
    }

    interpretation += `<li>${getInterpretationForTotalGenderValues(demmiScore)}</li>`;

    document.getElementById("demmi-score-bed-transfers").innerHTML = `${partialScores.bedTransfers}&nbsp;/&nbsp;4`;
    document.getElementById("demmi-score-chair-transfers").innerHTML = `${partialScores.chairTransfers}&nbsp;/&nbsp;4`;
    document.getElementById("demmi-score-static-balance").innerHTML = `${partialScores.staticBalance}&nbsp;/&nbsp;4`;
    document.getElementById("demmi-score-walking").innerHTML = `${partialScores.walking}&nbsp;/&nbsp;4`;
    document.getElementById("demmi-score-dynamic-balance").innerHTML = `${partialScores.dynamicBalance}&nbsp;/&nbsp;3`;
    document.getElementById("demmi-raw-score").innerHTML = `${rawTotalScore}&nbsp;/&nbsp;19`;
    document.getElementById("demmi-final-score").innerHTML = `<span class="fs-3 fw-bold">${demmiScore}</span>&nbsp;/&nbsp;100`;
    document.getElementById("demmi-interpretation").innerHTML = interpretation;
    document.getElementById("results-wrapper").classList.remove("d-none");
}

function hideTotalScore() {
    document.getElementById("results-wrapper").classList.add("d-none");
}

const templateContent = await getTemplateContent("DEMMI.html");

export default new Test({
    id: "demmi",
    shortName: "DEMMI",
    longName: "de Morton Mobility Index",
    description: `
De DEMMI is een observatielijst waarmee problemen met mobiliteit, bewegen en dagelijkse activiteiten kunnen worden vastgesteld. Het meetinstrument geeft aan hoe <strong>zelfstandig</strong> een patiënt verschillende motorische activiteiten kan uitvoeren. Doelgroep: ouderen.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/de-morton-mobility-index/",
    onStateChange: (newState) => {
        applyShowAllAssignmentsCheckbox(newState);

        if(isEverythingFilledIn(newState)) {
            calculateAndDisplayTotalScore(newState);
        } else {
            hideTotalScore();
        }
    },
    onFormElementChange: (e) => {
        const state = observableState.getObject();

        scrollToNextQuestionOnFormElementChange(e, "demmi", state);
    },
});