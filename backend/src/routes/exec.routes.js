import express from 'express'
import { executeCommand } from '../controllers/exec.controller.js'

const router = express.Router()

// POST /api/exec
router.post('/exec', executeCommand)

export default router
