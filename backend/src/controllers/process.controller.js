import si from "systeminformation"
import { runCommandSafe } from '../services/processExec.service.js'

export const getProcesses = async (req, res) => {
  try {
    const [processesData] = await Promise.all([
      si.processes(),
    ])

  res.json({
    processesData,
    })
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los procesos del sistema" })
  }
}


export const adminProcesses = async (req, res) => {  
  try {
    const { pid, action } = req.body

    if (!pid || !action || (action !== 'stop' && action !== 'restart')) {
      return res.status(400).json({ success: false, message: "Parámetros inválidos", output: "Parámetros inválidos" })
    }
    let param;
    if(action === 'stop'){
      let param = '-15'
    }else{
      let param = '-HUP'
    }
    const output = await runCommandSafe('kill',[param, pid.toString()])
    res.json({ success: true, output: output })
  } catch (error) {
    res.status(500).json({ success: false, output: error.message })
  }

}