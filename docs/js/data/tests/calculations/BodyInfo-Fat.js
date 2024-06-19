export function calculateBMI({height_cm, weight_kg}) {
    return parseInt(weight_kg) / (parseInt(height_cm) / 100) ** 2;
}