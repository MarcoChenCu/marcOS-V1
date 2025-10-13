import si from "systeminformation"

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
