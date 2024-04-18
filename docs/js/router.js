import Navigo from "../vendor/navigo/js/navigo.min.js";
import { addNewTabClickEventListeners, removeNewTabClickEventListeners } from "./new-tab-click.js";
import { routes } from "./routes.js";

export const router = new Navigo("/", { hash: true });

let currentPage = null;

router.hooks({
    after() {
        addNewTabClickEventListeners();
    },
    leave(done) {
        removeNewTabClickEventListeners();
        currentPage.unmount();
        currentPage = null;

        done();
    },
});

for(const [routeName, route] of Object.entries(routes)) {
    for(const [index, path] of route.paths.entries()) {
        const multiplePathRouteName = route.paths.length > 1 ? routeName + index : routeName;
        router.on({
            [path]: {
                as: multiplePathRouteName,
                uses: () => {
                    currentPage.mount();
                    currentPage.render();
                    currentPage.postRender();
                },
                hooks: {before: (done, match) => {
                    currentPage = route.createPage(match);

                    done();
                }},
            },
        });
    }
}

export function addLinkEventListeners() {
    router.updatePageLinks();
    addNewTabClickEventListeners();
}

export function cleanUpLinkEventListeners() {
    router.cleanUpEventListeners();
    removeNewTabClickEventListeners();
}