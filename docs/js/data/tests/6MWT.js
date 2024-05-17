import Test from "../../data-types/Test.js";
import { renderNotesTooltip } from "../../utils.js";
import { calculateBMI } from "./BodyInfo.js";
import { formatNumber, getTemplateContent, isFilled, setContraIndication } from "./utils.js";

function calculatePredictedDistance({sex, age, height_cm, weight_kg, parcour, distance}) {
    const values = {
        age: parseInt(age),
        height_cm: parseInt(height_cm),
        weight_kg: parseInt(weight_kg),
        parcour: parseInt(parcour),
        distance: parseInt(distance),
    };

    const BMI = calculateBMI(values.height_cm, values.weight_kg);

    if(values.parcour === 10 && sex === "M") {
        return 1266 - (7.80 * values.age) - (5.92 * BMI);
    }

    if(values.parcour === 10 && sex === "F") {
        return 1064 - (5.28 * values.age) - (6.55 * BMI);
    }

    if(values.parcour === 30 && sex === "M") {
        return 1140 - (6.94 * values.age) - (5.61 * BMI);
    }

    if(values.parcour === 30 && sex === "F") {
        return 1017 - (5.83 * values.age) - (6.24 * BMI);
    }

    if(values.parcour === 50 && sex === "M") {
        return 218 + (5.14 * values.height_cm - 5.32 * values.age) - (1.80 * values.weight_kg) + 51.31;
    }

    if(values.parcour === 50 && sex === "F") {
        return 218 + (5.14 * values.height_cm - 5.32 * values.age) - (1.80 * values.weight_kg);
    }
}

const functionalCapacityDescription = "<strong>Functionele capaciteit</strong> is het vermogen van een persoon om dagelijkse activiteiten uit te voeren zonder belemmering of ongemak als gevolg van fysieke beperkingen of aandoeningen. Het omvat de verschillende aspecten van het functioneren van het lichaam, zoals kracht, flexibiliteit, balans, uithoudingsvermogen en coördinatie.";

const templateContent = await getTemplateContent("6MWT.html");

export default new Test({
    id: "six_mwt",
    shortName: "6MWT",
    longName: "6 minuten wandeltest",
    description: `
De 6 minuten wandeltest wordt gebruikt om de <strong>functionele capaciteit</strong>${renderNotesTooltip([functionalCapacityDescription])} te meten. Doelgroep: volwassen en kinderen in het algemeen maar specifiek onderzocht bij respiratoire aandoeningen, cardiovasculaire aandoeningen, geriatrische patiënten, neurologische aandoeningen, totale heup en knie prothese (THP / TKP) en fibromyalgie.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/6-minute-walk-test-zes-minuten-wandeltest/",
    onStateChange: (newState) => {
        // Alert contra indications
        if(isFilled(newState?.general?.in_rest?.heart_rate)) {
            if(parseInt(newState.general.in_rest.heart_rate) > 120) {
                setContraIndication(document.getElementById("general.in_rest.heart_rate"), "relative");
            } else {
                setContraIndication(document.getElementById("general.in_rest.heart_rate"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("general.in_rest.heart_rate"));
        }

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

        if(isFilled(newState?.six_mwt?.oxygen_saturation)) {
            if(parseInt(newState.six_mwt.oxygen_saturation) < 85) {
                setContraIndication(document.getElementById("six_mwt.oxygen_saturation"), "absolute");
            } else {
                setContraIndication(document.getElementById("six_mwt.oxygen_saturation"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("six_mwt.oxygen_saturation"));
        }

        // Display results
        if(
            isFilled(newState?.general?.sex)
            && isFilled(newState?.general?.age)
            && isFilled(newState?.general?.height_cm)
            && isFilled(newState?.general?.weight_kg)
            && isFilled(newState?.six_mwt?.parcour)
            && isFilled(newState?.six_mwt?.distance)
        ) {
            const distance = parseInt(newState.six_mwt.distance);

            const averageSpeedMS = distance / 360;
            const averageSpeedKMH = averageSpeedMS * 3.6;
            document.getElementById("six_mwt-average-speed-ms").innerText = formatNumber(averageSpeedMS);
            document.getElementById("six_mwt-average-speed-kmh").innerText = formatNumber(averageSpeedKMH);

            const predictedDistance = calculatePredictedDistance({
                sex: newState.general.sex,
                age: newState.general.age,
                height_cm: newState.general.height_cm,
                weight_kg: newState.general.weight_kg,
                parcour: newState.six_mwt.parcour,
                distance: newState.six_mwt.distance,
            });
            document.getElementById("six_mwt-predicted").innerText = formatNumber(predictedDistance, 0);

            const performancePercentage = distance / predictedDistance * 100;
            document.getElementById("six_mwt-result").innerText = formatNumber(performancePercentage, 0);

            if(performancePercentage < 80) {
                document.getElementById("six_mwt-result-interpretation").innerText = "< 80% => onvoldoende";
            } else {
                document.getElementById("six_mwt-result-interpretation").innerText = "≥ 80% => voldoende";
            }

            if(performancePercentage < 70) {
                document.getElementById("six_mwt-result-copd").innerText = "< 70% => onvoldoende";
            } else {
                document.getElementById("six_mwt-result-copd").innerText = "≥ 70% => voldoende";
            }

            document.getElementById("six_mwt-results-wrapper").classList.remove("d-none");
        } else {
            document.getElementById("six_mwt-results-wrapper").classList.add("d-none");

            document.getElementById("six_mwt-average-speed-ms").innerText = "";
            document.getElementById("six_mwt-average-speed-kmh").innerText = "";
            document.getElementById("six_mwt-predicted").innerText = "";
            document.getElementById("six_mwt-result").innerText = "";
            document.getElementById("six_mwt-result-copd").innerText = "";
        }
    }
});