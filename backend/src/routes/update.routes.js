import { Router } from "express"
import { getUpdates, updateRepo, upgradeSystem } from "../controllers/update.controller.js"

const router = Router()

router.get("/updates/update-list", getUpdates)
router.post("/updates/update", updateRepo)
router.post("/updates/upgrade", upgradeSystem)
export default router
