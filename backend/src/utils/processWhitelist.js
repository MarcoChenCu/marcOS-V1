// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'kill': {
    cmd: 'sudo',
    args: ['kill'],
    description: 'Detener/reiniciar proceso',
    allowParams: true
  }
}

