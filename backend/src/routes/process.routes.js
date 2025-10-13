import { Router } from "express"
import { getProcesses } from "../controllers/process.controller.js"

const router = Router()

router.get("/process", getProcesses)

export default router
