import Test from "../../data-types/Test.js";
import { calculateHrResults } from "./calculations/BodyInfo-HR.js";
import { formatNumber, getTemplateContent, hideElementsById, isFilled, showElementsById } from "./utils.js";

function applyHrInterFieldEffects(newState) {
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

function applyInterFieldEffects(newState) {
    applyHrInterFieldEffects(newState);
}

function hideAllHrCalcWrappers() {
    hideElementsById([
        "hr-results-divider",
        "estimated-hr-max-wrapper",
        "hrr-wrapper",
        "hrtarget-hfmax-wrapper",
        "hrtarget-karvonen-wrapper",
    ]);
}

function updateHeartRateCalculations(newState) {
    const results = calculateHrResults(newState);

    if(!Object.keys(results).length) {
        hideAllHrCalcWrappers();

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
    longName: "Basisgegevens",
    description: `
Algemene informatie zoals lichaamssamenstelling, hartfrequentie etc.
    `.trim(),
    templateContent,
    onStateChange: (newState) => {
        applyInterFieldEffects(newState);
        updateHeartRateCalculations(newState);
    }
});