import express from 'express'
import { executeCommand } from '../controllers/exec.controller.js'
import { executeUFWCommand, allowUFW, allowDeleteUFW} from '../controllers/execFirewall.controller.js'

const router = express.Router()

// POST /api/exec
router.post('/exec', executeCommand)
router.post('/exec/ufw', executeUFWCommand)
router.post('/exec/ufw/allow', allowUFW)
router.post('/exec/ufw/allow-delete', allowDeleteUFW)

export default router
 