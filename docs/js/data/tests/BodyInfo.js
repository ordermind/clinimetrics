import Test from "../../data-types/Test.js";
import { formatNumber, getTemplateContent, hideElementsById, isFilled, showElementsById } from "./utils.js";

export function calculateBMI(height_cm, weight_kg) {
    return weight_kg / (height_cm / 100) ** 2;
}

function estimateHrMaxFox(age) {
    return 220 - age;
}

function estimateHrMaxTanaka(age) {
    return 208 - (0.7 * age);
}

function estimateHrMaxGellish(age) {
    return 207 - (0.7 * age);
}

function estimateHrMax(age, formula) {
    if(formula === "fox") {
        return estimateHrMaxFox(age);
    }

    if(formula === "tanaka") {
        return estimateHrMaxTanaka(age);
    }

    if(formula === "gellish") {
        return estimateHrMaxGellish(age);
    }
}

function calculateHeartRateReserve(hrRest, hrMax) {
    return hrMax - hrRest;
}

function calculateHrMaxHrTarget(hrMax, intensityFraction) {
    return hrMax * intensityFraction;
}

function calculateKarvonenHrTarget(hrRest, hrMax, intensityFraction) {
    return hrRest + (hrMax - hrRest) * intensityFraction;
}

function hideAllCalcWrappers() {
    hideElementsById([
        "hr-results-divider",
        "hr-max-wrapper",
        "hrr-wrapper",
        "hrtarget-hfmax-wrapper",
        "hrtarget-karvonen-wrapper",
    ]);
}

function updateHeartRateCalculations(newState) {
    const hrMaxFormula = newState?.body_info?.hrmax_formula ?? null;
    if(!hrMaxFormula) {
        hideAllCalcWrappers();

        return;
    }

    const rawAgeValue = newState?.general?.age;
    const age = isFilled(rawAgeValue) ? parseInt(rawAgeValue) : null;
    if(!age) {
        hideAllCalcWrappers();

        return;
    }

    const rawHeartRateRestValue = newState?.general?.in_rest?.heart_rate;
    const heartRateRest = isFilled(rawHeartRateRestValue) ? parseInt(rawHeartRateRestValue) : null;

    const rawTrainingIntensityValue = newState?.general?.training?.intensity;
    const trainingIntensityFraction = isFilled(rawTrainingIntensityValue) ? parseInt(rawTrainingIntensityValue) / 100 : null;

    const hrMax = estimateHrMax(age, hrMaxFormula);

    document.getElementById("hr-max").innerText = formatNumber(hrMax);
    showElementsById([
        "hr-results-divider",
        "hr-max-wrapper",
    ]);

    if(heartRateRest) {
        const heartRateReserve = calculateHeartRateReserve(heartRateRest, hrMax);

        document.getElementById("hrr").innerText = formatNumber(heartRateReserve);

        showElementsById([
            "hrr-wrapper",
        ]);
    } else {
        hideElementsById([
            "hrr-wrapper",
        ]);
    }

    if(trainingIntensityFraction) {
        const hrMaxHrTarget = calculateHrMaxHrTarget(hrMax, trainingIntensityFraction);

        document.getElementById("hrtarget-hfmax").innerText = formatNumber(hrMaxHrTarget);

        showElementsById([
            "hrtarget-hfmax-wrapper",
        ]);
    } else {
        hideElementsById([
            "hrtarget-hfmax-wrapper",
        ]);
    }

    if(heartRateRest && trainingIntensityFraction) {
        const karvonenHrTarget = calculateKarvonenHrTarget(heartRateRest, hrMax, trainingIntensityFraction);

        document.getElementById("hrtarget-karvonen").innerText = formatNumber(karvonenHrTarget);

        showElementsById([
            "hrtarget-karvonen-wrapper",
        ]);
    } else {
        hideElementsById([
            "hrtarget-karvonen-wrapper",
        ]);
    }
}

const templateContent = await getTemplateContent("BodyInfo.html");

export default new Test({
    id: "body_info",
    longName: "Lichaamsgegevens",
    description: `
Algemene informatie over het lichaam zoals lichaamssamenstelling, hartfrequentie etc.
    `.trim(),
    templateContent,
    onStateChange: (newState) => {
        updateHeartRateCalculations(newState);
    }
});