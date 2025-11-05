import { Router } from "express"
import { getProcesses, adminProcesses } from "../controllers/process.controller.js"

const router = Router()

router.get("/process", getProcesses)
router.post("/process/admin", adminProcesses)
export default router
