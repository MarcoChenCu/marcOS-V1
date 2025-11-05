// backend/src/controllers/logs.controller.js

import { runCommandSafe } from '../services/logsExec.service.js'
import fs from 'fs/promises'

const LOG_PATH = '/var/log/'

export async function getLogFile(req, res) {
  try {
    const { filename } = req.body
    const fullPath = LOG_PATH + filename

    try {
      // Verificar si el archivo existe antes de intentar leerlo
      await fs.access(fullPath)
    } catch {
      // Si no existe, devolver cadena vacía y un estado "warning"
      return res.json({
        success: true,
        output: "",
        warning: true,
        message: `El archivo ${filename} no existe.`,
      })
    }

    // Si existe, leerlo normalmente con el comando permitido
    const output = await runCommandSafe('read-log', [fullPath])

    res.json({
      success: true,
      output: output,
      warning: false,
      message: `Archivo ${filename} leído correctamente.`,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      output: error.message,
      warning: false,
      message: `Error al leer el archivo ${req.body.filename}: ${error.message}`,
    })
  }
}



