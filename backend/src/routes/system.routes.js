import { Router } from "express"
import { getSystemInfo } from "../controllers/system.controller.js"

const router = Router()

router.get("/system", getSystemInfo)

export default router
