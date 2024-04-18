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
            }
        ];
    }

    createHeaderRow() {
        return `

        `.trim();
    }

    createDataRow(test) {
        return `
<tr>
    <td>[Link type="Test" targetId="${test.id}" label="${test.fullName}"]</td>
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
