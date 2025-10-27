<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
  ><!--Contenedor principal-->
    <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Procesos</h3>
      </div>
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
            <td v-if="limit==='all'" class="py-3 text-left">
              <button                        
                class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
              >
                <OptionIcon />
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
      <div v-else class="flex flex-row justify-center min-h-[150px]">            
        <Spinner/>
      </div>
    </div><!---->
  </div><!--Contenedor principal-->
</template>

<script setup>
import { computed } from 'vue'
import Spinner from '../common/Spinner.vue'
import { OptionIcon } from '@/icons'


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

const visibleProcesses = computed(() => {
  const list = props.processes?.list || []
  if (props.limit === 'all') return list
  return list.slice(0, props.limit)
})

const hasData = computed(() => (props.processes?.list?.length > 0))
</script>
