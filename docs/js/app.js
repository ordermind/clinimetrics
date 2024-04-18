import { router } from "./router.js";

if(router.getCurrentLocation().url === "") {
    router.navigate("/tests");
} else {
    router.resolve();
}
