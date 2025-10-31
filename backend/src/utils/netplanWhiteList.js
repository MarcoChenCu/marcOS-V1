// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {

  'read-netplan': {
    cmd: 'sudo',
    args: ['cat'],
    allowParams: true
  },
  
  "netplan-save": {
    cmd: 'sudo',
    args: ['mv'], 
    allowParams: true 
  },

  "netplan-apply": {
    cmd: 'sudo',
    args: ['netplan', 'apply'], 
    allowParams: false
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

