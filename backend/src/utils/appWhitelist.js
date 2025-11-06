// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'install': {
    cmd: 'sudo',
    args: ['apt', 'install'],
    description: 'Actualizar repositorios del sistema',
    allowParams: true
  }
}

