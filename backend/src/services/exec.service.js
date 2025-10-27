import { spawn } from 'child_process'
import { ALLOWED_COMMANDS } from '../utils/commandWhitelist.js'

export async function runCommandSafe(commandKey) {
  const command = ALLOWED_COMMANDS[commandKey]
  if (!command) {
    throw new Error('Comando no permitido')
  }

  return new Promise((resolve, reject) => {
    const child = spawn('sudo',[command.cmd, command.args], { shell: true })

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
