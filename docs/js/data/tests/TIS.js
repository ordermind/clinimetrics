import Test from "../../data-types/Test.js";
import observableState from "../../state.js";

const description = `De Trunk Impairment Scale test evalueert het <strong>statisch en dynamisch evenwicht van het zitten</strong>. Doelgroep: patiënten met hersenaandoening, cerebral palsy, MS, Parkinson en CVA.`.trim();

function enableTestItem(elements) {
    elements[0].closest(".test-item").classList.remove("disabled");
    elements.forEach(element => element.disabled = false);
}

function disableTestItem(elements) {
    elements[0].closest(".test-item").classList.add("disabled");
    elements.forEach(element => element.disabled = true);
}

function applyInterFieldEffects(newState) {
    const state = observableState.getObject();

    // First enable all assignments
    for(let i = 1; i <= 17; i++) {
        enableTestItem(document.testForm[`tis.assignment_${i}`]);
    }

    // If the S.1 scores 0, score 0 and disable all other assignments
    if(newState?.tis?.assignment_1 === "0") {
        for(let i = 2; i <= 17; i++) {
            newState.tis[`assignment_${i}`] = "0";
            disableTestItem(document.testForm[`tis.assignment_${i}`]);
        }
    }

    // Logic for specific assignments that should be scored 0 and disabled if another assignment is scored 0
    const disablingLogicMapping = {
        4: 5,
        5: 6,
        7: 8,
        8: 9,
        10: 11,
        12: 13,
        14: 15,
        16: 17,
    }

    for(const sourceAssignmentKey in disablingLogicMapping) {
        if(newState?.tis[`assignment_${sourceAssignmentKey}`] === "0") {
            newState.tis[`assignment_${disablingLogicMapping[sourceAssignmentKey]}`] = "0";
            disableTestItem(document.testForm[`tis.assignment_${disablingLogicMapping[sourceAssignmentKey]}`]);
        }
    }

    state.tis = newState.tis;
}

function isEverythingFilledIn(newState) {
    for(let i = 1; i <= 17; i++) {
        if(
            !newState?.tis?.hasOwnProperty(`assignment_${i}`)
            || !newState?.tis[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function calculateAndDisplayTotalScore(newState) {
    const staticSitScore = [1,2,3].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.tis[`assignment_${assignmentNumber}`]), 0);

    const dynamicSitScore = [4,5,6,7,8,9,10,11,12,13].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.tis[`assignment_${assignmentNumber}`]), 0);

    const coordinationScore = [14,15,16,17].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.tis[`assignment_${assignmentNumber}`]), 0);

    const totalScore = staticSitScore + dynamicSitScore + coordinationScore;

    document.getElementById("tis-static-sit-score").innerHTML = `${staticSitScore}&nbsp;/&nbsp;7`;
    document.getElementById("tis-dynamic-sit-score").innerHTML = `${dynamicSitScore}&nbsp;/&nbsp;10`;
    document.getElementById("tis-coordination-score").innerHTML = `${coordinationScore}&nbsp;/&nbsp;6`;
    document.getElementById("tis-total-score").innerHTML = `<span class="fs-3 fw-bold">${totalScore}</span>&nbsp;/&nbsp;23`;

    document.getElementById("tis-results-wrapper").classList.remove("d-none");
}

function hideTotalScore() {
    document.getElementById("tis-results-wrapper").classList.add("d-none");
}

