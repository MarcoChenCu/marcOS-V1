<template>        
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <!--Metricas del sistema-->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">              
          <SystemMetrics
            title="Procesador"
            :description="metrics.cpu?.model+' ('+metrics.cpu?.cores+' cores) '+metrics.cpu?.speed+'GHz'"
            :value="metrics.cpu?.usage"
            unit="%"
            >
            <template #icon>
              <svg 
                class="w-6 h-6 text-gray-800 dark:text-white/90"
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 20v2"/>
                <path d="M12 2v2"/>
                <path d="M17 20v2"/>
                <path d="M17 2v2"/>
                <path d="M2 12h2"/>
                <path d="M2 17h2"/>
                <path d="M2 7h2"/>
                <path d="M20 12h2"/>
                <path d="M20 17h2"/>
                <path d="M20 7h2"/>
                <path d="M7 20v2"/>
                <path d="M7 2v2"/>
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="8" y="8" width="8" height="8" rx="1"/>
              </svg>
            </template>
          </SystemMetrics>

          <SystemMetrics
            title="Temperatura"
            :description="metrics.cpu?.model"
            :value="metrics.cpu?.temperature"
            unit="°C"
            >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-800 dark:text-white/90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
            </svg>
            </template>
          </SystemMetrics>

          <SystemMetrics
            title="RAM"
            :description="metrics.memory?.used+'GB/'+metrics.memory?.total+'GB'"
            :value="metrics.memory?.percent"
            unit="%"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800 dark:text-white/90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"><path d="M6 19v-3"/><path d="M10 19v-3"/><path d="M14 19v-3"/><path d="M18 19v-3"/><path d="M8 11V9"/><path d="M16 11V9"/><path d="M12 11V9"/><path d="M2 15h20"/><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"/></svg>
            </template>
          </SystemMetrics>

          <SystemMetrics
            title="Almacenamiento"
            :description="metrics.storage?.device+' '+metrics.storage?.used+'GB/'+metrics.storage?.total+'GB '"
            :value="metrics.storage?.percent"
            unit="%"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-800 dark:text-white/90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>
            </template>
          </SystemMetrics>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-5">
        <SystemInfo
        :system="metrics.system"
        :network="metrics.network"
        />
      </div>

      <div class="col-span-12 xl:col">
        <statistics-chart />
      </div>

      <div class="col-span-12">
        <Processes
          :processes="processes.processesData" :limit="10"
         />
      </div>
    </div>
  </admin-layout>
</template>
<script>

import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import SystemMetrics from '@/components/ecommerce/SystemMetrics.vue'
import SystemInfo from '../components/ecommerce/SystemInfo.vue'
import CustomerDemographic from '../components/ecommerce/CustomerDemographic.vue'
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import Processes from '../components/ecommerce/Processes.vue'
import Alert from '../components/ui/Alert.vue'

export default {
  components: {
    AdminLayout,
    EcommerceMetrics,
    SystemMetrics,
    SystemInfo,
    CustomerDemographic,
    StatisticsChart,
    Processes,
  },
  name: 'Ecommerce',
}

</script>

<script setup>

import { ref, onMounted } from 'vue'
const metrics = ref({})

const processes = ref({})

onMounted(() => {
  loadMetrics()
  setInterval(loadMetrics, 1000)
})

const apiURL = import.meta.env.VITE_API_URL
async function loadMetrics() {
  try {
    const res = await fetch(`${apiURL}/api/system`)
    const data = await res.json()
    metrics.value = data
    //console.log(metrics.value)
  } catch (err) {
    console.error("Error al obtener métricas:", err)
  }
  try {
    const res = await fetch(`${apiURL}/api/process`)
    const data = await res.json()
    processes.value = data
    //console.log(processes.value)
  } catch (err) {
    console.error("Error al obtener los procesos:", err)
  }
}

</script>