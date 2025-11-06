import { Router } from "express"
import { installApp, uninstallApp,appInstalled } from "../controllers/app.controller.js"

const router = Router()

//router.get("/updates/update-list", getUpdates)
router.post("/apps/install", installApp);
router.post("/apps/uninstall", uninstallApp);
router.post("/apps/installed", appInstalled);


export default router
