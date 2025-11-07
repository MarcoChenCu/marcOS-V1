import { Router } from "express"
import { getUsers, createUser, deleteUser } from "../controllers/user.controller.js"

const router = Router()

router.get("/users/list", getUsers)
router.post("/users/create", createUser)
router.delete("/users/delete", deleteUser)


export default router
