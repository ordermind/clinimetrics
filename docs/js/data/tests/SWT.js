import Test from "../../data-types/Test.js";
import { calculatePredictedVo2Max, calculateBMI } from "./BodyInfo.js";
import { calculateSWTMets, calculateSWTScore, calculateSWTVo2Max } from "./calculations/SWT.js";
import { formatNumber, getTemplateContent, isFilled, setContraIndication } from "./utils.js";

function alertContraIndications(newState) {
    if(isFilled(newState?.general?.in_rest?.oxygen_saturation)) {
        if(parseInt(newState.general.in_rest.oxygen_saturation) < 90) {
            setContraIndication(document.getElementById("general.in_rest.oxygen_saturation"), "absolute");
        } else {
            setContraIndication(document.getElementById("general.in_rest.oxygen_saturation"), "clean");
        }
    } else {
        setContraIndication(document.getElementById("general.in_rest.oxygen_saturation"));
    }

    if(isFilled(newState?.general?.in_rest?.blood_pressure_systolic)) {
        if(parseInt(newState.general.in_rest.blood_pressure_systolic) > 180) {
            setContraIndication(document.getElementById("general.in_rest.blood_pressure_systolic"), "relative");
        } else {
            setContraIndication(document.getElementById("general.in_rest.blood_pressure_systolic"), "clean");
        }
    } else {
        setContraIndication(document.getElementById("general.in_rest.blood_pressure_systolic"));
    }

    if(isFilled(newState?.general?.in_rest?.blood_pressure_diastolic)) {
        if(parseInt(newState.general.in_rest.blood_pressure_diastolic) > 100) {
            setContraIndication(document.getElementById("general.in_rest.blood_pressure_diastolic"), "relative");
        } else {
            setContraIndication(document.getElementById("general.in_rest.blood_pressure_diastolic"), "clean");
        }
    } else {
        setContraIndication(document.getElementById("general.in_rest.blood_pressure_diastolic"));
    }

    if(isFilled(newState?.swt?.oxygen_saturation)) {
        if(parseInt(newState.swt.oxygen_saturation) < 85) {
            setContraIndication(document.getElementById("swt.oxygen_saturation"), "absolute");
        } else {
            setContraIndication(document.getElementById("swt.oxygen_saturation"), "clean");
        }
    } else {
        setContraIndication(document.getElementById("swt.oxygen_saturation"));
    }
}

function calculateTimeInSeconds(rawTime) {
    const [minutes, seconds] = rawTime.split(":").map(item => parseInt(item));

    return minutes * 60 + seconds;
}

/**
 * Returns predicted vo2max in the unit ml/min/kg.
 */
function calculatePredictedDistanceIwstSingh(newState) {
    if(newState.general.sex === "M") {
        return 1449.701 - (11.735 * newState.general.age) + 241.897 - (5.686 * calculateBMI(newState.general));
    }

    return 1449.701 - (11.735 * newState.general.age) - (5.686 * calculateBMI(newState.general));
}

function displayResults(newState) {
    if(
        isFilled(newState?.general?.sex)
        && isFilled(newState?.general?.age)
        && isFilled(newState?.general?.height_cm)
        && isFilled(newState?.general?.weight_kg)
        && isFilled(newState?.swt?.protocol)
        && isFilled(newState?.swt?.time)
        && isFilled(newState?.swt?.distance)
    ) {
        const averageSpeed = parseInt(newState.swt.distance) / calculateTimeInSeconds(newState.swt.time) * 3.6; // km/h
        const scoreLabel = newState.swt.protocol === "iwst_singh" ? "Level" : "Score";
        const score = calculateSWTScore(newState.swt.time, newState.swt.protocol);
        const vo2maxPred = calculatePredictedVo2Max(newState.general); // ml/min/kg
        const vo2max = calculateSWTVo2Max(newState.swt); // ml/min/kg
        const mets = calculateSWTMets(newState.swt);

        document.getElementById("swt-average-speed").innerText = formatNumber(averageSpeed, 1);
        document.getElementById("swt-score-label").innerText = scoreLabel;
        document.getElementById("swt-score").innerText = formatNumber(score, 0);
        document.getElementById("swt-vo2max-pred").innerText = formatNumber(vo2maxPred, 0);
        document.getElementById("swt-vo2max").innerText = formatNumber(vo2max, 0);
        document.getElementById("swt-vo2max-percentage-pred").innerText = formatNumber(vo2max / vo2maxPred * 100, 0);
        document.getElementById("swt-met").innerText = formatNumber(mets, 1);

        if(newState.swt.protocol === "iwst_singh") {
            const predictedDistance = calculatePredictedDistanceIwstSingh(newState);

            document.getElementById("swt-predicted-distance-iwst-singh").innerText = formatNumber(predictedDistance, 0);
            document.getElementById("swt-distance-percentage-iwst-singh").innerText = formatNumber(parseInt(newState.swt.distance) / predictedDistance * 100, 0);

            document.getElementById("swt-predicted-distance-iwst-singh-wrapper").classList.remove("d-none");
            document.getElementById("swt-distance-percentage-iwst-singh-wrapper").classList.remove("d-none");


        } else {
            document.getElementById("swt-predicted-distance-iwst-singh-wrapper").classList.add("d-none");
            document.getElementById("swt-distance-percentage-iwst-singh-wrapper").classList.add("d-none");

            document.getElementById("swt-predicted-distance-iwst-singh").innerText = "";
            document.getElementById("swt-distance-percentage-iwst-singh").innerText = "";
        }

        document.getElementById("results-wrapper").classList.remove("d-none");
    } else {
        document.getElementById("results-wrapper").classList.add("d-none");
        document.getElementById("swt-predicted-distance-iwst-singh-wrapper").classList.add("d-none");
        document.getElementById("swt-distance-percentage-iwst-singh-wrapper").classList.add("d-none");

        document.getElementById("swt-predicted-distance-iwst-singh").innerText = "";
        document.getElementById("swt-distance-percentage-iwst-singh").innerText = "";
        document.getElementById("swt-average-speed").innerText = "";
        document.getElementById("swt-score-label").innerText = "";
        document.getElementById("swt-score").innerText = "";
        document.getElementById("swt-vo2max-pred").innerText = "";
        document.getElementById("swt-vo2max").innerText = "";
        document.getElementById("swt-vo2max-percentage-pred").innerText = "";
        document.getElementById("swt-met").innerText = "";
    }
}

const templateContent = await getTemplateContent("SWT.html");

export default new Test({
    id: "swt",
    shortName: "SWT",
    longName: "Shuttle Walk Test",
    description: `
De Shuttle Walk Test is een maximale inspanningstest die gebruikt kan worden om de <strong>functionele capaciteit</strong> of inspanningstolerantie van personen te bepalen. De test kan worden gebruikt om een indruk te krijgen van VO<sub>2MAX</sub>. Doelgroep: patiënten met cardiale problematiek of COPD.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/shuttle-walk-test/",
    onStateChange: (newState) => {
        alertContraIndications(newState);
        displayResults(newState);
    }
});