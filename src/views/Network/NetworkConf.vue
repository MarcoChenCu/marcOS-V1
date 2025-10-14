<template>
  <AdminLayout>
  <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
        Interfaces
      </h3>
      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Una interfaz de red es el punto de conexión física o lógica que permite que un dispositivo se comunique con una red.
      </p>
      <!--Componentes de interfaces-->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">  
         <!--Componente de la informacion de interfaz-->
      <div  
        v-for="(interfacess, index) in network"
        :key="interface.ifaceName"
        class="px-5 pt-5 bg-white shadow-default rounded-2xl pb-7 dark:bg-gray-900 sm:px-6 sm:pt-6">
          <div class="flex justify-between">
            <div>
              <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ network[0].ifaceName || 'Desconocido' }}</h4>
            </div> 
          </div>

          <div class="flex items-center mt-2">
            <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">DHCP:&nbsp;</h3>
            <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ network[0].dhcp || false }}</p>
          </div>

          <div class="flex items-center mt-2">
            <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">IPv4:&nbsp;</h3>
            <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ network[0].ip4 || false }}</p>
          </div>

          <div class="flex items-center mt-2">
            <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">Dirección MAC:&nbsp;</h3>
            <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ network[0].mac || false }}</p>
          </div>

          <div class="flex items-center mt-2">
            <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">IPv6:&nbsp;</h3>
            <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ network[0].ip6 || false }}</p>
          </div>

        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";

const currentPageTitle = ref("Configuración de red");


//Peticiones

import { ref, onMounted } from 'vue'
const network = ref({})

onMounted(() => {
  loadnetworkInfo()
  //setInterval(loadnetwork, 8000)
})

const apiURL = import.meta.env.VITE_API_URL
async function loadnetworkInfo() {
  try {
    const res = await fetch(`${apiURL}/api/system`)
    const data = await res.json()
    network.value = data.network.networkInfo
    console.log(network.value)
  } catch (err) {
    console.error("Error al obtener métricas:", err)
  }
}
</script>

<style></style>
