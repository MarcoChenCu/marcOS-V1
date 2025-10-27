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

