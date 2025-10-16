<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenedor principal-->
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
        </div> <!--Fin informacion interfaz-->
      </div>
      <!--Fin interfaces-->
      <!--Copiar al portapapeles-->
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
        title="Comando para listar las interfaces desde la terminal."
        :text="'ip a'"
        />
      </div>
    </div>
    <!--Configuracion del archivo netplan-->
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">  
      <!--Titulo-->
      <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
        Configuración archivo de red
      </h3>     
      <!--Descripcion--> 
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        La configuración de red en Ubuntu se gestiona a través de 
        <a class="underline cursor-pointer text-brand-500" href="https://netplan.io/">netplan</a>, 
        que proporciona una forma de alto nivel, independiente de la distribución, de definir cómo se debe configurar la red en su sistema a través de un 
        <a class="underline cursor-pointer text-brand-500" href="https://netplan.readthedocs.io/en/stable/netplan-yaml/">archivo de configuración YAML</a>.        
      </p>

      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Archivo en /etc/netplan/50-cloud-init.yaml
        </label>
        <!--Ejemplo-->
        <textarea        
          placeholder="Enter a description..."
          value="network:
  version: 2
  renderer: networkd
  ethernets:
    eth_lan0:
      dhcp4: true
        match:
          macaddress: 00:11:22:33:44:55
        set-name: eth_lan0"        
          rows="6"      
          spellcheck="false"              
          class="min-h-54 dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:shadow-focus-ring focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea> 
        <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
          <Button class="mr-2" variant="primary" size="md">Guardar</Button>
          <Button variant="error" size="md">Cancelar</Button>
        </div>
    </div>
      <!--Titulo--> 
      <h3 class="mb-4 mt-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
        Configuración desde la terminal
      </h3>  
      <!--Copiar al portapapeles-->
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
        title="Listar los archivos del directorio /etc/netplan para verificar el nombre del archivo de configuración."
        :text="'ls /etc/netplan'"        
        comment="*Los nombres de archivos pueden variar."
        />
      </div>
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
        title="Editar el archivo de configuración con la utilidad nano."
        :text="'sudo nano /etc/netplan/nombre_archivo.yaml'"             
        />
      </div>
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
        title="Aplicar los cambios a la configuración de red."
        :text="'sudo netplan apply'"        
        />
      </div>   
      <!-- Ejemplo archivo netplan -->
      <div class="mx-auto w-full max-w-[700px] text-center mt-4 mb-4">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Ejemplo archivo de configuración
        </label>
        <!--Contenido del archivo netplan-->
        <textarea        
          placeholder="Enter a description..."
          value="network:
  version: 2
  ethernets:
    eth_lan0:
      dhcp4: true
      addresses:
        - 192.168.0.100/24          
        gateway4: 192.168.0.1
        nameservers:
        addresses:
          - 8.8.8.8"
          rows="6"
          disabled
          class="min-h-54 dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:shadow-focus-ring focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
        <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
          *La sintaxis de YAML depende en gran medida del uso de sangrías y del número de espacios para representar la estructura de los datos. Si el formato no se aplica correctamente las configuración de red no se aplicará.
        </label>
        <a class="underline cursor-pointer text-brand-500" href="https://documentation.ubuntu.com/server/explanation/networking/configuring-networks/">Configuración de red Ubuntu Server</a>
      </div><!--Ejemplo archivo netplan-->
    </div><!--Fin configuracion archivo de red-->
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import CopytoClipboard from "../../components/common/CopytoClipboard.vue";
import Button from "@/components/ui/Button.vue";
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
