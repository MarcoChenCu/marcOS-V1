import si from "systeminformation"

export const getSystemInfo = async (req, res) => {
  try {
    const [cpuData, cpuLoad, memData, diskData, tempData, DiskInfo] = await Promise.all([
      si.cpu(),
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.cpuTemperature(),
      si.diskLayout()
    ])

    // ✅ Validar datos
    const cpuUsage = cpuLoad?.currentLoad ?? 0
    const cpuTemp = tempData?.main ?? null

    //const totalStorage = diskData?.reduce((acc, disk) => acc + (disk.size || 0), 0) || 0
    const totalStorage = diskData?.[0]?.size || 0 
    const usedStorage = diskData?.[0]?.used || 0 
    const storagePercent = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0
      
    res.json({
      cpu: {
        model: cpuData?.brand || "Desconocido",
        usage: parseFloat(cpuUsage.toFixed(1)),
        cores: cpuData?.cores || 1,
        speed: cpuData?.speedMax,
        temperature: cpuTemp,
      },
      memory: {
        total: parseFloat((memData?.total / (1000 ** 3) || 0).toFixed(0)), // GB
        used: parseFloat((memData?.active / (1000 ** 3) || 0).toFixed(1)),
        percent: memData?.total ? parseFloat(((memData.active / memData.total) * 100).toFixed(1)) : 0,
      },
      storage: {
        device: DiskInfo?.[0]?.device || 'Desconocido',
        type: DiskInfo?.[0].type || 'Desconocido',
        total: parseFloat((totalStorage / (1000 ** 3)).toFixed(1)), // GB
        used: parseFloat((usedStorage / (1024 ** 3)).toFixed(1)),
        percent: parseFloat(storagePercent.toFixed(1)),
      },
    })
  } catch (error) {
    console.error("Error obteniendo datos del sistema:", error)
    res.status(500).json({ message: "Error obteniendo datos del sistema" })
  }
}
