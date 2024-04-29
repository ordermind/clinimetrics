import Test from "../../data-types/Test.js";

export default new Test({
    id: "bbs",
    shortName: "BBS",
    longName: "Berg Balance Scale",
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/berg-balance-scale/",
    getformContentHTML: () => {
        return `
<div class="mb-3">De Berg Balance Scale meet het <strong>evenwicht</strong> tijdens sta- en transfervaardigheden.</div>
<div class="row">
    <div class="col">
        <div class="description">
            <h2 class="display-2 fs-4">Benodigdheden</h2>
            <ul>
                <li>een stopwatch</li>
                <li>een liniaal of meetlint van 25 cm</li>
                <li>2 stoelen (één met en één zonder armleuning, zithoogte ongeveer 45 cm)</li>
                <li>een krukje of opstapbankje van gemiddelde treehoogte</li>
                <li>een schoen of pantoffel</li>
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

            <p>Voor elk item wordt een aparte instructie gegeven.</p>

            <p>Demonstreer het item zo nodig één keer aan de patiënt en/of geef instructies zoals beschreven voor het betreffende onderdeel. De instructie moet beperkt blijven tot de opdracht. <strong>Bij twijfel moet de laagste score worden genoteerd</strong>.</p>

            <p><strong>Maak de patiënt duidelijk dat hij zijn evenwicht moet bewaren tijdens het uitvoeren van de opdracht en dat sommige opdrachten tijdgebonden zijn.</strong></p>

            <p>De keuze welk been voor gezet wordt, op welk been te gaan staan, de afstand tussen de voeten of hoe ver te reiken, wordt aan de patiënt overgelaten.</p>

            <p>Waar in de tekst gesproken wordt van <strong>supervisie</strong> wordt <strong>verbale ondersteuning</strong> bedoeld. De patiënt mag (kan) in dat geval de opdracht niet alleen uitvoeren; supervisie is vereist om de veiligheid te garanderen. Daar waar de patiënt gevraagd wordt om te gaan staan is het de bedoeling dat de patiënt een <strong>parallelstand</strong> inneemt.</p>

            <p>Het verdient de voorkeur de test af te nemen in een ruimte waar de patiënt voldoende ruimte heeft om voor zich uit te kijken.</p>

            <p>De onderzoeker moet proberen te <strong>vermijden in het voorwaartse gezichtsveld van de patiënt te gaan staan</strong>.</p>

            <p>Alle items worden uitgevoerd <strong>zonder loophulpmiddelen</strong>, maar <strong>met schoeisel</strong>. Een orthese of een sling is wel toegestaan.</p>
        </div>
    </div>
    <div class="col">
        <h2 class="display-2 fs-4">Opdrachten</h2>

        <table class="table table-borderless">
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">1. Van zit naar stand</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: stoel met armleuningen</div>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Zou u op willen staan? Probeert u hierbij niet met uw handen te steunen.</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_1" id="bbs.assignment_1" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft matig tot maximale ondersteuning nodig om tot stand te komen</option>
                            <option value="1">1 - De patiënt heeft minimale hulp nodig om tot stand te komen, dan wel om los stil te staan</option>
                            <option value="2">2 - De patiënt is na meerdere pogingen in staat om tot stand te komen met gebruikmaking van de handen</option>
                            <option value="3">3 - De patiënt is in staat om zelfstandig tot stand te komen met gebruikmaking van de hand(en)</option>
                            <option value="4">4 - De patiënt is in staat om tot stand te komen zonder op de handen te steunen en is vervolgens in staat om los stil te staan</option>
                        </select>
                        <label for="bbs.assignment_1">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">2. Zelfstandig staan</h3>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u 2 minuten blijven staan zonder u vast te houden?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_2" id="bbs.assignment_2" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt is niet in staat om 30 seconden zonder ondersteuning te blijven staan</option>
                            <option value="1">1 - De patiënt heeft meerdere pogingen nodig om 30 seconden zelfstandig te kunnen blijven staan</option>
                            <option value="2">2 - De patiënt is in staat om 30 seconden zelfstandig te staan</option>
                            <option value="3">3 - De patiënt is in staat om 2 minuten onder supervisie te blijven staan</option>
                            <option value="4">4 - De patiënt is in staat om 2 minuten zelfstandig en veilig te blijven staan</option>
                        </select>
                        <label for="bbs.assignment_2">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">3. Zelfstandig zitten</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: kruk/stoel/(behandel)bank en zo nodig een voetenbankje</div>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u 2 minuten blijven zitten met de armen over elkaar, zonder aan de rugsteun te leunen? </em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_3" id="bbs.assignment_3" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt is niet in staat om zonder steun 10 seconden te blijven zitten</option>
                            <option value="1">1 - De patiënt is in staat om 10 seconden te blijven zitten</option>
                            <option value="2">2 - De patiënt is in staat om 30 seconden te blijven zitten</option>
                            <option value="3">3 - De patiënt is in staat om 2 minuten onder supervisie te blijven zitten</option>
                            <option value="4">4 - De patiënt is in staat om 2 minuten veilig en stabiel te blijven zitten</option>
                        </select>
                        <label for="bbs.assignment_3">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">4. Van stand naar zit</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: stoel met armleuningen</div>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u gaan zitten?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_4" id="bbs.assignment_4" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft ondersteuning nodig om te gaan zitten</option>
                            <option value="1">1 - De patiënt is in staat om zelfstandig te gaan zitten, maar heeft geen gecontroleerde neergaande beweging</option>
                            <option value="2">2 - De patiënt gebruikt de achterkant van de onderbenen tegen de stoel om de neergaande beweging te controleren</option>
                            <option value="3">3 - De patiënt controleert de neergaande beweging door te steunen op de handen</option>
                            <option value="4">4 - De patiënt is in staat om veilig te gaan zitten door minimaal te steunen op de handen</option>
                        </select>
                        <label for="bbs.assignment_4">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">5. Transfers</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: 2 stoelen, één met en één zonder armleuningen. Zorg ervoor dat de stoelen klaar staan voor een draaiende transfer.</div>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Wilt u vanuit de stoel met armleuningen opstaan en in de stoel zonder armleuningen gaan zitten?</em> en <em>Kunt u nu weer op de andere stoel gaan zitten?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_5" id="bbs.assignment_5" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft ondersteuning nodig van 2 personen</option>
                            <option value="1">1 - De patiënt heeft ondersteuning nodig van 1 persoon</option>
                            <option value="2">2 - De patiënt is in staat om een transfer met verbale aanwijzingen en/of supervisie uit te voeren</option>
                            <option value="3">3 - De patiënt is in staat om een transfer veilig uit te voeren alleen met gebruik van de handen</option>
                            <option value="4">4 - De patiënt is in staat om de heen- en teruggaande transfer veilig uit te voeren door minimaal te steunen op de handen</option>
                        </select>
                        <label for="bbs.assignment_5">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">6. Zelfstandig staan met gesloten ogen</h3>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u uw ogen sluiten en 10 seconden stil blijven staan?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_6" id="bbs.assignment_6" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft hulp nodig om niet te vallen</option>
                            <option value="1">1 - De patiënt is in staat om stil te blijven staan, maar kan de ogen niet 3 seconden gesloten houden</option>
                            <option value="2">2 - De patiënt is in staat om 3 seconden te blijven staan</option>
                            <option value="3">3 - De patiënt is in staat om 10 seconden onder supervisie te blijven staan</option>
                            <option value="4">4 - De patiënt is in staat om 10 seconden veilig te blijven staan</option>
                        </select>
                        <label for="bbs.assignment_6">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">7. Zelfstandig staan met de voeten tegen elkaar</h3>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u uw voeten tegen elkaar aan zetten en 1 minuut los staan?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_7" id="bbs.assignment_7" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft hulp nodig om de voeten tegen elkaar aan te zetten en is niet in staat om 15 seconden te blijven staan</option>
                            <option value="1">1 - De patiënt heeft hulp nodig om de voeten tegen elkaar aan te zetten en is in staat om 15 seconden de voeten tegen elkaar te houden en te blijven staan</option>
                            <option value="2">2 - De patiënt is in staat om zelf de voeten tegen elkaar aan te zetten, maar is niet in staat om 30 seconden te blijven staan</option>
                            <option value="3">3 - De patiënt is in staat om zelf de voeten tegen elkaar aan te zetten en 1 minuut onder supervisie te blijven staan</option>
                            <option value="4">4 - De patiënt is in staat om zelf de voeten tegen elkaar aan te zetten en 1 minuut veilig te blijven staan</option>
                        </select>
                        <label for="bbs.assignment_7">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">8. Reiken naar voren met uitgestrekte armen in stand</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: meetlint of liniaal</div>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u uw voeten naast elkaar zetten en uw armen heffen tot 90º? Strek uw vingers uit en reik naar voren zo ver als u kunt.</em></div>
                    <div class="mb-2">(Keuze van de afstand tussen de voeten is aan de patiënt. De onderzoeker plaatst een meetlint op de muur of een liniaal aan het eind van de vingertoppen, wanneer de arm 90º opgetild is. De vingers mogen de liniaal of het meetlint op de muur niet raken bij het naar voren reiken. De vastgestelde meting is de afstand naar voren die de vingertoppen halen terwijl de patient in de meest voorovergebogen positie is. Vraag de patiënt, indien mogelijk, beide armen te gebruiken om naar voren te reiken om rotatie van de romp te vermijden.)</div>
                    <div class="form-floating">
                        <select name="bbs.assignment_8" id="bbs.assignment_8" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt verliest hierbij het evenwicht / heeft steun nodig van buitenaf</option>
                            <option value="1">1 - De patiënt reikt wel naar voren, maar heeft hierbij supervisie nodig</option>
                            <option value="2">2 - De patiënt is in staat om veilig &gt; 5 cm naar voren te reiken</option>
                            <option value="3">3 - De patiënt is in staat om veilig &gt; 12 cm naar voren te reiken</option>
                            <option value="4">4 - De patiënt is in staat om veilig &gt; 25 cm naar voren te reiken</option>
                        </select>
                        <label for="bbs.assignment_8">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">9. Oppakken van een voorwerp van de grond in stand</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: schoen of pantoffel</div>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u de schoen/pantoffel oppakken die voor uw voeten is gelegd?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_9" id="bbs.assignment_9" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt is niet in staat om te bukken / heeft ondersteuning nodig om veilig te bukken</option>
                            <option value="1">1 - De patiënt is niet in staat om de schoen/pantoffel op te pakken en heeft bij de poging supervisie nodig</option>
                            <option value="2">2 - De patiënt is niet in staat om de schoen/pantoffel op te pakken, maar komt wel tot 2-5 cm boven de schoen/pantoffel</option>
                            <option value="3">3 - De patiënt is in staat om de schoen/pantoffel onder supervisie op te pakken</option>
                            <option value="4">4 - De patiënt is in staat om de schoen/pantoffel veilig en met gemak op te pakken</option>
                        </select>
                        <label for="bbs.assignment_9">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">10. Draaien met het hoofd over de linker en rechter schouder om naar achteren te kijken in stand</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: willekeurig voorwerp</div>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u uw voeten naast elkaar zetten en uw hoofd over uw linker schouder draaien om recht naar achteren te kijken? Herhaal dit naar rechts.</em></div>
                    <div class="mb-2">(De onderzoeker mag een voorwerp recht achter de patiënt houden, om de draaibeweging te stimuleren).</div>
                    <div class="form-floating">
                        <select name="bbs.assignment_10" id="bbs.assignment_10" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft ondersteuning nodig om te blijven staan</option>
                            <option value="1">1 - De patiënt heeft supervisie nodig tijdens het draaien</option>
                            <option value="2">2 - De patiënt is bij geen van de draairichtingen in staat om volledig recht naar achteren te kijken, maar handhaaft wel het evenwicht</option>
                            <option value="3">3 - De patiënt is in staat om in 1 draairichting recht naar achteren te kijken, brengt bij de andere draairichting het gewicht minder goed over</option>
                            <option value="4">4 - De patiënt is in staat om in beide draairichtingen recht naar achteren te kijken en het gewicht goed over te brengen</option>
                        </select>
                        <label for="bbs.assignment_10">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">11. Volledig om de as draaien (360º) in stand</h3>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u volledig om uw as draaien?</em></div>
                    <div class="mb-1">(Laat de patiënt even pauzeren alvorens de volgende opdracht te geven).</div>
                    <div class="mb-2"><em>Kunt u nu de andere kant op draaien?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_11" id="bbs.assignment_11" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft ondersteuning nodig tijdens het draaien</option>
                            <option value="1">1 - De patiënt heeft van dichtbij supervisie nodig of verbale aanwijzingen</option>
                            <option value="2">2 - De patiënt is in staat om naar beide kanten veilig 360º te draaien, maar niet binnen 4 seconden</option>
                            <option value="3">3 - De patiënt is in staat om binnen 4 seconden veilig 360º te draaien alleen naar 1 kant toe</option>
                            <option value="4">4 - De patiënt is in staat om naar beide kanten veilig 360º te draaien binnen 4 seconden of minder</option>
                        </select>
                        <label for="bbs.assignment_11">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">12. Alternerend plaatsen van voet op krukje/opstapbankje in stand</h3>
                    <div class="mb-1"><strong>Materiaal</strong>: krukje of opstapbankje</div>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u uw voet op het krukje/opstapbankje plaatsen? Ga hiermee door totdat elke voet het krukje/ opstapbankje 4 keer heeft aangeraakt.</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_12" id="bbs.assignment_12" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt heeft ondersteuning nodig om niet te vallen / is niet in staat om de opdracht uit te voeren</option>
                            <option value="1">1 - De patiënt is in staat om met minimale ondersteuning meer dan 2 stappen te maken</option>
                            <option value="2">2 - De patiënt is in staat om zelfstandig 4 stappen te maken, maar heeft hierbij supervisie nodig</option>
                            <option value="3">3 - De patiënt is in staat om zelfstandig te staan en 8 stappen in meer dan 20 seconden te maken</option>
                            <option value="4">4 - De patiënt is in staat om zelfstandig en veilig te staan en 8 stappen in 20 seconden te maken</option>
                        </select>
                        <label for="bbs.assignment_12">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">13. Staan met één been voor</h3>
                    <div class="mb-1"><strong>Instructie</strong>: <em>Kunt u een voet direct voor de andere plaatsen? Als u voelt dat u uw voet niet precies voor de andere voet kan zetten, probeert u dan uw voet zo neer te zetten dat de hiel van uw voorste voet voorbij de tenen van uw andere voet komt.</em></div>
                    <div class="mb-2">(Om 3 punten te scoren, moet de lengte van de pas van de ene voet de lengte van de andere voet overschrijden en de breedte van deze houding moet de normale pas van de patiënt benaderen. De patiënt mag zelf kiezen welk been hij voor zet).</div>
                    <div class="form-floating">
                        <select name="bbs.assignment_13" id="bbs.assignment_13" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt verliest het evenwicht bij het staan / is niet in staat een stap te maken</option>
                            <option value="1">1 - De patiënt heeft hulp nodig om een stap te zetten, maar kan deze positie wel gedurende 15 seconden handhaven</option>
                            <option value="2">2 - De patiënt is in staat om zelfstandig een kleine stap te zetten en deze positie gedurende 30 seconden te handhaven</option>
                            <option value="3">3 - De patiënt is in staat om de voet zelfstandig voor de andere te plaatsen en deze positie gedurende 30 seconden te handhaven</option>
                            <option value="4">4 - De patiënt is in staat om de voet zelfstandig in het verlengde van de andere te plaatsen en deze positie gedurende 30 seconden te handhaven</option>
                        </select>
                        <label for="bbs.assignment_13">Score:</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="pb-4">
                    <h3 class="display-3 fs-5">14. Staan op één been</h3>
                    <div class="mb-2"><strong>Instructie</strong>: <em>Kunt u zo lang mogelijk op 1 been staan zonder te steunen?</em></div>
                    <div class="form-floating">
                        <select name="bbs.assignment_14" id="bbs.assignment_14" class="form-select">
                            <option disabled value=null>- Kies één optie -</option>
                            <option value="0">0 - De patiënt is niet in staat een poging te ondernemen / heeft hulp nodig om te blijven staan</option>
                            <option value="1">1 - De patiënt probeert het been op te tillen, maar is niet in staat deze positie 3 seconden te handhaven, maar blijft wel zelfstandig staan</option>
                            <option value="2">2 - De patiënt is in staat om het been zelfstandig op te tillen en deze positie minimaal 3 seconden te handhaven</option>
                            <option value="3">3 - De patiënt is in staat om het been zelfstandig op te tillen en deze positie tussen de 5-10 seconden te handhaven</option>
                            <option value="4">4 - De patiënt is in staat om het been zelfstandig op te tillen en deze positie &gt; 10 seconden te handhaven</option>
                        </select>
                        <label for="bbs.assignment_14">Score:</label>
                    </div>
                </td>
            </tr>
        </div>
    </div>
</div>
        `.trim();
    },
    onStateChange: (state) => {
    }
});