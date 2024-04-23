import Test from "../../data-types/Test.js";
import { calculateBMI } from "./BodyFat.js";
import { formatNumber, isFilled, setContraIndication } from "./utils.js";

function calculatePredictedDistance({sex, age, height_cm, weight_kg, parcour, distance}) {
    const values = {
        age: parseInt(age),
        height_cm: parseInt(height_cm),
        weight_kg: parseInt(weight_kg),
        parcour: parseInt(parcour),
        distance: parseInt(distance),
    };

    const BMI = calculateBMI(values.height_cm, values.weight_kg);

    if(values.parcour === 10 && sex === "M") {
        return 1266 - (7.80 * values.age) - (5.92 * BMI);
    }

    if(values.parcour === 10 && sex === "F") {
        return 1064 - (5.28 * values.age) - (6.55 * BMI);
    }

    if(values.parcour === 30 && sex === "M") {
        return 1140 - (6.94 * values.age) - (5.61 * BMI);
    }

    if(values.parcour === 30 && sex === "F") {
        return 1017 - (5.83 * values.age) - (6.24 * BMI);
    }

    if(values.parcour === 50 && sex === "M") {
        return 218 + (5.14 * values.height_cm - 5.32 * values.age) - (1.80 * values.weight_kg) + 51.31;
    }

    if(values.parcour === 50 && sex === "F") {
        return 218 + (5.14 * values.height_cm - 5.32 * values.age) - (1.80 * values.weight_kg);
    }
}

