import Test from "../../data-types/Test.js";
import { calculatePredictedVo2Max } from "./BodyInfo.js";
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

    if(isFilled(newState?.srt?.oxygen_saturation)) {
        if(parseInt(newState.srt.oxygen_saturation) < 85) {
            setContraIndication(document.getElementById("srt.oxygen_saturation"), "absolute");
        } else {
            setContraIndication(document.getElementById("srt.oxygen_saturation"), "clean");
        }
    } else {
        setContraIndication(document.getElementById("srt.oxygen_saturation"));
    }
}

function calculatewMaxMet(wMax) {
    if(wMax < 1.5) {
        return "1";
    }

    if(wMax < 20) {
        return "1,5";
    }

    if(wMax < 40) {
        return "2";
    }

    if(wMax < 60) {
        return "3";
    }

    if(wMax < 80) {
        return "4";
    }

    if(wMax < 110) {
        return "5";
    }

    if(wMax < 140) {
        return "6";
    }

    if(wMax < 160) {
        return "7";
    }

    if(wMax < 190) {
        return "8";
    }

    if(wMax < 220) {
        return "9";
    }

    if(wMax < 240) {
        return "10";
    }

    if(wMax < 260) {
        return "11";
    }

    if(wMax < 290) {
        return "12";
    }

    if(wMax < 300) {
        return "13";
    }

    if(wMax < 350) {
        return "14 - 15";
    }

    return "16+";
}

function displayResults(newState) {
    if(
        isFilled(newState?.general?.sex)
        && isFilled(newState?.general?.age)
        && isFilled(newState?.general?.height_cm)
        && isFilled(newState?.general?.weight_kg)
        && isFilled(newState?.srt?.msec)
    ) {
        const wMax = 0.65 * parseInt(newState.srt.msec) - 3.88;
        const vo2maxPred = calculatePredictedVo2Max(newState.general); // ml/min/kg
        const vo2max = (0.0067 * wMax + 0.358) * 1000 / newState.general.weight_kg; // ml/min/kg
        const metwMax = calculatewMaxMet(wMax);
        const metVo2Max = vo2max / 3.5;

        document.getElementById("srt-wmax").innerText = formatNumber(wMax, 0);
        document.getElementById("srt-vo2max-pred").innerText = formatNumber(vo2maxPred, 0);
        document.getElementById("srt-vo2max").innerText = formatNumber(vo2max, 0);
        document.getElementById("srt-vo2max-percentage-pred").innerText = formatNumber(vo2max / vo2maxPred * 100, 0);
        document.getElementById("srt-metwmax").innerText = metwMax;
        document.getElementById("srt-metvo2max").innerText = formatNumber(metVo2Max, 1);

        document.getElementById("results-wrapper").classList.remove("d-none");
    } else {
        document.getElementById("results-wrapper").classList.add("d-none");

        document.getElementById("srt-wmax").innerText = "";
        document.getElementById("srt-vo2max-pred").innerText = "";
        document.getElementById("srt-vo2max").innerText = "";
        document.getElementById("srt-vo2max-percentage-pred").innerText = "";
        document.getElementById("srt-metwmax").innerText = "";
        document.getElementById("srt-metvo2max").innerText = "";
    }
}

const templateContent = await getTemplateContent("SRT.html");

export default new Test({
    id: "srt",
    shortName: "SRT",
    longName: "Steep Ramp Test",
    description: `
De Steep Ramp Test (SRT) is een korte <strong>maximale inspanningstest</strong> op een geijkte fietsergometer om de <strong>aerobe capaciteit</strong> te meten. Vanuit het testresultaat kan een schatting worden verkregen van de VO<sub>2MAX</sub> en het maximaal inspanningsvermogen (W<sub>MAX</sub>). Doelgroep: gezonde kinderen en adolescenten (8 tot 18 jaar oud), kankerpatiënten, chronische long- en hartpatiënten, diabetes mellitus patiënten (DM II).
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/steep-ramp-test/",
    onStateChange: (newState) => {
        alertContraIndications(newState);
        displayResults(newState);
    }
});