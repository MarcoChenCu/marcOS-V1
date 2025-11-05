// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {

  'read-log': {
    cmd: 'cat',
    args: [],
    allowParams: true
  },

  'netplan-permission':{
    cmd: 'sudo',
    args: ['chmod','600'],
    allowParams: true
  }

  /*
  'ufw-delete-allow': {
    cmd: 'sudo',
    args: ['ufw', 'delete', 'allow'],
    description: 'Eliminar regla del firewall.',
    allowParams: true // Permitir argumentos adicionales
  },
  */
}

