import Navigo from "../vendor/navigo/js/navigo.min.js";
import { addNewTabClickEventListeners, removeNewTabClickEventListeners } from "./new-tab-click.js";
import { routes } from "./routes.js";

export const router = new Navigo("/", { hash: true });

router.hooks({
    after(match) {
        addNewTabClickEventListeners();
    },
    leave(done, match) {
        removeNewTabClickEventListeners();

        done();
    },
});

for(const [routeName, route] of Object.entries(routes)) {
    for(const [index, path] of route.paths.entries()) {
        const multiplePathRouteName = route.paths.length > 1 ? routeName + index : routeName;
        router.on({
            [path]: {
                as: multiplePathRouteName,
                uses: route.responseHandler,
                hooks: {leave: route.onLeaveHandler},
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