import { router } from "./router.js";

if(["", "clinimetrics"].includes(router.getCurrentLocation().url)) {
    router.navigate("/tests");
} else {
    router.resolve();
}
