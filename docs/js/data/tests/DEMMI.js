import Test from "../../data-types/Test.js";
import { getTemplateContent } from "./utils.js";

function applyShowAllAssignmentsCheckbox(newState) {
    const assignmentsWrapper = document.getElementById("assignments-wrapper");
    if(newState?.demmi?.show_all_assignments) {
        assignmentsWrapper.classList.add("show-all");
    } else {
        assignmentsWrapper.classList.remove("show-all");
    }
}

const templateContent = await getTemplateContent("DEMMI.html");

export default new Test({
    id: "demmi",
    shortName: "DEMMI",
    longName: "de Morton Mobility Index",
    description: `
De DEMMI is een observatielijst waarmee problemen met mobiliteit, bewegen en dagelijkse activiteiten kunnen worden vastgesteld. Het meetinstrument geeft aan hoe <strong>zelfstandig</strong> een patiënt verschillende motorische activiteiten kan uitvoeren. Doelgroep: ouderen.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/de-morton-mobility-index/",
    onStateChange: (newState) => {
        applyShowAllAssignmentsCheckbox(newState);
        // applyInterFieldEffects(newState);

        // if(isEverythingFilledIn(newState)) {
        //     calculateAndDisplayTotalScore(newState);
        // } else {
        //     hideTotalScore();
        // }
    }
});