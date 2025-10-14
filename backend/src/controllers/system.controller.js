import si from "systeminformation"

export const getSystemInfo = async (req, res) => {
  try {
    const [cpuData, cpuLoad, memData, diskData, tempData, DiskInfo, timeInfo, OSInfo, networkInfo, networkStats] = await Promise.all([
      si.cpu(),
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.cpuTemperature(),
      si.diskLayout(),
      si.time(),
      si.osInfo(),
      si.networkInterfaces(),
      si.networkStats(),
    ])

    // ✅ Validar datos
    const cpuUsage = cpuLoad?.currentLoad ?? 0
    const cpuTemp = tempData?.main ?? null

    //const totalStorage = diskData?.reduce((acc, disk) => acc + (disk.size || 0), 0) || 0
  const totalStorage = diskData?.[0]?.size || 0
  const usedStorage = diskData?.[0]?.used || 0
  const storagePercent = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0

  // uptime comes in seconds from systeminformation -> convert to days/hours/minutes
  const uptimeSeconds = Math.floor(timeInfo?.uptime ?? 0)
  const days = Math.floor(uptimeSeconds / 86400) || 0
  const hours = Math.floor((uptimeSeconds % 86400) / 3600)
  const minutes = Math.floor((uptimeSeconds % 3600) / 60)
  const seconds = uptimeSeconds % 60

  // Formatear la hora actual (timeInfo.current viene en ms desde epoch)
  const epochMs = timeInfo?.current ?? Date.no1w()
  const timeISO = new Date(epochMs).toISOString()
  const timeLocal = new Date(epochMs).toLocaleString('es-ES', { timeZoneName: 'short' })

  res.json({
      cpu: {
        model: cpuData?.brand || "Desconocido",
        usage: parseFloat(cpuUsage.toFixed(1)),
        cores: cpuData?.cores || 1,
        speed: cpuData?.speedMax || 0,
        temperature: cpuTemp,
      },
      memory: {
        total: parseFloat((memData?.total / (1024 ** 3) || 0).toFixed(1)), // GB
        used: parseFloat((memData?.active / (1024 ** 3) || 0).toFixed(1)),
        percent: memData?.total ? parseFloat(((memData.active / memData.total) * 100).toFixed(1)) : 0,        
      },
      storage: {
        device: DiskInfo?.[0]?.device || 'Desconocido',        
        total: parseFloat((totalStorage / (1000 ** 3)).toFixed(1)), // GB
        used: parseFloat((usedStorage / (1000 ** 3)).toFixed(1)),
        percent: parseFloat(storagePercent.toFixed(1)),
      },
      system: {
        so: OSInfo.distro + ' '+OSInfo.release,
        kernel: OSInfo.kernel,
        hostname: OSInfo.hostname,       
        uptime: {
          days: days ? days : 0,
          hours: hours ? hours : 0,
          minutes: minutes ? minutes : 0,
        },      
        // enviar la hora en formato local legible y en ISO (UTC)
        time: {
          epochMs,
          iso: timeISO,
          local: timeLocal,
        }, // zona horaria o horario local
      },
      network: {
        hostname: OSInfo.hostname,
        interface: networkInfo?.[1].iface || 'Desconocido', 
        ip: networkInfo?.[1]?.ip4 || '',
        mac: networkInfo?.[1]?.mac || '',
        networkInfo: networkInfo,        
        bytesDown: 25,
        bytesUp: networkStats[0]?.dropped,

      },
    })
  } catch (error) {
    console.error("Error obteniendo datos del sistema:", error)
    res.status(500).json({ message: "Error obteniendo datos del sistema" })
  }
}
