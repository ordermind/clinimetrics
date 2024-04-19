import Test from "../../data-types/Test.js";

export function calculateBMI(height_cm, weight_kg) {
    return weight_kg / (height_cm / 100) ** 2;
}

export default new Test({
    id: "body-fat",
    longName: "Lichaamsvet"
});