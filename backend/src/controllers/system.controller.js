import si from "systeminformation"

export const getSystemInfo = async (req, res) => {
  try {
    const [cpuData, cpuLoad, memData, diskData, tempData] = await Promise.all([
      si.cpu(),
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.cpuTemperature(),
    ])

    // ✅ Validar datos
    const cpuUsage = cpuLoad?.currentload ?? 0
    const cpuTemp = tempData?.main ?? null

    const totalStorage = diskData?.reduce((acc, disk) => acc + (disk.size || 0), 0) || 0
    const usedStorage = diskData?.reduce((acc, disk) => acc + (disk.used || 0), 0) || 0
    const storagePercent = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0

    res.json({
      cpu: {
        model: cpuData?.brand || "Desconocido",
        usage: parseFloat(cpuUsage.toFixed(1)),
        temperature: cpuTemp,
      },
      memory: {
        total: parseFloat((memData?.total / (1024 ** 2) || 0).toFixed(0)), // MB
        used: parseFloat((memData?.active / (1024 ** 2) || 0).toFixed(0)),
        percent: memData?.total ? parseFloat(((memData.active / memData.total) * 100).toFixed(1)) : 0,
      },
      storage: {
        total: parseFloat((totalStorage / (1024 ** 2)).toFixed(0)), // MB
        used: parseFloat((usedStorage / (1024 ** 2)).toFixed(0)),
        percent: parseFloat(storagePercent.toFixed(1)),
      },
    })
  } catch (error) {
    console.error("Error obteniendo datos del sistema:", error)
    res.status(500).json({ message: "Error obteniendo datos del sistema" })
  }
}
