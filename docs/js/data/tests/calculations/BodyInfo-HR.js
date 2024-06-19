import { isFilled } from "../utils.js";

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

export function calculateHrResults(newState) {
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

/**
 * Returns predicted vo2max in the unit ml/min/kg.
 */
export function calculatePredictedVo2Max({age, sex, height_cm, weight_kg}) {
    function calculateInLperMinute() {
        if(sex === "M") {
            return (0.023 * parseInt(height_cm)) + (0.0117 * parseInt(weight_kg)) - (0.031 * parseInt(age)) - 0.332;
        }

        return (0.0158 * parseInt(height_cm)) + (0.00899 * parseInt(weight_kg)) - (0.027 * parseInt(age)) +  0.207;
    }

    return calculateInLperMinute() * 1000 / parseInt(weight_kg);
}