export default new Test({
    id: "tis",
    shortName: "TIS",
    longName: "Trunk Impairment Scale",
    description,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/trunk-impairment-scale/",
    getformContentHTML: () => {
        return `
<div class="mb-3">${description}</div>
<div class="row row-cols-1 row-cols-lg-2 justify-content-between">
    <div class="col maxwidth-800">
        <div class="description">
            <h2 class="display-2 fs-4">Benodigdheden</h2>
            <ul>
                <li>een stopwatch</li>
                <li>een blokkussen</li>
                <li>een behandelbank</li>
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

        <div class="description">
            <h2 class="display-2 fs-4">Instructies</h2>

            <p><strong>Uitgangspositie</strong>: De patiënt zit op de rand van een behandelbank zonder arm- en rugondersteuning. De bovenbenen maken volledig contact met de behandelbank. De voeten worden op heupbreedte en plat op de grond geplaatst. De kniehoek is 90 graden. De armen rusten op de benen. Indien een verhoogde tonus in de paretische arm aanwezig is, wordt de positie van deze arm als uitgangshouding genoteerd. Hoofd en romp zijn in middenpositie.</p>

            <p>Elk test-item mag <strong>3 keer</strong> afgenomen worden. De patiënt mag tussen de pogingen door gecorrigeerd worden. De <strong>hoogste score</strong> wordt genoteerd. De test-items worden verbaal aan de patiënt uitgelegd en kunnen, indien nodig, worden voorgedaan door de testafnemer. Oefening van een test-item voorafgaand aan de test wordt echter niet toegestaan.</p>
        </div>
    </div>

    <div class="col">
        <h2 class="display-2 fs-4">Opdrachten</h2>

        <table class="table table-borderless">
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">Statische zitbalans</h3>
                    <h4 class="display-4 fs-6">S.1</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert in de uitgangspositie 10 seconden te zitten zonder steun van de armen.</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je de rest van de test over en wordt de totale score ook 0.)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_1" id="tis.assignment_1-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_1-0">0 - Patiënt valt of houdt de uitgangspositie zonder steun van de armen minder dan 10 sec. vol</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_1" id="tis.assignment_1-2" value="2" />
                        <label class="form-check-label" for="tis.assignment_1-2">2 - Patiënt kan uitgangshouding 10 sec. volhouden</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">S.2</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal S.1, maar <strong>de therapeut</strong> legt het niet-paretische been van de patiënt over het paretische been.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_2" id="tis.assignment_2-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_2-0">0 - Patiënt valt of houdt de uitgangspositie zonder steun van de armen minder dan 10 sec. vol</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_2" id="tis.assignment_2-2" value="2" />
                        <label class="form-check-label" for="tis.assignment_2-2">2 - Patiënt kan uitgangshouding 10 sec. volhouden</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">S.3</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal S.1, maar <strong>de patiënt</strong> legt zelf het niet-paretische been over het paretische been</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_3" id="tis.assignment_3-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_3-0">0 - Patiënt valt</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_3" id="tis.assignment_3-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_3-1">1 - Patiënt kan de benen niet kruisen zonder steun van de armen op de behandelbank</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_3" id="tis.assignment_3-2" value="2" />
                        <label class="form-check-label" for="tis.assignment_3-2">2 - Patiënt kruist de benen, maar verplaatst de romp hierbij meer dan 10 cm achterwaarts of assisteert de beweging met de eigen handen</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_3" id="tis.assignment_3-3" value="3" />
                        <label class="form-check-label" for="tis.assignment_3-3">3 - Patiënt kruist de benen zonder rompverplaatsing of assistentie van de handen</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">Dynamische zitbalans</h3>
                    <h4 class="display-4 fs-6">D.1</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Patiënt wordt geïnstrueerd de behandelbank met de <strong>paretische elleboog</strong> aan te tikken (door het verkorten van de paretische zijde en verlengen van de niet-paretische zijde) en daarna terug te keren naar de uitgangspositie.</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je D.2 en D.3 over en ga je door met D.4)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_4" id="tis.assignment_4-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_4-0">0 - Patiënt valt, heeft steun nodig van een arm of de elleboog raakt de behandelbank niet</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_4" id="tis.assignment_4-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_4-1">1 - Patiënt beweegt actief zonder hulp, elleboog raakt de behandelbank</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.2</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal D.1</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je D.3 over en ga je door met D.4)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_5" id="tis.assignment_5-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_5-0">0 - Patiënt laat geen of tegengestelde
verkorting/verlenging zien</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_5" id="tis.assignment_5-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_5-1">1 - Patiënt laat gewenste verkorting/verlenging
zien</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.3</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal D.1</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_6" id="tis.assignment_6-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_6-0">
                            <span>0 - Patiënt compenseert. Mogelijke compensaties zijn:</span>
                            <ul>
                                <li>gebruik van een arm</li>
                                <li>heupabductie van contralaterale heup</li>
                                <li>heupflexie (als de elleboog de behandelbank raakt verder dan de proximale helft van het femur)</li>
                                <li>knie flexie</li>
                                <li>wegglijden van de voeten</li>
                            </ul>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_6" id="tis.assignment_6-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_6-1">1 - Patiënt beweegt zonder compensatie</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.4</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Patiënt wordt geïnstrueerd de behandelbank met de <strong>niet-paretische</strong> elleboog aan te tikken (door het verkorten van de niet-paretische zijde en verlengen van de paretische zijde) en daarna terug te keren naar de uitgangspositie</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je D.5 en D.6 over en ga je door met D.7)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_7" id="tis.assignment_7-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_7-0">0 - Patiënt valt, heeft steun nodig van een arm of de elleboog raakt de behandelbank niet</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_7" id="tis.assignment_7-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_7-1">1 - Patiënt beweegt actief zonder hulp, elleboog raakt de behandelbank</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.5</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal D.4</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je D.6 over en ga je door met D.7)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_8" id="tis.assignment_8-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_8-0">0 - Patiënt laat geen of tegengestelde verkorting/verlenging zien</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_8" id="tis.assignment_8-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_8-1">1 - Patiënt laat gewenste verkorting/verlenging zien</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.6</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal D.4</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_9" id="tis.assignment_9-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_9-0">
                            <span>0 - Patiënt compenseert. Mogelijke compensaties zijn:</span>
                            <ul>
                                <li>gebruik van een arm</li>
                                <li>heupabductie van contralaterale heup</li>
                                <li>heupflexie (als de elleboog de behandelbank raakt verder dan de proximale helft van het femur)</li>
                                <li>knie flexie</li>
                                <li>wegglijden van de voeten</li>
                            </ul>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_9" id="tis.assignment_9-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_9-1">1 - Patiënt beweegt zonder compensatie</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.7</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Patiënt wordt geïnstrueerd het bekken op te tillen aan de <strong>paretische</strong> zijde (door verkorting van de paretische zijde en verlenging van de niet-paretische zijde) en daarna terug te keren naar de uitgangspositie.</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je D.8 over en ga je door met D.9)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_10" id="tis.assignment_10-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_10-0">0 - Patiënt laat geen of tegengestelde verkorting/verlenging zien</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_10" id="tis.assignment_10-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_10-1">1 - Patiënt laat gewenste verkorting/verlenging zien</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.8</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal D.7</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_11" id="tis.assignment_11-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_11-0">
                            <span>0 - Patiënt compenseert. Mogelijke compensaties zijn:</span>
                            <ul>
                                <li>gebruik van een arm</li>
                                <li>afzetten met de ipsilaterale voet (hiel verliest contact met de grond)</li>
                            </ul>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_11" id="tis.assignment_11-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_11-1">1 - Patiënt beweegt zonder compensatie</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.9</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Patiënt wordt geïnstrueerd het bekken op te tillen aan de <strong>niet-paretische</strong> zijde (door verkorting van de niet-paretische zijde en verlenging van de paretische zijde) en daarna terug te keren naar de uitgangspositie.</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je D.10 over en ga je door met de volgende sectie)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_12" id="tis.assignment_12-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_12-0">0 - Patiënt laat geen of tegengestelde verkorting/verlenging zien</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_12" id="tis.assignment_12-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_12-1">1 - Patiënt laat gewenste verkorting/verlenging zien</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">D.10</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal D.9</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_13" id="tis.assignment_13-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_13-0">
                            <span>0 - Patiënt compenseert. Mogelijke compensaties zijn:</span>
                            <ul>
                                <li>gebruik van een arm</li>
                                <li>afzetten met de ipsilaterale voet (hiel verliest contact met de grond)</li>
                            </ul>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_13" id="tis.assignment_13-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_13-1">1 - Patiënt beweegt zonder compensatie</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">Coördinatie</h3>
                    <h4 class="display-4 fs-6">C.1</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Patiënt wordt geïnstrueerd de romp 6 keer te roteren (elke schouder/bovendeel romp beweegt 3 keer voorwaarts), waarbij <strong>eerst de paretische schouder</strong> naar voren wordt gebracht. Het hoofd moet gefixeerd blijven in de uitgangshouding.</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je C.2 over en ga je door met C.3)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_14" id="tis.assignment_14-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_14-0">0 - Paretische zijde beweegt niet 3 keer naar voren</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_14" id="tis.assignment_14-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_14-1">1 - Rotatie is asymmetrisch</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_14" id="tis.assignment_14-2" value="2" />
                        <label class="form-check-label" for="tis.assignment_14-2">2 - Rotatie is symmetrisch</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">C.2</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal C.1 binnen 6 seconden</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_15" id="tis.assignment_15-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_15-0">0 - Rotatie is asymmetrisch</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_15" id="tis.assignment_15-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_15-1">1 - Rotatie is symmetrisch</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">C.3</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Patiënt wordt geïnstrueerd bekken/lage rug 6 keer te roteren (elke knie beweegt 3 keer voorwaarts), waarbij <strong>eerst de paretische knie</strong> naar voren wordt gebracht. Het bovenste deel van de romp moet gefixeerd blijven in de uitgangshouding.</div>
                    <div class="mb-1">(Als de score hiervoor 0 wordt, sla je C.4 over)</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_16" id="tis.assignment_16-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_16-0">0 - Paretische zijde beweegt niet 3 keer naar voren</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_16" id="tis.assignment_16-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_16-1">1 - Rotatie is asymmetrisch</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_16" id="tis.assignment_16-2" value="2" />
                        <label class="form-check-label" for="tis.assignment_16-2">2 - Rotatie is symmetrisch</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item display-if-previous-filled">
                <td class="pb-4">
                    <h4 class="display-4 fs-6">C.4</h4>
                    <div class="mb-1"><strong>Instructie</strong>: Herhaal C.3 binnen 6 seconden</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_17" id="tis.assignment_17-0" value="0" />
                        <label class="form-check-label" for="tis.assignment_17-0">0 - Rotatie is asymmetrisch</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tis.assignment_17" id="tis.assignment_17-1" value="1" />
                        <label class="form-check-label" for="tis.assignment_17-1">1 - Rotatie is symmetrisch</label>
                    </div>
                </td>
            </tr>
        </table>

        <div id="tis-results-wrapper" class="d-none">
            <h2 class="display-2 fs-4">Uitslag</h2>
            <table class="table table-borderless">
                <tr>
                    <td>Statische zitbalans score:</td>
                    <td><span id="tis-static-sit-score" class="d-flex align-items-center"></span></td>
                </tr>
                <tr>
                    <td>Dynamische zitbalans score:</td>
                    <td><span id="tis-dynamic-sit-score" class="d-flex align-items-center"></span></td>
                </tr>
                <tr>
                    <td>Coördinatie score:</td>
                    <td><span id="tis-coordination-score" class="d-flex align-items-center"></span></td>
                </tr>
                <tr>
                    <td>Totale score:</td>
                    <td><span id="tis-total-score" class="d-flex align-items-center"></span></td>
                </tr>
                <tr>
                    <td>Interpretatie:</td>
                    <td><ul id="tis-interpretation">
                        <li>Mediane TIS score bij patiënten <strong>2 maanden</strong> na CVA: 14</li>
                        <li>Mediane TIS score bij <strong>niet-lopende</strong> patiënten <strong>4 maanden</strong> na CVA: 8</li>
                        <li>Mediane TIS score bij <strong>lopende</strong> patiënten <strong>4 maanden</strong> na CVA: 14</li>
                    </ul>
                </tr>
            </table>
        </div>
    </div>
</div>
        `.trim();
    },
    onStateChange: (newState) => {
        applyInterFieldEffects(newState);

        if(isEverythingFilledIn(newState)) {
            calculateAndDisplayTotalScore(newState);
        } else {
            hideTotalScore();
        }
    }
});