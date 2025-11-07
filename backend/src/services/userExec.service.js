import { spawn } from 'child_process'
import { ALLOWED_COMMANDS } from '../utils/userWhitelist.js'

export async function runCommandSafe(commandKey, extraArgs = [], stdinInput = null) {
  const command = ALLOWED_COMMANDS[commandKey]
  if (!command) throw new Error(`Comando no permitido: ${commandKey}`)

  if (extraArgs.length > 0 && !command.allowParams)
    throw new Error('Este comando no acepta parámetros')

  // Validar caracteres potencialmente peligrosos
  const sanitizedArgs = extraArgs.map(arg => {
    if (/[|;&<>`$]/.test(arg)) throw new Error(`Argumento peligroso: ${arg}`)
    return arg
  })

  const args = [...command.args, ...sanitizedArgs]

  return new Promise((resolve, reject) => {
    const child = spawn(command.cmd, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: false
    })

    let output = ''
    let error = ''

    // Si se proporciona entrada estándar (stdin), enviarla al proceso
    if (stdinInput) {
      child.stdin.write(stdinInput)
      child.stdin.end()
    }

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
