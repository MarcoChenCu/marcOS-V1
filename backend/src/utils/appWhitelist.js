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
  },
  //systemctl is-active mariadb
  'systemctl': {
    cmd: 'systemctl',
    args: ['is-active'],
    description: 'Verificar si una aplicación está instalada usando systemctl',
    allowParams: true
  },

  /**
   * Add this commands to install Node.js via nvm
    # Download and install nvm:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

    # in lieu of restarting the shell
    \. "$HOME/.nvm/nvm.sh"

    # Download and install Node.js:
    nvm install 20.18.0
   *Add this commands to install node.js via nvm
   */
  'curl-nvm': {
    cmd: 'curl',
    args: ['-o-','https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh','|','bash'],
    description: 'Descargar e instalar nvm',
    allowParams: false
  },
  'nvm-install': {
    cmd: 'nvm',
    args: ['install', '22.21.0'],
    description: 'Instalar Node.js usando nvm',
    allowParams: false
  },

  
}

