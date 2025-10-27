// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'ufw-disable': {
    cmd: 'sudo',
    args: ['ufw', 'disable'],
    description: 'Desactiva el firewall UFW'
  },
  'ufw-enable': {
    cmd: 'sudo',
    args: ['ufw', 'enable'],
    description: 'Activa el firewall UFW'
  },
}
