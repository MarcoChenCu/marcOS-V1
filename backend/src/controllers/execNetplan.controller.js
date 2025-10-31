import { runCommandSafe } from '../services/netplanExec.service.js'
import fs from "fs"
const NETPLAN_FILE = '/etc/netplan/50-cloud-init.yaml'
//Leer el archivo netplan
export async function getNetplanFile(req, res) {
  try {
    const output = await runCommandSafe('read-netplan', [NETPLAN_FILE])
    res.json({ success: true, output: output })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

//Guardar el archivo Netplan
export async function saveNetplanFile(req, res) {
  try {
    const { content } = req.body    
    if (!content || typeof content !== "string") {
      return res.status(400).json({ success: false, error: "Contenido inválido" })
    }
    
    const commandKey = "netplan-save"
    const tempFilePath = `/tmp/netplan-temp-${Date.now()}.yaml`

    // Guardar temporalmente el archivo (sin privilegios)
    fs.writeFileSync(tempFilePath, content, "utf8")

    // Mover al destino con privilegios (sudo mv)
    const output = await runCommandSafe(commandKey, [tempFilePath, NETPLAN_FILE])
    //Modifcar permisos
    await runCommandSafe('netplan-permission',[NETPLAN_FILE])

    res.json({ success: true, message: "Archivo Netplan guardado correctamente", output })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export async function applyNetplanFile(req, res) {
  try {
    const output = await runCommandSafe('netplan-apply')
    res.json({ success: true, output: output })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

