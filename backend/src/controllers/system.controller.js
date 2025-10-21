import si from "systeminformation"
let networkRates = { rx: 0, tx: 0 }
export const getSystemInfo = async (req, res) => {
  try {
    const results = await Promise.allSettled([
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

    // Extraer resultados o usar valores por defecto
    const [cpuData, cpuLoad, memData, diskData, tempData, diskInfo, timeInfo, osInfo, networkInfo, networkStats] = results.map(r =>
      r.status === "fulfilled" ? r.value : null
    )

    // CPU
    const cpuUsage = Number(cpuLoad?.currentLoad ?? 0)
    const cpuTemp = tempData?.main ?? null

    // DISK
    const firstDisk = diskData?.[0] ?? {}
    const totalStorage = firstDisk.size ?? 0
    const usedStorage = firstDisk.used ?? 0
    const storagePercent = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0

    // MEMORY
    const totalMem = memData?.total ?? 0
    const usedMem = memData?.active ?? memData?.used ?? 0
    const memPercent = totalMem > 0 ? (usedMem / totalMem) * 100 : 0

    // TIME
    const uptimeSeconds = Math.floor(timeInfo?.uptime ?? 0)
    const days = Math.floor(uptimeSeconds / 86400)
    const hours = Math.floor((uptimeSeconds % 86400) / 3600)
    const minutes = Math.floor((uptimeSeconds % 3600) / 60)

    const epochMs = timeInfo?.current ?? Date.now()
    const timeISO = new Date(epochMs).toISOString()
    const timeLocal = new Date(epochMs).toLocaleString('es-ES', { timeZoneName: 'short' })

    // OS
    const os = {
      distro: osInfo?.distro ?? "Desconocido",
      release: osInfo?.release ?? "",
      kernel: osInfo?.kernel ?? "Desconocido",
      hostname: osInfo?.hostname ?? "Sin nombre",
    }

    // NETWORK
    const iface = networkInfo?.[1] ?? networkInfo?.[0] ?? {}
    const netStats = networkStats?.[0] ?? {}
    
    const network = {
      hostname: os.hostname,
      interface: iface.iface ?? "Desconocido",
      ip: iface.ip4 ?? "",
      mac: iface.mac ?? "",
      networkInfo: networkInfo,
      //down: (networkRates.rx * 8) / (1024 * 1024),
      //up: (networkRates.tx * 8) / (1024 * 1024),
    }

    // RESPUESTA FINAL
    res.json({
      cpu: {
        model: cpuData?.brand ?? "Desconocido",
        usage: parseFloat(cpuUsage.toFixed(1)),
        cores: cpuData?.cores ?? 1,
        speed: cpuData?.speedMax ?? 0,
        temperature: cpuTemp ?? 0,
      },
      memory: {
        total: parseFloat((totalMem / 1024 ** 3).toFixed(1)),
        used: parseFloat((usedMem / 1024 ** 3).toFixed(1)),
        percent: parseFloat(memPercent.toFixed(1)),
      },
      storage: {
        device: diskInfo?.[0]?.device ?? "Desconocido",
        total: parseFloat((totalStorage / 1000 ** 3).toFixed(1)),
        used: parseFloat((usedStorage / 1000 ** 3).toFixed(1)),
        percent: parseFloat(storagePercent.toFixed(1)),
      },
      system: {
        so: `${os.distro} ${os.release}`.trim(),
        kernel: os.kernel,
        hostname: os.hostname,
        uptime: { days, hours, minutes },
        time: { epochMs, iso: timeISO, local: timeLocal },
      },
      network,
    })
  } catch (error) {
    console.error("Error obteniendo datos del sistema:", error.message)
    console.error(error.stack)
    res.status(500).json({ message: "Error obteniendo datos del sistema" })
  }
}

