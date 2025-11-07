import { Router } from "express"
import { getUsers, createUser } from "../controllers/user.controller.js"

const router = Router()

router.get("/users/list", getUsers)
router.post("/users/create", createUser)

export default router
