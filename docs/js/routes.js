import Route from "./data-types/Route.js";

import TestsListPage from "./pages/TestsListPage.js";
import TestPage from "./pages/TestPage.js";
import { arrTests, objTests } from "./data/tests.js";

export const routes = {
    // The home route has multiple paths to accommodate both local dev environment and Github Pages hosting.
    home: new Route(
        {
            paths: ["/tests/"],
            createPage: () => {
                return new TestsListPage({arrTests});
            }
        }
    ),
    testPage: new Route(
        {
            paths: ["/tests/:id"],
            createPage: ({ id }) => {
                return new TestPage({test: objTests[id]});
            }
        }
    ),
};
