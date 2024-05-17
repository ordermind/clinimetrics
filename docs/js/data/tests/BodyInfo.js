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

function calculateResults(newState) {
    const rawKnownHrMax = newState?.body_info?.hr_max;
    const knownHrMax = isFilled(rawKnownHrMax) ? parseInt(rawKnownHrMax) : null;

    const hrMaxFormula = newState?.body_info?.hrmax_formula ?? null;
    if(!knownHrMax && !hrMaxFormula) {
        return {};
    }

    const rawAgeValue = newState?.general?.age;
    const age = isFilled(rawAgeValue) ? parseInt(rawAgeValue) : null;

    if(!knownHrMax && !age) {
        return {};
    }

    const hrMax = knownHrMax ?? estimateHrMax(age, hrMaxFormula);

    const rawHeartRateRestValue = newState?.general?.in_rest?.heart_rate;
    const heartRateRest = isFilled(rawHeartRateRestValue) ? parseInt(rawHeartRateRestValue) : null;

    const rawTrainingIntensityValue = newState?.general?.training?.intensity;
    const trainingIntensityFraction = isFilled(rawTrainingIntensityValue) ? parseInt(rawTrainingIntensityValue) / 100 : null;

    const results = {};

    if(!knownHrMax) {
        results.estimatedHrMax = hrMax;
    }

    if(heartRateRest) {
        results.hrr = calculateHeartRateReserve(heartRateRest, hrMax);
    }

    if(trainingIntensityFraction) {
        results.hrMaxHrTarget = calculateHrMaxHrTarget(hrMax, trainingIntensityFraction);
    }

    if(heartRateRest && trainingIntensityFraction) {
        results.karvonenHrTarget = calculateKarvonenHrTarget(heartRateRest, hrMax, trainingIntensityFraction);
    }

    return results;
}

function applyInterFieldEffects(newState) {
    if(isFilled(newState?.body_info?.hr_max)) {
        hideElementsById([
            "hrmax-formula-input-wrapper",
        ]);
    } else {
        showElementsById([
            "hrmax-formula-input-wrapper",
        ]);
    }
}

function hideAllCalcWrappers() {
    hideElementsById([
        "hr-results-divider",
        "estimated-hr-max-wrapper",
        "hrr-wrapper",
        "hrtarget-hfmax-wrapper",
        "hrtarget-karvonen-wrapper",
    ]);
}

function updateHeartRateCalculations(newState) {
    const results = calculateResults(newState);

    if(!Object.keys(results).length) {
        hideAllCalcWrappers();

        return;
    }

    showElementsById([
        "hr-results-divider",
    ]);

    if(results.hasOwnProperty("estimatedHrMax")) {
        document.getElementById("estimated-hr-max").innerText = formatNumber(results.estimatedHrMax, 0);
        showElementsById([
            "estimated-hr-max-wrapper",
        ]);
    } else {
        hideElementsById([
            "estimated-hr-max-wrapper",
        ]);
    }

    if(results.hasOwnProperty("hrr")) {
        document.getElementById("hrr").innerText = formatNumber(results.hrr, 0);

        showElementsById([
            "hrr-wrapper",
        ]);
    } else {
        hideElementsById([
            "hrr-wrapper",
        ]);
    }

    if(results.hasOwnProperty("hrMaxHrTarget")) {
        document.getElementById("hrtarget-hfmax").innerText = formatNumber(results.hrMaxHrTarget, 0);

        showElementsById([
            "hrtarget-hfmax-wrapper",
        ]);
    } else {
        hideElementsById([
            "hrtarget-hfmax-wrapper",
        ]);
    }

    if(results.hasOwnProperty("karvonenHrTarget")) {
        document.getElementById("hrtarget-karvonen").innerText = formatNumber(results.karvonenHrTarget, 0);

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
        applyInterFieldEffects(newState);
        updateHeartRateCalculations(newState);
    }
});