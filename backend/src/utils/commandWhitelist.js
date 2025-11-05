// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'ufw-disable': {
    cmd: 'sudo',
    args: ['ufw', 'disable'],
    description: 'Desactiva el firewall UFW',
    allowParams: false
  },
  'restart': {
    cmd: 'sudo',
    args: ['shutdown', '-r', '+1', "'Reincio desde marcOS'"],
    description: 'reiniciar el sistema con 1 minuto de retraso.',
    allowParams: false // Permitir argumentos adicionales
  },

  'poweroff': {
    cmd: 'sudo',
    args: ['shutdown', '+1', "'apagado desde marcOS'"],
    description: 'Apagar el sistema con 1 minuto de retraso.',
    allowParams: false // Permitir argumentos adicionales
  },

  'cancel-power': {
    cmd: 'sudo',
    args: ['shutdown', '-c'],
    description: 'Detener accion programada.',
    allowParams: false // Permitir argumentos adicionales
  },
}

