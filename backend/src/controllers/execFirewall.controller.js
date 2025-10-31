import { runCommandSafe } from '../services/firewallExec.service.js'

export async function executeUFWCommand(req, res) {
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

export async function allowUFW(req, res){
  const { service } = req.body
  if (!service || typeof service !== 'string') {
    return res.status(400).json({ success: false, message: 'Parámetro incorrecto', output: 'Servicio o puerto inválido' })
  }

  try {
    const output = await runCommandSafe('ufw-allow', [service])
    res.json({ success: true, message: 'Regla agregada correctamente', output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar agregar la regla', output: error.message })
  }
}

export async function allowDeleteUFW(req, res){
  const { service } = req.body

  if (!service || typeof service !== 'string') {
    return res.status(400).json({ success: false, message: 'Parámetro incorrecto', output: 'Servicio o puerto inválido' })
  }

  try {
    const output = await runCommandSafe('ufw-delete-allow', [service])
    res.json({ success: true, message: 'Regla eliminada correctamente', output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar eliminar la regla', output: error.message })
  }
}

