<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <!-- Encabezado -->
    <div class="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Uso del sistema
        </h3>
      </div>

      <!-- Selector CPU / RAM -->
      <div class="relative">
        <div
          class="inline-flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900"
        >
          <button
            v-for="option in options"
            :key="option.value"
            @click="selected = option.value"
            :class="[
              selected === option.value
                ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400',
              'px-3 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 hover:shadow-theme-xs dark:hover:bg-gray-800 dark:hover:text-white',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Gráfico -->
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartThree" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
        <VueApexCharts
          type="area"
          height="310"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

//  Parámetros
const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const updateInterval = 2000 // cada 2 segundos
const maxPoints = 30

//  Opciones de selección
const options = [
  { value: 'cpu', label: 'CPU' },
  { value: 'ram', label: 'RAM' },
]
const selected = ref('cpu')

// Datos del gráfico
const series = ref([
  {
    name: '% de uso',
    data: [],
  },
])

// ⚙️ Configuración del gráfico
const chartOptions = ref({
  chart: {
    type: 'area',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: { speed: 500 },
    },
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ['#3b82f6'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
    },
  },
  xaxis: {
    type: 'datetime',
    labels: { datetimeFormatter: { hour: 'HH:mm:ss' } },
  },
  yaxis: {
    max: 100,
    min: 0,
    tickAmount: 5,
    labels: { formatter: (v) => v.toFixed(0) + '%' },
  },
  tooltip: {
    x: { format: 'HH:mm:ss' },
    y: { formatter: (val) => val.toFixed(1) + '%' },
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.1)',
  },
})

// Función para obtener las métricas
async function fetchMetrics() {
  try {
    const res = await fetch(`${apiURL}/api/system`)
    const data = await res.json()

    const cpu = data?.cpu?.usage ?? 0
    const ram = data?.memory?.percent ?? 0

    const now = new Date().getTime()

    // Selecciona la métrica actual (CPU o RAM)
    const newValue = selected.value === 'cpu' ? cpu : ram

    const serie = series.value[0].data
    serie.push({ x: now, y: newValue })

    // Limita el historial
    if (serie.length > maxPoints) serie.shift()

    // Fuerza la reactividad
    series.value = [{ ...series.value[0], data: [...serie] }]
  } catch (err) {
    console.error('Error al obtener métricas:', err)
  }
}

let interval = null

// Actualizacion
onMounted(() => {
  fetchMetrics()
  interval = setInterval(fetchMetrics, updateInterval)
})

//Limpieza
onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

// Reinicia los datos si cambia la métrica seleccionada
watch(selected, () => {
  series.value = [{ name: '% de uso', data: [] }]
})
</script>
