import router from "../vendor/page.js/js/page.mjs";
import { addNewTabClickEventListeners } from "./new-tab-click.js";
import { routes } from "./routes.js";

addNewTabClickEventListeners();

let currentPage = null;

router.getCurrentLocation = function() {
    const rawPath = window.location.hash.match(/^#!(\/.+)/)?.[1] ?? null;
    const path = window.location.hash.match(/^#!(\/[^?]+)/)?.[1] ?? null;
    const queryString = window.location.hash.match(/\?(.+)/)?.[1] ?? null;

    return {
        rawPath,
        path,
        queryString,
    };
}

router.start({
    hashbang: true,
    dispatch: false,
});

router.exit(function(ctx, next) {
    currentPage.unmount();
    currentPage = null;

    next();
});

for(const [routeName, route] of Object.entries(routes)) {
    for(const [index, path] of route.paths.entries()) {
        router(
            path,
            (ctx, next) => {
                currentPage = route.createPage(ctx.params);

                next();
            },
            () => {
                currentPage.mount();
                currentPage.render();
                currentPage.postRender();
            }
        );
    }
}

export default router;