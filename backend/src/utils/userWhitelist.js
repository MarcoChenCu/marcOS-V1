// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'list': {
    cmd: 'getent',
    args: ['passwd'],
    description: 'Listar usuarios del sistema',
    allowParams: false
  },

    // Crear usuario: sudo useradd -m -c "Nombre Completo" -s /bin/bash usuario
  'create-user': {
    cmd: 'sudo',
    args: ['useradd', '-m', '-c'],
    description: 'Crear un nuevo usuario del sistema',
    allowParams: true
  },

  // Cambiar contraseña: echo "usuario:contraseña" | sudo chpasswd
  'set-password': {
    cmd: 'sudo',
    args: ['chpasswd'],
    description: 'Establecer la contraseña de un usuario del sistema',
    allowParams: true
  },

  // Eliminar usuario del sistema con su directorio home
  'delete-user': {
    cmd: 'sudo',
    args: ['userdel', '-r'],
    description: 'Eliminar un usuario del sistema junto con su directorio home',
    allowParams: true
  },

    // Verificar si un usuario existe en el sistema
  'check-user': {
    cmd: 'getent',
    args: ['passwd'],
    description: 'Verifica si un usuario existe en el sistema',
    allowParams: true
  },

}

