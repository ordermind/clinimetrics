import Test from "../../data-types/Test.js";

export default new Test({
    id: "6mwt",
    shortName: "6MWT",
    longName: "6 minuten wandeltest",
    getformContentHTML: () => {
        return `
<div class="personal-info">
    <h2 class="display-2 fs-4">Persoonlijke gegevens</h2>
    <table class="table table-borderless maxwidth-400">
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
    <h2 class="display-2 fs-4">Vooraf meten</h2>
    <table class="table table-borderless maxwidth-400">
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
            <td><label for="general.heart_rate" class="form-label">Hartfrequentie:</label></td>
            <td>
                <div class="d-flex align-items-center">
                    <input type="number" name="general.heart_rate" id="general.heart_rate" class="form-control" min="0" /><span class="ps-2">bpm</span>
                </div>
            </td>
        </tr>
        <tr>
            <td><label for="general.oxygen_saturation" class="form-label">Zuurstofsaturatie:</label></td>
            <td>
                <div class="d-flex align-items-center">
                    <input type="number" name="general.oxygen_saturation" id="general.oxygen_saturation" class="form-control" min="0" max="100" /><span class="ps-2">%</span>
                </div>
            </td>
        </tr>
        <tr>
            <td><label for="general.blood_pressure_systolic" class="form-label">Bloeddruk:</label></td>
            <td>
                <div class="d-flex align-items-center">
                    <input type="number" name="general.blood_pressure_systolic" id="general.blood_pressure_systolic" class="form-control" min="0" /><span class="ps-2 pe-2">/</span><input type="number" name="general.blood_pressure_diastolic" id="general.blood_pressure_diastolic" class="form-control" min="0" /><span class="ps-2">mmHg</span>
                </div>
            </td>
        </tr>
        <tr>
            <td><label for="6mwt.borg_dyspnoea" class="form-label"><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">BORG kortademigheid:</label></td>
            <td>
                <div class="d-flex align-items-center">
                    <input type="number" name="6mwt.borg_dyspnoea" id="6mwt.borg_dyspnoea" class="form-control" min="0" max="10" />
                </div>
            </td>
        </tr>
        <tr>
            <td><label for="6mwt.borg_fatigue" class="form-label"><a href="https://meetinstrumentenzorg.nl/wp-content/uploads/instrumenten/Borg-0-10-meetinstr.pdf">BORG vermoeidheid:</label></td>
            <td>
                <div class="d-flex align-items-center">
                    <input type="number" name="6mwt.borg_fatigue" id="6mwt.borg_fatigue" class="form-control" min="0" max="10" />
                </div>
            </td>
        </tr>
    </table>
</div>



<div class="execution">
    <h2 class="display-2 fs-4">Uitvoering</h2>
</div>
        `;
    }
});