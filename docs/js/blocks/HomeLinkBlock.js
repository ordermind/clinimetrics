export default class HomeLinkBlock {
    getElement() {
        const html = `
        <div class="form-control-wrapper | block-home-link">
            <a class="nav-link fs-4" href="/tests" data-navigo>🏠</a>
        </div>`.trim();

        const template = document.createElement("template");
        template.innerHTML = html;

        const children = template.content.children;

        return children[0];
    }

    cleanUp() {}
}
