import { isFilled } from "../utils.js";

export function calculateBMI({height_cm, weight_kg}) {
    return parseInt(weight_kg) / (parseInt(height_cm) / 100) ** 2;
}

export function calculateFatResults(newState) {
    const rawHeight = newState?.general?.height_cm;
    const height_cm = isFilled(rawHeight) ? parseInt(rawHeight) : null;

    const rawWeight = newState?.general?.weight_kg;
    const weight_kg = isFilled(rawWeight) ? parseInt(rawWeight) : null;

    const results = {};

    if(height_cm && weight_kg) {
        results.bmi = calculateBMI({height_cm, weight_kg});
    }

    return results;
}