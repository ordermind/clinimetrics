import AbstractListPage from "./AbstractListPage.js";

export default class TestsListPage extends AbstractListPage {
    constructor({arrTests}) {
        super({slug: "tests", title: "Tests", items: arrTests});
    }

    getFilters() {
        return [
            {
                type: "textInput",
                name: "fullName",
                label: "Naam test",
                event: "keyup",
                minCharacters: 3,
            },
            {
                type: "textInput",
                name: "tags",
                label: "Tags",
                event: "keyup",
                minCharacters: 3,
            }
        ];
    }

    createHeaderRow() {
        return `
<tr class="d-none d-lg-table-row">
    <th>Naam test</th>
    <th>Omschrijving</th>
</tr>
        `.trim();
    }

    createDataRow(test) {
        return `
<tr>
    <td>[Link type="Test" targetId="${test.id}" label="${test.fullName}"]</td>
    <td class="d-none d-lg-table-cell">${test.description}</td>
</tr>
        `.trim();
    }

    mount() {
        super.mount();
    }

    render() {
        super.render();
    }

    postRender() {
        super.postRender();
    }

    unmount() {
        super.unmount();
    }
}