export default new Test({
    id: "six_mwt",
    shortName: "6MWT",
    longName: "6 minuten wandeltest",
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/6-minute-walk-test-zes-minuten-wandeltest/",
    getformContentHTML: () => {
        return `
<p>De 6 minuten wandeltest wordt gebruikt om de <strong>functionele capaciteit</strong> te meten. Functionele capaciteit is het vermogen van een persoon om dagelijkse activiteiten uit te voeren zonder belemmering of ongemak als gevolg van fysieke beperkingen of aandoeningen. Het omvat de verschillende aspecten van het functioneren van het lichaam, zoals kracht, flexibiliteit, balans, uithoudingsvermogen en coördinatie.</p>
<div class="row">
    <div class="col">
        <div class="description">
            <h2 class="display-2 fs-4">Benodigdheden</h2>
            <ul>
                <li>2 stoelen</li>
                <li>2 pionnen</li>
                <li>(weegschaal)</li>
                <li>meetlint</li>
                <li>zuurstofsaturatiemeter</li>
                <li>bloeddrukmeter</li>
                <li><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">Borg schaal kortademigheid / vermoeidheid</a></li>
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
                <tr>
                    <td><label for="general.age" class="form-label">Leeftijd:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.age" id="general.age" class="form-control" min="0" /><span class="ps-2">jaar</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label>Geslacht:</label></td>
                    <td>
                        <div class="form-check form-check-inline ">
                            <input type="radio" name="general.sex" value="M" id="general.sex.m" class="form-check-input" />
                            <label for="general.sex.m" class="form-check-label">Man</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input type="radio" name="general.sex" value="F" id="general.sex.f" class="form-check-input" />
                            <label for="general.sex.f" class="form-check-label">Vrouw</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="pre-measurements">
            <h2 class="display-2 fs-4">Voormetingen</h2>
            <table class="table table-borderless maxwidth-480">
                <tr>
                    <td><label for="general.date" class="form-label">Datum:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="text" name="general.date" id="general.date" class="form-control" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.height_cm" class="form-label">Lengte:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.height_cm" id="general.height_cm" class="form-control" min="0" /><span class="ps-2">cm</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.weight_kg" class="form-label">Gewicht:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.weight_kg" id="general.weight_kg" class="form-control" min="0" /><span class="ps-2">kg</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.in_rest.heart_rate" class="form-label">Hartfrequentie:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.in_rest.heart_rate" id="general.in_rest.heart_rate" class="form-control" min="0" /><span class="ps-2">bpm</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.in_rest.oxygen_saturation" class="form-label">Zuurstofsaturatie:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.in_rest.oxygen_saturation" id="general.in_rest.oxygen_saturation" class="form-control" min="0" max="100" /><span class="ps-2">%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.in_rest.blood_pressure_systolic" class="form-label">Bloeddruk:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.in_rest.blood_pressure_systolic" id="general.in_rest.blood_pressure_systolic" class="form-control" min="0" /><span class="ps-2 pe-2">/</span><input type="number" name="general.in_rest.blood_pressure_diastolic" id="general.in_rest.blood_pressure_diastolic" class="form-control" min="0" /><span class="ps-2">mmHg</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.in_rest.borg_dyspnoea" class="form-label"><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">Borg kortademigheid:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.in_rest.borg_dyspnoea" id="general.in_rest.borg_dyspnoea" class="form-control" min="0" max="10" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="general.in_rest.borg_fatigue" class="form-label"><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">Borg vermoeidheid:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="general.in_rest.borg_fatigue" id="general.in_rest.borg_fatigue" class="form-control" min="0" max="10" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div class="col | description">
        <h2 class="display-2 fs-4">Contra-indicaties</h2>

        <h3 class="display-3 fs-5">Absolute contra-indicaties</h3>
        <ul>
            <li>onstabiele angina pectoris (afgelopen maand)</li>
            <li>myocard infarct (afgelopen maand)</li>
            <li>zuurstofsaturatie in rust < 90%</li>
        </ul>

        <h3 class="display-3 fs-5">Relatieve contra-indicaties</h3>
        <ul>
            <li>rusthartslag > 120 bpm</li>
            <li>systolische bloeddruk > 180 mmHg</li>
            <li>diastolische bloeddruk > 100 mmHg</li>
        </ul>

        <h3 class="display-3 fs-5">Reden om 6MWT onmiddellijk te stoppen</h3>
        <ul>
            <li>pijn op de borst</li>
            <li>ondragelijke benauwdheid</li>
            <li>beenkrampen</li>
            <li>duizelingen</li>
            <li>extreem zweten</li>
            <li>bleke of grijze gezichtskleur</li>
            <li>zuurstofsaturatie < 85%</li>
        </ul>

        <h2 class="display-2 fs-4">Voorbereidingen</h2>
        <p>Meet een parcour af van 10, 30 of 50 meter. Gebruik de pionnen om de afstand zichtbaar te maken. Zet de stoelen achter de pionnen zodat je snel een stoel erbij kan halen als de patiënt de test voortijdig moet beëindigen en zitten te rusten.</p>
        <p>Meet lengte en gewicht af. Laat de patient vervolgens minimaal 10 minuten in een stoel zitten en neem de overige voormetingen af. Hierbij kun je ook de test uitleggen.</p>

        <h2 class="display-2 fs-4">Uitleg aan de patiënt</h2>
        <p><em>Bij deze test moet u proberen een zo groot mogelijke afstand af te leggen in zes minuten. U moet daarbij heen en weer tussen de pionnen lopen. U mag alleen wandelen, niet joggen of rennen. Ik zal achter u meelopen, en af en toe zal ik naast u komen om de saturatiemeter te bekijken. Zes minuten is een lange tijd om te lopen, dat vraagt dus een inspanning. Misschien raakt u buiten adem of raakt u uitgeput. U mag langzamer gaan lopen of stoppen en rusten indien dit nodig is. U mag ook even tegen de muur leunen, maar U moet weer gaan lopen zo snel als dit weer mogelijk is. Als U een pauze neemt blijft de timer aan.</em></p>
        <p><em>Ik ga het nu laten zien. Kijk goed hoe ik om de pion heen loop.</em></p>

        <h2 class="display-2 fs-4">Acties tijdens de test</h2>
        <p>Loop achter de patiënt. Elke minuut bepaal je de zuurstofsaturatie.</p>
        <p>Als de patiënt stopt met lopen en pauze nodig heeft: <em>"Je mag tegen de muur leunen als je wilt, start weer met lopen zodra je dat kan; de timer blijft doorgaan."</em>. Als een patiënt stopt met lopen voordat de zes minuten voorbij zijn en niet verder wilt lopen laat je de patiënt zitten op een stoel en beschrijf de gelopen afstand, tijd en reden van stoppen.</p>

        <ul>
            <li>Na 1 minuut: <em>Je gaat goed. Nog vijf minuten te gaan.</em></li>
            <li>Na 2 minuten: <em>Blijf zo door gaan. Nog vier minuten te gaan.</em></li>
            <li>Na 3 minuten: <em>Je gaat goed. Je bent al halverwege de test.</em></li>
            <li>Na 4 minuten: <em>Blijf zo doorgaan. Nog maar twee minuten te gaan.</em></li>
            <li>Na 5 minuten: <em>Je gaat goed. Nog één minuut te gaan.</em></li>
            <li>Na 5:45 minuten: <em>Over enkele seconden zeg ik dat je mag stoppen. Wanneer ik dat roep, stop je waar
je op dat moment bent en ik kom naar je toe.</em></li>
            <li>Na 6 minuten: Roep <em>'Stop'</em> (loop naar de patiënt toe en markeer het punt waar hij is gestopt en meet dit
op)</li>
        </ul>
    </div>

    <div class="col">
        <div class="post-measurements">
            <h2 class="display-2 fs-4">Nametingen</h2>
            <table class="table table-borderless maxwidth-480">
                <tr>
                    <td><label for="six_mwt.parcour" class="form-label">Parcoursafstand:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <select name="six_mwt.parcour" id="six_mwt.parcour" class="form-select">
                                <option value="10">10 m</option>
                                <option value="30">30 m</option>
                                <option value="50">50 m</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="six_mwt.distance" class="form-label">Gelopen afstand:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="six_mwt.distance" id="six_mwt.distance" class="form-control" min="0" /><span class="ps-2">m</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="six_mwt.borg_dyspnoea" class="form-label"><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">Borg kortademigheid:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="six_mwt.borg_dyspnoea" id="six_mwt.borg_dyspnoea" class="form-control" min="0" max="10" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="six_mwt.borg_fatigue" class="form-label"><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">Borg vermoeidheid:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="six_mwt.borg_fatigue" id="six_mwt.borg_fatigue" class="form-control" min="0" max="10" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label>Voornamelijke belemmering:</label></td>
                    <td>
                        <div class="form-check form-check-inline ">
                            <input type="radio" name="six_mwt.bottleneck" value="dyspnoea" id="six_mwt.bottleneck.dyspnoea" class="form-check-input" />
                            <label for="six_mwt.bottleneck.dyspnoea" class="form-check-label">Kortademigheid</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input type="radio" name="six_mwt.bottleneck" value="fatigue" id="six_mwt.bottleneck.fatigue" class="form-check-input" />
                            <label for="six_mwt.bottleneck.fatigue" class="form-check-label">Vermoeidheid</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="six_mwt.oxygen_saturation" class="form-label">Zuurstofsaturatie:</label></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <input type="number" name="six_mwt.oxygen_saturation" id="six_mwt.oxygen_saturation" class="form-control" min="0" max="100" /><span class="ps-2">%</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div id="six_mwt-results-wrapper" class="d-none">
            <h2 class="display-2 fs-4">Uitslag</h2>
            <table class="table table-borderless maxwidth-480">
                <tr>
                    <td>Gemiddelde loopsnelheid:</td>
                    <td><span id="six_mwt-average-speed-ms"></span><span class="ps-2">m/s&nbsp;=&nbsp;</span><span id="six_mwt-average-speed-kmh"></span><span class="ps-2">km/h</span></td>
                </tr>
                <tr>
                    <td>Voorspelde afstand:</td>
                    <td><span id="six_mwt-predicted"></span><span class="ps-2">m</span></td>
                </tr>
                <tr>
                    <td>Uitslag t.o.v. voorspelde afstand:</td>
                    <td><span id="six_mwt-result"></span><span class="ps-2">%</span></td>
                </tr>
                <tr>
                    <td>Uitslag bij COPD:</td>
                    <td><span id="six_mwt-result-copd"></span></td>
                </tr>
                <tr>
                    <td>Uitslag bij artrose:</td>
                    <td>Hoe meer meters zijn afgelegd hoe beter het functioneren.</td>
                </tr>
                <tr>
                    <td>Uitslag bij reumatoïde artritis:</td>
                    <td>Hoe meer meters zijn afgelegd hoe beter het functioneren.</td>
                </tr>
            </table>
        </div>
    </div>
</div>
        `.trim();
    },
    onStateChange: (state) => {
        // Alert contra indications
        if(isFilled(state?.general?.in_rest?.heart_rate)) {
            if(parseInt(state.general.in_rest.heart_rate) > 120) {
                setContraIndication(document.getElementById("general.in_rest.heart_rate"), "relative");
            } else {
                setContraIndication(document.getElementById("general.in_rest.heart_rate"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("general.in_rest.heart_rate"));
        }

        if(isFilled(state?.general?.in_rest?.oxygen_saturation)) {
            if(parseInt(state.general.in_rest.oxygen_saturation) < 90) {
                setContraIndication(document.getElementById("general.in_rest.oxygen_saturation"), "absolute");
            } else {
                setContraIndication(document.getElementById("general.in_rest.oxygen_saturation"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("general.in_rest.oxygen_saturation"));
        }

        if(isFilled(state?.general?.in_rest?.blood_pressure_systolic)) {
            if(parseInt(state.general.in_rest.blood_pressure_systolic) > 180) {
                setContraIndication(document.getElementById("general.in_rest.blood_pressure_systolic"), "relative");
            } else {
                setContraIndication(document.getElementById("general.in_rest.blood_pressure_systolic"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("general.in_rest.blood_pressure_systolic"));
        }

        if(isFilled(state?.general?.in_rest?.blood_pressure_diastolic)) {
            if(parseInt(state.general.in_rest.blood_pressure_diastolic) > 100) {
                setContraIndication(document.getElementById("general.in_rest.blood_pressure_diastolic"), "relative");
            } else {
                setContraIndication(document.getElementById("general.in_rest.blood_pressure_diastolic"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("general.in_rest.blood_pressure_diastolic"));
        }

        if(isFilled(state?.six_mwt?.oxygen_saturation)) {
            if(parseInt(state.six_mwt.oxygen_saturation) < 85) {
                setContraIndication(document.getElementById("six_mwt.oxygen_saturation"), "absolute");
            } else {
                setContraIndication(document.getElementById("six_mwt.oxygen_saturation"), "clean");
            }
        } else {
            setContraIndication(document.getElementById("six_mwt.oxygen_saturation"));
        }

        // Display results
        if(
            isFilled(state?.general?.sex)
            && isFilled(state?.general?.age)
            && isFilled(state?.general?.height_cm)
            && isFilled(state?.general?.weight_kg)
            && isFilled(state?.six_mwt?.parcour)
            && isFilled(state?.six_mwt?.distance)
        ) {
            const distance = parseInt(state.six_mwt.distance);

            const averageSpeedMS = distance / 360;
            const averageSpeedKMH = averageSpeedMS * 3.6;
            document.getElementById("six_mwt-average-speed-ms").innerText = formatNumber(averageSpeedMS);
            document.getElementById("six_mwt-average-speed-kmh").innerText = formatNumber(averageSpeedKMH);

            const predictedDistance = calculatePredictedDistance({
                sex: state.general.sex,
                age: state.general.age,
                height_cm: state.general.height_cm,
                weight_kg: state.general.weight_kg,
                parcour: state.six_mwt.parcour,
                distance: state.six_mwt.distance,
            });
            document.getElementById("six_mwt-predicted").innerText = formatNumber(predictedDistance, 0);

            const performancePercentage = distance / predictedDistance * 100;
            document.getElementById("six_mwt-result").innerText = formatNumber(performancePercentage, 0);

            if(performancePercentage < 70) {
                document.getElementById("six_mwt-result-copd").innerText = "< 70% => onvoldoende"
            } else {
                document.getElementById("six_mwt-result-copd").innerText = "≥ 70% => voldoende"
            }

            document.getElementById("six_mwt-results-wrapper").classList.remove("d-none");
        } else {
            document.getElementById("six_mwt-results-wrapper").classList.add("d-none");

            document.getElementById("six_mwt-average-speed-ms").innerText = "";
            document.getElementById("six_mwt-average-speed-kmh").innerText = "";
            document.getElementById("six_mwt-predicted").innerText = "";
            document.getElementById("six_mwt-result").innerText = "";
            document.getElementById("six_mwt-result-copd").innerText = "";
        }
    }
});