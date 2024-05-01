import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { cloneObject } from "../../utils.js";

const description = `
De Trunk Control Test evalueert de <strong>rompstabiliteit</strong> van <strong>CVA-patiënten</strong> en geeft op basis daarvan een inschatting van de  <strong>zelfstandigheid</strong> van de patiënt.
`.trim();

function isEverythingFilledIn() {
    const state = observableState.getObject();

    for(let i = 1; i <= 4; i++) {
        if(
            !state?.tct.hasOwnProperty(`assignment_${i}`)
            || !state?.tct[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function createPartialScores() {
    const state = observableState.getObject();

    return `${state?.tct?.assignment_1}-${state?.tct?.assignment_2}-${state?.tct?.assignment_3}-${state?.tct?.assignment_4}`;
}

function updateIndividualScoresFromPartialScores(partialScores) {
    const state = observableState.getObject();
    const newState = cloneObject(state);
    const splitScores = partialScores.split('-');

    for(let i = 1; i <= 4; i++) {
        newState.tct[`assignment_${i}`] = (splitScores.hasOwnProperty(i - 1) && splitScores[i-1].length) ? parseInt(splitScores[i-1]).toString() : "0";
    }

    state.tct = newState.tct;
}

function disableFields() {
    document.querySelectorAll(".test-item").forEach(element => element.classList.add("disabled"));
    for(let i = 1; i <= 4; i++) {
        document.testForm[`tct.assignment_${i}`].forEach(element => element.disabled = true);
    }
}

function enableFields() {
    document.querySelectorAll(".test-item").forEach(element => element.classList.remove("disabled"));
    for(let i = 1; i <= 4; i++) {
        document.testForm[`tct.assignment_${i}`].forEach(element => element.disabled = false);
    }
}

function calculateTotalScore() {
    const state = observableState.getObject();

    return [1,2,3,4].map(
        assignmentNumber => parseInt(state?.tct[`assignment_${assignmentNumber}`] ?? 0)
    ).reduce((previousValue, currentValue) => previousValue += currentValue);
}

export default new Test({
    id: "tct",
    shortName: "TCT",
    longName: "Trunk Control Test",
    description,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/trunk-control-test/",
    getformContentHTML: () => {
        return `
<div class="mb-3">${description}</div>

<div class="row row-cols-1 row-cols-lg-2 justify-content-between">
    <div class="col maxwidth-800">
        <div class="description">
            <h2 class="display-2 fs-4">Benodigdheden</h2>
            <ul>
                <li>een stopwatch</li>
                <li>een oefenbank of bed</li>
            </ul>
        </div>

        <div class="personal-info">
            <h2 class="display-2 fs-4">Persoonlijke gegevens</h2>
            <table class="table table-borderless maxwidth-480">
                <tr>
                    <td><label for="general.name" class="form-label">Naam:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="text" name="general.name" id="general.name" class="form-control" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="mb-3 maxwidth-480 | pre-measurements">
            <h2 class="display-2 fs-4">Vooraf bekende deelscores</h2>
            <input type="text" name="tct.pre.partial_scores" id="tct.pre.partial_scores" placeholder="XX-XX-XX-XX" class="form-control" />
        </div>

        <div class="description">
            <h2 class="display-2 fs-4">Instructies</h2>

            <p>De test wordt afgenomen met de patiënt in <strong>rugligging</strong>. De ondergrond dient vlak te zijn in horizontale positie; een hoofdkussen is toegestaan. Indien er hekken aanwezig zijn, dienen deze omlaag geplaatst te zijn.</p>

            </p>Verbale instructie moet beperkt blijven tot de opdracht.</p>

            <p><strong>Afzetten</strong> met de arm(en) is <strong>toegestaan</strong>. Het <strong>trekken</strong> met de arm(en) wordt daarentegen wel als een <strong>compensatie</strong> beschouwd. Het is niet toegestaan de patiënt een hand te geven ter ondersteuning.</p>

            <p>De opdrachten worden normaal gesproken uitgevoerd in de volgorde <strong>2-1-4-3</strong> omdat het makkelijker is voor de patiënt om vanaf de paretische zij overeind te komen.</p>
        </div>
    </div>

    <div class="col">
        <h2 class="display-2 fs-4">Opdrachten</h2>

        <table class="table table-borderless">
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">2. Van rugligging naar niet-paretische zij</h3>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u op de [niet-paretische] zij draaien?</em></div>
                    <div class="mb-1">De patiënt dient zowel met de schouders als het bekken volledig op de zij gedraaid te zijn.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_1" id="tct.assignment_1-0" value="0" /><label class="form-check-label" for="tct.assignment_1-0">0 - De patiënt kan de beweging niet uitvoeren</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_1" id="tct.assignment_1-12" value="12" /><label class="form-check-label" for="tct.assignment_1-12">12 - De patiënt kan de beweging uitvoeren, maar moet compensaties gebruiken</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_1" id="tct.assignment_1-25" value="25" /><label class="form-check-label" for="tct.assignment_1-25">25 - De patiënt kan de bewegingen normaal uitvoeren</label></div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">1. Van rugligging naar paretische zij</h3>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u op de [paretische] zij draaien?</em></div>
                    <div class="mb-1">De patiënt dient zowel met de schouders als het bekken volledig op de zij gedraaid te zijn.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_2" id="tct.assignment_2-0" value="0" /><label class="form-check-label" for="tct.assignment_2-0">0 - De patiënt kan de beweging niet uitvoeren</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_2" id="tct.assignment_2-12" value="12" /><label class="form-check-label" for="tct.assignment_2-12">12 - De patiënt kan de beweging uitvoeren, maar moet compensaties gebruiken</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_2" id="tct.assignment_2-25" value="25" /><label class="form-check-label" for="tct.assignment_2-25">25 - De patiënt kan de bewegingen normaal uitvoeren</label></div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">4. Van rugligging naar zitten</h3>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u zonder dat u zich ergens aan vasthoudt, op de rand van het bed (of de oefenbank) komen zitten?</em></div>
                    <div class="mb-1">Hoe en over welke zij de patiënt tot zit komt, wordt vrijgelaten.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_3" id="tct.assignment_3-0" value="0" /><label class="form-check-label" for="tct.assignment_3-0">0 - De patiënt kan de beweging niet uitvoeren</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_3" id="tct.assignment_3-12" value="12" /><label class="form-check-label" for="tct.assignment_3-12">12 - De patiënt kan de beweging uitvoeren, maar moet compensaties gebruiken</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_3" id="tct.assignment_3-25" value="25" /><label class="form-check-label" for="tct.assignment_3-25">25 - De patiënt kan de bewegingen normaal uitvoeren</label></div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">3. Zitbalans</h3>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u zonder op de handen te steunen, gedurende 30 seconden op de bedrand blijven zitten?</em></div>
                    <div class="mb-1">Voor een maximale score is het toegestaan dat de handen op de benen van de patiënt liggen. <strong>De voeten van de patiënt staan op de grond</strong> en er wordt geen steun gegeven middels een (rug)leuning.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_4" id="tct.assignment_4-0" value="0" /><label class="form-check-label" for="tct.assignment_4-0">0 - De patiënt kan de beweging niet uitvoeren</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_4" id="tct.assignment_4-12" value="12" /><label class="form-check-label" for="tct.assignment_4-12">12 - De patiënt kan de beweging uitvoeren, maar moet compensaties gebruiken</label></div>
                    <div class="form-check"><input class="form-check-input" type="radio" name="tct.assignment_4" id="tct.assignment_4-25" value="25" /><label class="form-check-label" for="tct.assignment_4-25">25 - De patiënt kan de bewegingen normaal uitvoeren</label></div>
                </td>
            </tr>
        </table>

        <div id="tct-results-wrapper" class="d-none">
            <h2 class="display-2 fs-4">Uitslag</h2>
            <table class="table table-borderless">
                <tr>
                    <td>Deelscores:</td>
                    <td><span id="tct-partial-scores"></span></td>
                </tr>
                <tr>
                    <td>Totale score:</td>
                    <td><span id="tct-total-score" class="d-flex align-items-center"></span></td>
                </tr>
                <tr>
                    <td>Interpretatie:</td>
                    <td>Een hogere score komt overeen met meer zelfstandigheid.</td>
                </tr>
            </table>
        </div>
    </div>
</div>
        `.trim();
    },
    onStateChange: (newState) => {
        if(newState?.tct?.pre?.partial_scores?.length) {
            const knownPartialScores = newState.tct.pre.partial_scores;

            disableFields();
            updateIndividualScoresFromPartialScores(knownPartialScores);
        } else {
            enableFields();
        }

        if(isEverythingFilledIn()) {
            document.getElementById("tct-results-wrapper").classList.remove("d-none");

            const partialScores = createPartialScores();
            document.getElementById("tct-partial-scores").innerText = partialScores;

            const totalScore = calculateTotalScore();
            document.getElementById("tct-total-score").innerHTML = `<span class="fs-3 fw-bold">${totalScore}</span>&nbsp;/&nbsp;100`;
        } else {
            document.getElementById("tct-results-wrapper").classList.add("d-none");
        }
    }
});