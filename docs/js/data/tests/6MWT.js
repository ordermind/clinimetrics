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
            <td><input type="text" name="general.age" id="general.age" class="form-control" /></td>
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
            <td><label for="general.height" class="form-label">Lengte:</label></td>
            <td><input type="text" name="general.height" id="general.height" class="form-control" /></td>
        </tr>
        <tr>
            <td><label for="general.weight" class="form-label">Gewicht:</label></td>
            <td><input type="text" name="general.weight" id="general.weight" class="form-control" /></td>
        </tr>
    </table>
</div>
        `;
    }
});