import express from 'express'
import { executeCommand } from '../controllers/exec.controller.js'
import { executeUFWCommand, allowUFW, allowDeleteUFW} from '../controllers/execFirewall.controller.js'
import { getNetplanFile, saveNetplanFile, applyNetplanFile } from '../controllers/execNetplan.controller.js'
const router = express.Router()

// Endpoint firewall
//router.post('/exec', executeCommand)
router.post('/exec/ufw', executeUFWCommand)
router.post('/exec/ufw/allow', allowUFW)
router.post('/exec/ufw/allow-delete', allowDeleteUFW)

//Endpoint netplan
router.get('/exec/netplan',getNetplanFile)
router.post('/exec/netplan/save', saveNetplanFile)
router.post('/exec/netplan/apply', applyNetplanFile)
export default router
 