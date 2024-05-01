import Test from "../../data-types/Test.js";
import observableState from "../../state.js";
import { formatNumber } from "./utils.js";

function applyInterFieldEffects(newState) {
    // Set and disable arm fields if the results are already known
    if(newState?.mi?.pre?.partial_scores?.arm?.length) {
        const splitScores = newState.mi.pre.partial_scores.arm.split('-');

        for(let i = 1; i <= 3; i++) {
            newState.mi[`assignment_${i}`] = (splitScores.hasOwnProperty(i - 1) && splitScores[i-1].length) ? parseInt(splitScores[i-1]).toString() : "0";
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.add("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = true);
        }
    } else {
        for(let i = 1; i <= 3; i++) {
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.remove("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = false);
        }
    }

    // Set and disable leg fields if the results are already known
    if(newState?.mi?.pre?.partial_scores?.leg?.length) {
        const splitScores = newState.mi.pre.partial_scores.leg.split('-');

        for(let i = 4; i <= 6; i++) {
            newState.mi[`assignment_${i}`] = (splitScores.hasOwnProperty(i - 4) && splitScores[i-4].length) ? parseInt(splitScores[i-4]).toString() : "0";
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.add("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = true);
        }
    } else {
        for(let i = 4; i <= 6; i++) {
            document.testForm[`mi.assignment_${i}`][0].closest(".test-item").classList.remove("disabled");
            document.testForm[`mi.assignment_${i}`].forEach(element => element.disabled = false);
        }
    }

    const state = observableState.getObject();
    state.mi = newState.mi;
}

function isArmDataFilledIn(newState) {
    for(let i = 1; i <= 3; i++) {
        if(
            !newState?.mi?.hasOwnProperty(`assignment_${i}`)
            || !newState?.mi[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function isLegDataFilledIn(newState) {
    for(let i = 4; i <= 6; i++) {
        if(
            !newState?.mi?.hasOwnProperty(`assignment_${i}`)
            || !newState?.mi[`assignment_${i}`].length) {
            return false;
        }
    }

    return true;
}

function isEverythingFilledIn(newState) {
    return isArmDataFilledIn(newState) && isLegDataFilledIn(newState);
}

function calculateArmScore(newState) {
    let armScore = [1,2,3].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.mi[`assignment_${assignmentNumber}`]), 0);

    if(armScore === 99) {
        armScore = 100;
    }

    return armScore;
}

function calculateAndDisplayArmScore(newState) {
    const armScore = calculateArmScore(newState);

    document.getElementById("arm-score").innerHTML = armScore;
    document.getElementById("arm-results-wrapper").classList.remove("d-none");
}

function hideArmScore() {
    document.getElementById("arm-results-wrapper").classList.add("d-none");
}

function calculateLegScore(newState) {
    let legScore = [4,5,6].reduce((previousValue, assignmentNumber) => previousValue += parseInt(newState?.mi[`assignment_${assignmentNumber}`]), 0);

    if(legScore === 99) {
        legScore = 100;
    }

    return legScore;
}

function calculateAndDisplayLegScore(newState) {
    const legScore = calculateLegScore(newState);

    document.getElementById("leg-score").innerHTML = legScore;
    document.getElementById("leg-results-wrapper").classList.remove("d-none");
}

function hideLegScore() {
    document.getElementById("leg-results-wrapper").classList.add("d-none");
}

function calculateAndDisplayTotalScore(newState) {
    const totalScore = (calculateArmScore(newState) + calculateLegScore(newState)) / 2;

    document.getElementById("total-score").innerHTML = formatNumber(totalScore) + "%";
    document.getElementById("total-score-wrapper").classList.remove("d-none");
}

function hideTotalScore() {
    document.getElementById("total-score-wrapper").classList.add("d-none");
}

const description = `
Met de Motricity Index kan de <strong>mate van hemiplegie</strong> van zowel de armen als de benen gemeten worden. Een hoge score op de Motricity Index komt overeen met een hoge mate van <strong>kracht</strong>. Doelgroep: CVA-patiënten.
`.trim();

export default new Test({
    id: "mi",
    shortName: "MI",
    longName: "Motricity Index",
    description,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/motricity-index/",
    getformContentHTML: () => {
        return `
<div class="mb-3">${description}</div>

<div class="description">
    <h2 class="display-2 fs-4">Benodigdheden</h2>
    <ul>
        <li>een blok hout van 2,5 cm</li>
        <li>een behandelbank / bed / (rol)stoel</li>
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
    <p>De patiënt zit en heeft de knie in een flexiehoek van 90°; de voeten staan plat op de grond (0°-
stand). De opdrachten worden <strong>twee keer</strong> uitgevoerd: eerst bij de niet-paremiche zij en vervolgens bij de paremiche zij.</p>

    <p>De patiënt dient zonder steun te kunnen zitten. Indien er sprake is van een matige of slechte rompbalans, mag de patiënt in de rug en zij worden gesteund.</p>
</div>

<div id="assignments-wrapper" class="row row-cols-1 row-cols-lg-2 justify-content-between">
    <div class="col">
        <h2 class="display-2 fs-4">Opdrachten arm</h2>
        <div class="mb-3 maxwidth-480 | pre-measurements">
            <h3 class="display-3 fs-5">Vooraf bekende deelscores</h3>
            <input type="text" name="mi.pre.partial_scores.arm" id="mi.pre.partial_scores.arm" placeholder="XX-XX-XX" class="form-control" />
        </div>

        <table id="assignments-wrapper" class="table table-borderless">
            <tr data-item-type="radio" class="test-item">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">1. Pincet greep</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert een 2,5 cm blokje tussen duim en wijsvinger vast te houden.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_1" id="mi.assignment_1-0" value="0" />
                        <label class="form-check-label" for="mi.assignment_1-0">0 - geen beweging</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_1" id="mi.assignment_1-11" value="11" />
                        <label class="form-check-label" for="mi.assignment_1-11">11 - elke willekeurige beweging van vinger en/of duim</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_1" id="mi.assignment_1-19" value="19" />
                        <label class="form-check-label" for="mi.assignment_1-19">19 - patiënt pakt het blokje maar kan het niet optillen tegen de zwaartekracht in</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_1" id="mi.assignment_1-22" value="22" />
                        <label class="form-check-label" for="mi.assignment_1-22">22 - patiënt pakt het blokje maar kan het niet stevig vasthouden</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_1" id="mi.assignment_1-26" value="26" />
                        <label class="form-check-label" for="mi.assignment_1-26">26 - patiënt pakt het blokje op maar kan het niet zo stevig vasthouden als aan de niet aangedane zijde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_1" id="mi.assignment_1-33" value="33" />
                        <label class="form-check-label" for="mi.assignment_1-33">33 - normale knijpkracht (in vergelijking met niet aangedane zijde)</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">2. Flexie elleboog</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert de elleboog tot volledige flexie (±160°) te buigen.</div>
                    <div class="mb-1">Bij het isometrisch testen van de weerstand (25 punten of meer) wordt de elleboog in 90° flexiestand gehouden.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_2" id="mi.assignment_2-0" value="0" />
                        <label class="form-check-label" for="mi.assignment_2-0">0 - geen willekeurige beweging</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_2" id="mi.assignment_2-9" value="9" />
                        <label class="form-check-label" for="mi.assignment_2-9">9 - willekeurige activiteit is palpabel</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_2" id="mi.assignment_2-14" value="14" />
                        <label class="form-check-label" for="mi.assignment_2-14">14 - willekeurige beweging is zichtbaar maar niet over de hele bewegingsrange</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_2" id="mi.assignment_2-19" value="19" />
                        <label class="form-check-label" for="mi.assignment_2-19">19 - willekeurige beweging is over de hele range mogelijk, maar niet tegen een weerstand in</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_2" id="mi.assignment_2-25" value="25" />
                        <label class="form-check-label" for="mi.assignment_2-25">25 - willekeurige beweging is tegen een weerstand in over de hele range mogelijk maar is zwakker dan aan de niet aangedane zijde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_2" id="mi.assignment_2-33" value="33" />
                        <label class="form-check-label" for="mi.assignment_2-33">33 - normale kracht (in vergelijking met niet aangedane zijde)</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">3. Abductie schouder</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert de schouder vanuit 0° tot 90° te abduceren.</div>
                    <div class="mb-1">Bij het isometrisch testen van de weerstand (25 punten of meer) wordt de schouder in 90° abductiestand gehouden.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_3" id="mi.assignment_3-0" value="0" />
                        <label class="form-check-label" for="mi.assignment_3-0">0 - geen willekeurige beweging</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_3" id="mi.assignment_3-9" value="9" />
                        <label class="form-check-label" for="mi.assignment_3-9">9 - willekeurige activiteit is palpabel</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_3" id="mi.assignment_3-14" value="14" />
                        <label class="form-check-label" for="mi.assignment_3-14">14 - willekeurige beweging is zichtbaar maar niet over de hele bewegingsrange</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_3" id="mi.assignment_3-19" value="19" />
                        <label class="form-check-label" for="mi.assignment_3-19">19 - willekeurige beweging is over de hele range mogelijk, maar niet tegen een weerstand in</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_3" id="mi.assignment_3-25" value="25" />
                        <label class="form-check-label" for="mi.assignment_3-25">25 - willekeurige beweging is tegen een weerstand in over de hele range mogelijk maar is zwakker dan aan de niet aangedane zijde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_3" id="mi.assignment_3-33" value="33" />
                        <label class="form-check-label" for="mi.assignment_3-33">33 - normale kracht (in vergelijking met niet aangedane zijde)</label>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <div class="col">
        <h2 class="display-2 fs-4">Opdrachten been</h2>
        <div class="mb-3 maxwidth-480 | pre-measurements">
            <h3 class="display-3 fs-5">Vooraf bekende deelscores</h3>
            <input type="text" name="mi.pre.partial_scores.leg" id="mi.pre.partial_scores.leg" placeholder="XX-XX-XX" class="form-control" />
        </div>

        <table id="assignments-wrapper" class="table table-borderless">
            <tr data-item-type="radio" class="test-item">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">1. Dorsaalflexie enkel</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert bij de enkel een dorsaalflexie vanuit 0°-stand te maken.</div>
                    <div class="mb-1">Bij een beperkte dorsaalflexie mag uitgegaan worden van een plantairflexie stand van de voet ipv de 0°-stand. Bij het isometrisch testen van de weerstand (25 punten of meer) wordt de enkel in ±20° dorsaalflexiestand gehouden.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_4" id="mi.assignment_4-0" value="0" />
                        <label class="form-check-label" for="mi.assignment_4-0">0 - geen willekeurige beweging</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_4" id="mi.assignment_4-9" value="9" />
                        <label class="form-check-label" for="mi.assignment_4-9">9 - willekeurige activiteit is palpabel</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_4" id="mi.assignment_4-14" value="14" />
                        <label class="form-check-label" for="mi.assignment_4-14">14 - willekeurige beweging is zichtbaar maar niet over de hele bewegingsrange</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_4" id="mi.assignment_4-19" value="19" />
                        <label class="form-check-label" for="mi.assignment_4-19">19 - willekeurige beweging is over de hele range mogelijk, maar niet tegen een weerstand in</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_4" id="mi.assignment_4-25" value="25" />
                        <label class="form-check-label" for="mi.assignment_4-25">25 - willekeurige beweging is tegen een weerstand in over de hele range mogelijk maar is zwakker dan aan de niet aangedane zijde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_4" id="mi.assignment_4-33" value="33" />
                        <label class="form-check-label" for="mi.assignment_4-33">33 - normale kracht (in vergelijking met niet aangedane zijde)</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">2. Extensie knie</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert de knie vanuit 90°-stand te extenderen.</div>
                    <div class="mb-1">Bij het isometrisch testen van de weerstand (25 punten of meer) wordt de knie in 180° extensiestand gehouden.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_5" id="mi.assignment_5-0" value="0" />
                        <label class="form-check-label" for="mi.assignment_5-0">0 - geen willekeurige beweging</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_5" id="mi.assignment_5-9" value="9" />
                        <label class="form-check-label" for="mi.assignment_5-9">9 - willekeurige activiteit is palpabel</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_5" id="mi.assignment_5-14" value="14" />
                        <label class="form-check-label" for="mi.assignment_5-14">14 - willekeurige beweging is zichtbaar maar niet over de hele bewegingsrange</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_5" id="mi.assignment_5-19" value="19" />
                        <label class="form-check-label" for="mi.assignment_5-19">19 - willekeurige beweging is over de hele range mogelijk, maar niet tegen een weerstand in</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_5" id="mi.assignment_5-25" value="25" />
                        <label class="form-check-label" for="mi.assignment_5-25">25 - willekeurige beweging is tegen een weerstand in over de hele range mogelijk maar is zwakker dan aan de niet aangedane zijde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_5" id="mi.assignment_5-33" value="33" />
                        <label class="form-check-label" for="mi.assignment_5-33">33 - normale kracht (in vergelijking met niet aangedane zijde)</label>
                    </div>
                </td>
            </tr>
            <tr data-item-type="radio" class="test-item">
                <td class="pb-4">
                    <h3 class="display-3 fs-5">3. Anteflexie heup</h4>
                    <div class="mb-1"><strong>Instructie</strong>: De patiënt probeert de heup vanuit 90° flexiestand te flecteren.</div>
                    <div class="mb-1">Bij het isometrisch testen van de weerstand (25 punten of meer) wordt de heup in 90° flexiestand gehouden. Hierbij dient de voet los van de grond te zijn.</div>

                    <div class="mb-2"><strong>Score:</strong></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_6" id="mi.assignment_6-0" value="0" />
                        <label class="form-check-label" for="mi.assignment_6-0">0 - geen willekeurige beweging</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_6" id="mi.assignment_6-9" value="9" />
                        <label class="form-check-label" for="mi.assignment_6-9">9 - willekeurige activiteit is palpabel</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_6" id="mi.assignment_6-14" value="14" />
                        <label class="form-check-label" for="mi.assignment_6-14">14 - willekeurige beweging is zichtbaar maar niet over de hele bewegingsrange</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_6" id="mi.assignment_6-19" value="19" />
                        <label class="form-check-label" for="mi.assignment_6-19">19 - willekeurige beweging is over de hele range mogelijk, maar niet tegen een weerstand in</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_6" id="mi.assignment_6-25" value="25" />
                        <label class="form-check-label" for="mi.assignment_6-25">25 - willekeurige beweging is tegen een weerstand in over de hele range mogelijk maar is zwakker dan aan de niet aangedane zijde</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mi.assignment_6" id="mi.assignment_6-33" value="33" />
                        <label class="form-check-label" for="mi.assignment_6-33">33 - normale kracht (in vergelijking met niet aangedane zijde)</label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="results-wrapper" class="row row-cols-1 row-cols-lg-2 justify-content-between">
    <div class="col">
        <div id="arm-results-wrapper" class="d-none">
            <p class="fw-bold">Deelscore arm: <span id="arm-score"></span>&nbsp;/&nbsp;100</p>
        </div>
    </div>
    <div class="col">
        <div id="leg-results-wrapper" class="d-none">
            <p class="fw-bold">Deelscore been: <span id="leg-score"></span>&nbsp;/&nbsp;100</p>
        </div>
    </div>
    <div id="total-score-wrapper">
        <p><span class="fw-bold">Totale score: </span><span id="total-score" class="fs-3 fw-bold"></span></p>
        <p><span class="fw-bold">Interpretatie: </span>Een lagere percentage betekent een ernstigere hemiplegie.</p>
    </div>
</div>
        `.trim();
    },
    onStateChange: (newState) => {
        applyInterFieldEffects(newState);

        if(isArmDataFilledIn(newState)) {
            calculateAndDisplayArmScore(newState);
        } else {
            hideArmScore();
        }

        if(isLegDataFilledIn(newState)) {
            calculateAndDisplayLegScore(newState);
        } else {
            hideLegScore();
        }

        if(isEverythingFilledIn(newState)) {
            calculateAndDisplayTotalScore(newState);
        } else {
            hideTotalScore();
        }
    }
});