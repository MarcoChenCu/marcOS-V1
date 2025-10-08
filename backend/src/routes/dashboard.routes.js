import { Router } from "express"
import { verifyToken, dashboard } from "../controllers/dashboard.controller.js"

const router = Router()

router.get("/dashboard", verifyToken, dashboard)

export default router
