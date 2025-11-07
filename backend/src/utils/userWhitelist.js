// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'list': {
    cmd: 'getent',
    args: ['passwd'],
    description: 'Listar usuarios del sistema',
    allowParams: false
  },

  //Crear usuario
  'create-user': {
    cmd: 'sudo',
    args: ['useradd', '-m', '-c'],
    description: 'Crear un nuevo usuario',
    allowParams: true
  },
  'set-password': {
    cmd: 'sudo',
    args: ['echo'],
    description: 'Establecer la contraseña de un usuario',
    allowParams: true
  },
}

