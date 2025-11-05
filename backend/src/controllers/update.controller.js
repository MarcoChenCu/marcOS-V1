import si from "systeminformation"
import { runCommandSafe } from '../services/updateExec.service.js'

export const getUpdates = async (req, res) => {
  try {
    const output = await runCommandSafe('list')
    res.json({ success: true, message: 'Operación realizada con éxito.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', output: error.message })
  }
}

export const updateRepo = async (req, res) => {
  try {
    const output = await runCommandSafe('update')
    res.json({ success: true, message: 'Lista de repositorios actualizada.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', output: error.message })
  }
}


export const upgradeSystem = async (req, res) => {
  try {
    const output = await runCommandSafe('upgrade')
    res.json({ success: true, message: 'Sistema actualizado exitosamente.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', output: error.message })
  }
}