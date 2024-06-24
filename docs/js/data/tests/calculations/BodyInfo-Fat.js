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

/**
 * Source: Jackson-Pollock
 */
function calculateFatPercentageFromSkinfoldMeasurements({age, sex, skinfoldMeasurements}) {
    const intAge = parseInt(age);
    const {biceps, triceps, subscapular, suprailiac} = skinfoldMeasurements;

    const sum = parseInt(biceps) + parseInt(triceps) + parseInt(subscapular) + parseInt(suprailiac);

    if(sex === "M") {
        return (0.29288 * sum) - (0.0005 * sum * sum) + (0.15845 * intAge) - 5.76377;
    } else if(sex === "F") {
        return (0.29669 * sum) - (0.00043 * sum * sum) + (0.02963 * intAge) + 1.4072;
    }

    throw new Error(`Sex "${sex}" not supported`);
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

    const rawSkinfold = newState?.body_info?.skinfold;

    const results = {};

    if(height_cm && weight_kg) {
        results.bmi = calculateBMI({height_cm, weight_kg});
    }

    if(height_cm && waist_size_cm) {
        results.whtr = calculateWhtr({waist_size_cm, height_cm});
        results.wht05r = calculateWht05r({waist_size_cm, height_cm});
        results.wht2r = calculateWht2r({waist_size_cm, height_cm});
    }

    if(
        isFilled(rawSkinfold?.biceps)
        && isFilled(rawSkinfold?.triceps)
        && isFilled(rawSkinfold?.subscapular)
        && isFilled(rawSkinfold?.suprailiac)
        && isFilled(newState?.general?.age)
        && isFilled(newState?.general?.sex)
    ) {
        results.fat_percentage = calculateFatPercentageFromSkinfoldMeasurements({age: newState.general.age, sex: newState.general.sex, skinfoldMeasurements: rawSkinfold});
    }

    return results;
}