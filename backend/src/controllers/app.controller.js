import { runCommandSafe } from '../services/appExec.service.js'

export const getUpdates = async (req, res) => {
  try {
    const output = await runCommandSafe('list')
    res.json({ success: true, message: 'Operación realizada con éxito.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', output: error.message })
  }
}

export const installApp = async (req, res) => {
  try {
    const {appName} = req.body;
    if(!appName) {
      return res.status(400).json({ success: false, message: 'El nombre de la aplicación es requerido.', output: 'Nombre de aplicación inválido.' })
    }
    if(appName === 'node') {
      //Instalar nvm
      await runCommandSafe('curl-nvm')
      //Instalar node.js via nvm
      const output = await runCommandSafe('nvm-install')
      return res.json({ success: true, message: 'Node.js instalado correctamente usando nvm.', output: output })
    }else{
      //Instalar aplicacion por apt
      const output = await runCommandSafe('install', [appName, '-y'])
      res.json({ success: true, message: 'Aplicación instalada correctamente.', output: output })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar instalar la aplicación.', output: error.message })
  }
}

export const appInstalled = async (req, res) => {
  const commandList = ['installed-which','installed-dpkg','systemctl']
  try {
    const {appName, key } = req.body;    
    if(!appName || typeof key !== 'number' || key < 0 || key >= commandList.length) {
      return res.status(400).json({ success: false, message: 'El nombre de la aplicación es requerido.', output: 'Nombre de aplicación inválido.'+appName+','+key })
    }
    const keyIndex = Number(key);
    //Instalar aplicacion por apt
    const output = await runCommandSafe(commandList[keyIndex], [appName])    
    res.json({ success: true, message: 'Aplicación instalada.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar verificar la instalación de la aplicación.', output: error.message })
  }
}


export const uninstallApp = async (req, res) => {
  try {
    const {appName} = req.body;
    if(!appName) {
      return res.status(400).json({ success: false, message: 'El nombre de la aplicación es requerido.', output: 'Nombre de aplicación inválido.' })
    }
    const output = await runCommandSafe('uninstall', [appName, '-y'])
    res.json({ success: true, message: 'Aplicación desinstalada correctamente.', output: output })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al intentar desinstalar la aplicación.', output: error.message })
  }
}


