import { isFilled } from "../utils.js";

function calculateWhtr({waist_size_cm, height_cm}) {
    return waist_size_cm / height_cm;
}

function calculateWht05r({waist_size_cm, height_cm}) {
    return waist_size_cm / height_cm ** 0.5;
}

function calculateWht2r({waist_size_cm, height_cm}) {
    return waist_size_cm / height_cm ** 2;
}

export function calculateBMI({height_cm, weight_kg}) {
    return parseInt(weight_kg) / (parseInt(height_cm) / 100) ** 2;
}

export function calculateFatResults(newState) {
    const rawHeight = newState?.general?.height_cm;
    const height_cm = isFilled(rawHeight) ? parseInt(rawHeight) : null;

    const rawWeight = newState?.general?.weight_kg;
    const weight_kg = isFilled(rawWeight) ? parseInt(rawWeight) : null;

    const rawWaistSize = newState?.general?.waist_size_cm;
    const waist_size_cm = isFilled(rawWaistSize) ? parseInt(rawWaistSize) : null;

    const results = {};

    if(height_cm && weight_kg) {
        results.bmi = calculateBMI({height_cm, weight_kg});
    }

    if(height_cm && waist_size_cm) {
        results.whtr = calculateWhtr({waist_size_cm, height_cm});
        results.wht05r = calculateWht05r({waist_size_cm, height_cm});
        results.wht2r = calculateWht2r({waist_size_cm, height_cm});
    }

    return results;
}