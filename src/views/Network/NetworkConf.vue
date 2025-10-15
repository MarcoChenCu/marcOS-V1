<template>
  <AdminLayout>
  <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 mb-6">
      <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
        Interfaces
      </h3>      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        El sistema identifica las interfaces Ethernet utilizando nombres de interfaz de red predecibles. Estos nombres pueden aparecer como <strong>eno1</strong> o <strong>enp0s25</strong>. 
        Sin embargo, en algunos casos una interfaz aún puede utilizar el estilo <strong>eth#</strong> de nombramiento del kernel.
      </p>      
      <!--Componentes de interfaces-->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 mt-2">  
         <!--Componente de la informacion de interfaz-->
        <div 
          v-for="(interfaceInfo, index) in network"
          :key="interfaceInfo.ifaceName"
          class="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="px-5 pt-5 bg-white shadow-default rounded-2xl pb-7 dark:bg-gray-900 sm:px-6 sm:pt-6">
            <div class="flex justify-between">
              <div>
                <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ interfaceInfo.ifaceName || 'Desconocido' }}</h4>
              </div> 
            </div>
        
            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">DHCP:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ interfaceInfo.dhcp }}</p>
            </div>

            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">Tipo:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ typeConection(interfaceInfo.type) }}</p>
            </div>

            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">IPv4:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ interfaceInfo.ip4 || '' }}</p>
            </div>
        
            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">Máscara de subred IPv4:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ interfaceInfo.ip4subnet || '' }}</p>
            </div>

            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">Dirección MAC:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ interfaceInfo.mac || '' }}</p>
            </div>

            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">IPv6:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ interfaceInfo.ip6 || '' }}</p>
            </div>

            <div class="flex items-center mt-2">
              <h3 class="text-md font-semibold text-gray-800 dark:text-white/90">Máscara de subred IPv6:&nbsp;</h3>
              <p class="text-md text-gray-500 text-theme-sm dark:text-gray-400">{{ interfaceInfo.ip6subnet || '' }}</p>
            </div>        
          </div>
        </div>
      </div>
      <!--Fin interfaces-->
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
        title="Mostrar las interfaces desde la terminal."
        :text="'ip a'"
        />
      </div>
    </div>
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
  
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
        Configuración archivo de red
      </h3>
      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        La configuración de red en Ubuntu se gestiona a través de 
        <a class="underline cursor-pointer text-brand-500" href="https://netplan.io/">netplan</a>, 
        que proporciona una forma de alto nivel, independiente de la distribución, de definir cómo se debe configurar la red en su sistema a través de un 
        <a class="underline cursor-pointer text-brand-500" href="https://netplan.readthedocs.io/en/stable/netplan-yaml/">archivo de configuración YAML</a>.
        
      </p>      
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import CopytoClipboard from "../../components/common/CopytoClipboard.vue";
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

function typeConection(Type){
  if(Type==="wireless"){
    return "Inalámbrica"
  }
  else if(Type==="wired"){
    return "Cableada"
  }
  else if(Type==="virtual"){
    return "Virtual"
  }
  else if(Type===""){
    return "Desconocida"
  }
  else{
    return Type
  }

}
</script>



<style></style>
