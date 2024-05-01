import Test from "../../data-types/Test.js";

const description = `De Trunk Impairment Scale test evalueert het <strong>statisch en dynamisch evenwicht van het zitten</strong>. Doelgroep: patiënten met hersenaandoening, cerebral palsy, MS, Parkinson en CVA.`.trim();

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

            <p>Uitgangspositie: De patiënt zit op de rand van een behandelbank zonder arm- en rugondersteuning. De bovenbenen maken volledig contact met de behandelbank. De voeten worden op heupbreedte en plat op de grond geplaatst. De kniehoek is 90 graden. De armen rusten op de benen. Indien een verhoogde tonus in de paretische arm aanwezig is, wordt de positie van deze arm als uitgangshouding genoteerd. Hoofd en romp zijn in middenpositie.</p>

            <p>Elk test-item mag <strong>3 keer</strong> afgenomen worden. De patiënt mag tussen de pogingen door gecorrigeerd worden. De <strong>hoogste score</strong> wordt genoteerd. De test-items worden verbaal aan de patiënt uitgelegd en kunnen, indien nodig, worden voorgedaan door de testafnemer. Oefening van een test-item voorafgaand aan de test wordt echter niet toegestaan.</p>
        </div>
    </div>
</div>
        `.trim();
    },
    onStateChange: (newState) => {
    }
});