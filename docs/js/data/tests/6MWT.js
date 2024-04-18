import Test from "../../data-types/Test.js";

export default new Test({
    id: "6mwt",
    shortName: "6MWT",
    longName: "6 minuten wandeltest",
    getformContentHTML: () => {
        return `
<div class="pre-measurements">
    <h2 class="display-2 fs-4">Vooraf meten</h2>
    <table class="table table-borderless maxwidth-400">
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
                    <input type="text" name="general.weight_kg" id="general.weight_kg" class="form-control" min="0" /><span class="ps-2">kg</span>
                </div>
            </td>
        </tr>
    </table>
</div>
        `;
    }
});