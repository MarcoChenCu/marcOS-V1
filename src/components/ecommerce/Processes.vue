<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
  ><!--Contenedor principal-->
    <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Procesos</h3>
      </div>
      <SearchBar @search="searchQuery = $event" />
      <!--Redirigir a /processes-->
      <div class="flex items-center gap-3">
        <router-link   
          v-if="limit!='all'"
          to="/processes"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
        Ver todos
      </router-link>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table v-if="hasData" class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">PID</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Programa</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comando</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">usuario</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Memoria</p>            
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">CPU</p>
            </th>            
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(process, index) in visibleProcesses"
            :key="process.pid"
            class="border-t border-gray-100 dark:border-gray-800">
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ process.pid }}</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ process.name }}</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ process.command }}</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ process.user }}</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ process.mem }}%</p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ process.cpu.toFixed(2) }}</p>
            </td>
            <!--Reiniciar proceso-->
            <td v-if="limit==='all'" class="py-3 text-left">
              <button                        
                class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                @click="showRestartModal = true; processInfo = process"
                >
                <RefreshIcon />
              </button>              
            </td>
            <td v-if="limit==='all'" class="py-3 text-left">
              <button                        
                class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                @click="showStopModal = true; processInfo = process"
              >
                <StopIcon />
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
      <div v-else class="flex flex-row justify-center min-h-[150px]">            
        <Spinner/>
      </div>
    </div><!---->
    <!--Modal detener proceso-->
    <OkCancelModal
      :visible="showStopModal"
      title="Advertencia: Detener proceso"
      :description='"Esto detendrá el proceso "+processInfo.name+"(PID: "+processInfo.pid+"). ¿Está seguro que desea continuar?"'
      @close="showStopModal=false"
      @save="AdminProcess(processInfo.pid, 'stop'); showStopModal=false"
    />
    <!--Modal reiniciar proceso-->
    <OkCancelModal
      :visible="showRestartModal"
      title="Advertencia: Reiniciar proceso"
      :description='"Esto reiniciará el proceso "+processInfo.name+"(PID: "+processInfo.pid+"). ¿Está seguro que desea continuar?"'
      @close="showRestartModal=false"
      @save="AdminProcess(processInfo.pid, 'restart'); showRestartModal=false"
    />
  </div><!--Contenedor principal-->
</template>

<script setup>
  import { computed, ref } from 'vue'
  import Spinner from '../common/Spinner.vue'
  import { RefreshIcon, StopIcon } from '@/icons'
  import OkCancelModal from '../common/OkCancelModal.vue'
  import { notificationStore } from '@/stores/notificationStore'
  import { useCommandPanel } from '@/stores/commandPanel'
  import SearchBar from '../layout/header/SearchBar.vue'
  const apiURL = import.meta.env.VITE_API_URL
  const CommandPanel = useCommandPanel();

  const showStopModal = ref(false)
  const processInfo = ref({})
  const showRestartModal = ref(false)
  
  const props = defineProps({
    processes: {
      type: Object,
      default: () => ({ list: [] })
    },
    limit: {
      type: [Number, String],
      default: 'all'
    }
  })
  // Administrar proceso (detener/reiniciar)
  async function AdminProcess(pid, action) {
    let response = {success: false, output: ''}
    try {
      const res = await fetch(`${apiURL}/api/process/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pid, action })
      })

      // Si la respuesta no es correcta, lanzar error
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)

      // Verifica que las respuestas sean válidas antes de procesarlas
      response = await res.json() 
    } catch (err) {      
      response = {success: false, output: `Error al administrar el proceso: ${err.message}`}
    }
    finally{
      // Notificación del resultado
      notificationStore.add(response.success ? 'success' : 'error', response.success ? 'Éxito' : 'Error', response.success ? `El proceso (PID: ${pid}) se ha ${action === 'stop' ? 'detenido' : 'reiniciado'} correctamente.` : `Error al ${action === 'stop' ? 'detener' : 'reiniciar'} el proceso (PID: ${pid}).`)
      // Agregar comando al panel
      CommandPanel.add({
        commands: [
          {
            command: 'sudo kill ' + (action === 'stop' ? '-15' : '-1') + ' ' + pid,
            title: 'Administrar proceso',
            description: "Con privilegios se ejecuta el comando kill y se utiliza el parámetro '" + (action === 'stop' ? '-15' : '-1') + "' para " + (action === 'stop' ? 'detener' : 'reiniciar') + " el proceso, también se especifica el PID del proceso a administrar.",
            output: response.output,
          },
        ],
        state: response.success ? 'success' : 'error',
        description: action === 'stop' ? 'Detener proceso.' : 'Reiniciar proceso.',
      })
      
    }
  }
  //Original
  /**
   * 
   const visibleProcesses = computed(() => {
    const list = props.processes?.list || []
    if (props.limit === 'all') return list
    return list.slice(0, props.limit)
  })
  */

  const hasData = computed(() => (props.processes?.list?.length > 0))

  const searchQuery = ref('')

const visibleProcesses = computed(() => {
  const list = props.processes?.list || []
  let filtered = list

  // Filtrar por texto si hay búsqueda activa
  if (searchQuery.value) {
    const q = searchQuery.value
    filtered = list.filter(p =>
      [p.pid, p.name, p.command, p.user]
        .some(field => String(field).toLowerCase().includes(q))
    )
  }

  if (props.limit === 'all') return filtered
  return filtered.slice(0, props.limit)
})

  
</script>
