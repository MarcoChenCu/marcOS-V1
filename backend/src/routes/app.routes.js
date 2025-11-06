import { Router } from "express"
import { installApp } from "../controllers/app.controller.js"

const router = Router()

//router.get("/updates/update-list", getUpdates)
router.post("/apps/install", installApp)

export default router
