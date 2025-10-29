// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'ufw-disable': {
    cmd: 'sudo',
    args: ['ufw', 'disable'],
    description: 'Desactiva el firewall UFW',
    allowParams: false
  },
  'ufw-enable': {
    cmd: 'sudo',
    args: ['ufw', 'enable'],
    description: 'Activa el firewall UFW',
    allowParams: false
  },
  'ufw-status': {
    cmd: 'sudo',
    args: ['LANG=C', 'ufw', 'status'],
    description: 'Obtener el estado del firewall UFW',
    allowParams: false
  },
  'ufw-status-verbose': {
    cmd: 'sudo',
    args: ['LANG=C', 'ufw', 'status', 'verbose'],
    description: 'Obtener el estado detallado del firewall UFW',
    allowParams: false
  },
  'ufw-allow': {
    cmd: 'sudo',
    args: ['ufw', 'allow'],
    description: 'Permite el tráfico en un puerto o servicio.',
    allowParams: true // Permitir argumentos adicionales
  },
  'ufw-delete-allow': {
    cmd: 'sudo',
    args: ['ufw', 'delete', 'allow'],
    description: 'Eliminar regla del firewall.',
    allowParams: true // Permitir argumentos adicionales
  },
}

