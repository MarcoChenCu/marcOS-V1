// backend/src/utils/commandWhitelist.js
export const ALLOWED_COMMANDS = {
  'install': {
    cmd: 'sudo',
    args: ['apt-get', 'install'],
    description: 'Instalar una aplicación usando apt',
    allowParams: true
  },

  'uninstall': {
    cmd: 'sudo',
    args: ['apt-get', 'remove'],
    description: 'Desinstalar una aplicación usando apt',
    allowParams: true
  },

  'installed-which': {
    cmd: 'which',
    args: [],
    description: 'Ruta de instalación de apt',
    allowParams: true
  },
  //dpkg -l | grep mysql-server
  'installed-dpkg': {
    cmd: 'dpkg',
    args: ['-l','|','grep'],
    description: 'Verificar si una aplicación está instalada usando dpkg',
    allowParams: true
  }
}

