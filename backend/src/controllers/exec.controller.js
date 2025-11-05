import { runCommandSafe } from '../services/exec.service.js'

export async function executeCommand(req, res) {
  try {
    const { command } = req.body

    if (!command) {
      return res.status(400).json({ error: 'Debe especificar un comando válido.' })
    }

    const result = await runCommandSafe(command)

    res.json({
      success: true,
      message: `Comando '${command}' ejecutado correctamente.`,
      output: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al ejecutar el comando.',
      error: error.message,
    })
  }
}

//Reiniciar 
export async function executeReboot(req, res) {
  try {
    const result = await runCommandSafe('restart')    
    res.json({
      success: true,
      message: `Reinicio programado correctamente.`,
      output: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al ejecutar el comando.',
      output: error.message,
    })
  }
}

//Poweroff
export async function executePoweroff(req, res) {
  try {
    const result = await runCommandSafe('poweroff')
    res.json({
      success: true,
      message: `Apagado programado correctamente.`,
      output: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al ejecutar el comando.',
      output: error.message,
    })
  }
}

//Cancel Poweroff
export async function executeCancelPoweroff(req, res) {
  try {
    const result = await runCommandSafe('cancel-power')
    res.json({
      success: true,
      message: `Accion cancelada exitosamente.`,
      output: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al ejecutar el comando.',
      output: error.message,
    })
  }
}

