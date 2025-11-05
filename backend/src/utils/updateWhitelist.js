// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'update': {
    cmd: 'sudo',
    args: ['apt', 'update'],
    description: 'Actualizar repositorios del sistema',
    allowParams: false
  },
  'upgrade': {
    cmd: 'sudo',
    args: ['apt', 'upgrade', '-y'],
    description: 'Actualizar el sistema',
    allowParams: false
  },

  //lista actualizaciones disponibles
  'list': {
    cmd: 'sudo',
    args: ['apt','list', '--upgradable'],
    description: 'Listar actualizaciones disponibles',
    allowParams: false
  }
}

