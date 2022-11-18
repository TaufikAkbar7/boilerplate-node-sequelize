const { Router } = require("express");
const glob = require("glob");

const router = Router();

glob.sync("**/services/**/router.js").forEach(async (routeFile) => {
    const newRoute = routeFile.split("src").join(".");
    const routeModule = await import(newRoute);
    router.use(routeModule.default);
});

module.exports = router;
