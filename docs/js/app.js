import router from "./router.js";

const currentLocation = router.getCurrentLocation();
if([null, "clinimetrics"].includes(router.getCurrentLocation().path)) {
    router.redirect("/tests");
} else {
    router.redirect(currentLocation.rawPath);
}
