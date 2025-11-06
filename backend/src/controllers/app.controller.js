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

export const appInstalled = async (req, res) => {
  try {
    const {appName} = req.body;
    if(!appName) {
      return res.status(400).json({ success: false, message: 'El nombre de la aplicación es requerido.', output: 'Nombre de aplicación inválido.' })
    }
    const output = await runCommandSafe('installed-dpkg', [appName])    
    res.json({ success: true, message: 'Aplicación instalada.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar verificar la instalación de la aplicación.', output: error.message })
  }
}


export const uninstallApp = async (req, res) => {
  try {
    const {appName} = req.body;
    if(!appName) {
      return res.status(400).json({ success: false, message: 'El nombre de la aplicación es requerido.', output: 'Nombre de aplicación inválido.' })
    }
    const output = await runCommandSafe('uninstall', [appName, '-y'])
    res.json({ success: true, message: 'Aplicación desinstalada correctamente.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar desinstalar la aplicación.', output: error.message })
  }
}


