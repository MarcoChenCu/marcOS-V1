// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'update': {
    cmd: 'sudo',
    args: ['apt-get', 'update'],
    description: 'Actualizar repositorios del sistema',
    allowParams: false
  },
  'upgrade': {
    cmd: 'sudo',
    args: ['apt-get', 'upgrade', '-y'],
    description: 'Actualizar el sistema',
    allowParams: false
  },

  //lista actualizaciones disponibles
  'list': {
    cmd: 'sudo',
    args: ['apt','list', '--upgradeable'],
    description: 'Listar actualizaciones disponibles',
    allowParams: false
  }
}

