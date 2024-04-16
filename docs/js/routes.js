import Route from "./data-types/Route.js";
import { renderPage } from "./renderer.js";

import TestsListPage from "./pages/TestsListPage.js";
import TestPage from "./pages/TestPage.js";
import { arrTests, objTests } from "./data/tests.js";

export const routes = {
    // The home route has two paths to accommodate both local dev environment and Github Pages hosting.
    home: new Route(
        {
            paths: ["/", "/clinimetrics/"],
            responseHandler: (self) => {
                self.page = new TestsListPage({arrTests});

                self.page.mount();
                const content = self.page.getRenderData();
                renderPage(content);
                window.scrollTo(0, 0);
            },
            onLeaveHandler: (self, done) => {
                self.page.unmount();

                done();
            }
        }
    ),
    testPage: new Route(
        {
            paths: ["/tests/:id"],
            responseHandler: (self, { data }) => {
                self.page = new TestPage(objTests[data.id]);

                self.page.mount();
                const content = self.page.getRenderData();
                renderPage(content);
                window.scrollTo(0, 0);
            },
            onLeaveHandler: (self, done) => {
                self.page.unmount();

                done();
            }
        }
    ),
};
