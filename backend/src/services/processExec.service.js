// backend/src/services/exec.service.js
import { spawn } from 'child_process'
import { ALLOWED_COMMANDS } from '../utils/processWhitelist.js'

export async function runCommandSafe(commandKey, extraArgs = []) {
  const command = ALLOWED_COMMANDS[commandKey]
  if (!command) {
    console.log(commandKey)
    throw new Error('Comando no permitido')
  }

  // Validar si este comando admite parámetros
  if (extraArgs.length > 0 && !command.allowParams) {
    throw new Error('Este comando no acepta parámetros')
  }

  // Sanitizar parámetros: solo letras, números, guiones y puntos (evitar inyección)
  const sanitizedArgs = extraArgs.filter(arg => /^[a-zA-Z0-9\-_.]+$/.test(arg))

  // Combinar todos los argumentos
  const args = [command.cmd, ...command.args, ...sanitizedArgs]

  return new Promise((resolve, reject) => {
    const child = spawn('sudo', args, { shell: true })

    let output = ''
    let error = ''

    child.stdout.on('data', data => {
      output += data.toString()      
    })

    child.stderr.on('data', data => {
      error += data.toString()
    })

    child.on('close', code => {
      if (code === 0) resolve(output.trim())
      else reject(new Error(error.trim() || 'Error desconocido'))
    })
  })
}
