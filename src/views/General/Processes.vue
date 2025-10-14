<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div class="mx-auto w-full max-w-[630px] text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Start putting content on grids or panels, you can also use different
          combinations of grids.Please check out the dashboard and other pages
        </p>
      </div>
      <Processes :processes="processes.processesData" limit="all" />
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import Processes from "@/components/ecommerce/Processes.vue"


const currentPageTitle = ref("Procesos");

import { ref, onMounted } from 'vue'

const processes = ref({})
 
onMounted(() => {
  loadMetrics()
  setInterval(loadMetrics, 5000)
})

const apiURL = import.meta.env.VITE_API_URL
async function loadMetrics() {
  try {
    const res = await fetch(`${apiURL}/api/process`)
    const data = await res.json()
    processes.value = data
    console.log(processes.value)
  } catch (err) {
    console.error("Error al obtener los procesos:", err)
  }
}
</script>

<style></style>
