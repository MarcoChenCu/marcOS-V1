<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-4">
          Procesos y servicios del sistema operativo.
        </p>
      <Processes :processes="processes.processesData" limit="all" />
    </div>
  </AdminLayout>
</template>


<script setup>
  import { ref, onMounted, onUnmounted } from "vue"
  import AdminLayout from "@/components/layout/AdminLayout.vue"
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
  import Processes from "@/components/ecommerce/Processes.vue"

  const currentPageTitle = ref("Procesos")
  const processes = ref({})

  // Intervalo controlado para actualización periódica
  let intervalId = null

  const apiURL = import.meta.env.VITE_API_URL

  async function loadMetrics() {
    try {
      const res = await fetch(`${apiURL}/process`, { cache: "no-store" })
    
      // Si la respuesta no es correcta, lanzar error
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
    
      // Verifica que las respuestas sean válidas antes de procesarlas
      const processData = res.ok ? await res.json() : {}
    
      // Evita valores null o undefined    
      processes.value = processData || {}
    } catch (err) {
      console.error("Error al obtener los procesos:", err)
      processes.value = { processesData: [] } // evitar undefined en el template
    }
  }

  onMounted(() => {
    loadMetrics()
    // Actualiza cada 5 segundos, solo si el componente está activo
    intervalId = setInterval(loadMetrics, 5000)
  })

  onUnmounted(() => {
    // Detener las peticiones al salir de la vista
    if (intervalId){
      clearInterval(intervalId)
      intervalId = null
    }

  })
</script>

<style></style>
