import si from "systeminformation"
import { runCommandSafe } from '../services/appExec.service.js'

export const getUpdates = async (req, res) => {
  try {
    const output = await runCommandSafe('list')
    res.json({ success: true, message: 'Operación realizada con éxito.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', output: error.message })
  }
}

export const installApp = async (req, res) => {
  try {
    const {appName} = req.body;
    if(!appName) {
      return res.status(400).json({ success: false, message: 'El nombre de la aplicación es requerido.', output: 'Nombre de aplicación inválido.' })
    }
    const output = await runCommandSafe('install', [appName, '-y'])
    res.json({ success: true, message: 'Aplicación instalada correctamente.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar instalar la aplicación.', output: error.message })
  }
}
