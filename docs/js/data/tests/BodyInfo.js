import Test from "../../data-types/Test.js";
import { calculateFatResults } from "./calculations/BodyInfo-Fat.js";
import { getBMICutoffsForPerson } from "./calculations/BodyInfo-Fat/BodyInfo-Fat-BMI.js";
import { getFatPercentageCutoffsForPerson } from "./calculations/BodyInfo-Fat/BodyInfo-Fat-Percentage.js";
import { getWHt05RCutoffsForPerson } from "./calculations/BodyInfo-Fat/BodyInfo-Fat-WHt05R.js";
import { getWHtRCutoffsForPerson } from "./calculations/BodyInfo-Fat/BodyInfo-Fat-WHtR.js";
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

function hideAllFatCalcWrappers() {
    hideElementsById([
        "fat-results-divider",
        "bmi-wrapper",
        "whtr-wrapper",
        "wht2r-wrapper",
        "wht05r-wrapper",
        "fat-percentage-wrapper",
    ]);
}

function getBMIInterpretation({bmi, age, sex}) {
    const cutoffs = getBMICutoffsForPerson({age, sex});

    for(const cutoff of cutoffs.reverse()) {
        if(bmi >= cutoff.minValue) {
            return cutoff.label;
        }
    }

    return "";
}

function getWHtRInterpretation({whtr, age, sex}) {
    const cutoffs = getWHtRCutoffsForPerson({age, sex});

    for(const cutoff of cutoffs.reverse()) {
        if(whtr >= cutoff.minValue) {
            return cutoff.label;
        }
    }

    return "";
}

function getWHt05RInterpretation({wht05r, age, sex}) {
    const cutoffs = getWHt05RCutoffsForPerson({age, sex});

    for(const cutoff of cutoffs.reverse()) {
        if(wht05r >= cutoff.minValue) {
            return cutoff.label;
        }
    }

    return "";
}

function getFatPercentageInterpretation({fatPercentage, age, sex}) {
    const cutoffs = getFatPercentageCutoffsForPerson({age, sex});

    for(const cutoff of cutoffs.reverse()) {
        if(fatPercentage >= cutoff.minValue) {
            return cutoff.label;
        }
    }

    return "";
}

function updateFatCalculations(newState) {
    const results = calculateFatResults(newState);

    if(!Object.keys(results).length) {
        hideAllFatCalcWrappers();

        return;
    }

    showElementsById([
        "fat-results-divider",
    ]);

    if(results.hasOwnProperty("bmi")) {
        let text = formatNumber(results.bmi, 0);
        if(isFilled(newState?.general?.age) && isFilled(newState?.general?.sex)) {
            text += " => " + getBMIInterpretation({bmi: results.bmi, age: parseInt(newState?.general?.age), sex: newState?.general?.sex});
        }
        document.getElementById("bmi").innerText = text;

        showElementsById([
            "bmi-wrapper",
        ]);
    } else {
        hideElementsById([
            "bmi-wrapper",
        ]);
    }

    if(results.hasOwnProperty("whtr")) {
        let text = formatNumber(results.whtr, 2);
        if(isFilled(newState?.general?.age) && isFilled(newState?.general?.sex)) {
            text += " => " + getWHtRInterpretation({whtr: results.whtr, age: parseInt(newState?.general?.age), sex: newState?.general?.sex});
        }
        document.getElementById("whtr").innerText = text;

        showElementsById([
            "whtr-wrapper",
        ]);
    } else {
        hideElementsById([
            "whtr-wrapper",
        ]);
    }

    if(results.hasOwnProperty("wht05r")) {
        let text = formatNumber(results.wht05r, 4);
        if(isFilled(newState?.general?.age) && isFilled(newState?.general?.sex)) {
            text += " => " + getWHt05RInterpretation({wht05r: results.wht05r, age: parseInt(newState?.general?.age), sex: newState?.general?.sex});
        }
        document.getElementById("wht05r").innerText = text;

        showElementsById([
            "wht05r-wrapper",
        ]);
    } else {
        hideElementsById([
            "wht05r-wrapper",
        ]);
    }

    if(results.hasOwnProperty("wht2r")) {
        let text = formatNumber(results.wht2r, 4);
        document.getElementById("wht2r").innerText = text;

        showElementsById([
            "wht2r-wrapper",
        ]);
    } else {
        hideElementsById([
            "wht2r-wrapper",
        ]);
    }

    if(results.hasOwnProperty("fat_percentage")) {
        let text = formatNumber(results.fat_percentage, 0) + "%";
        if(isFilled(newState?.general?.age) && isFilled(newState?.general?.sex)) {
            const interpretation = getFatPercentageInterpretation({fatPercentage: results.fat_percentage, age: parseInt(newState?.general?.age), sex: newState?.general?.sex});
            if(interpretation) {
                text += " => " + interpretation
            }
        }
        document.getElementById("fat-percentage").innerText = text;

        showElementsById([
            "fat-percentage-wrapper",
        ]);
    } else {
        hideElementsById([
            "fat-percentage-wrapper",
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
        updateFatCalculations(newState);
        updateHeartRateCalculations(newState);
    }
});