<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenedor principal-->
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 mb-6">
      <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
        Interfaces
      </h3>      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        El sistema identifica las interfaces Ethernet utilizando nombres de interfaz de red predecibles. 
        Estos nombres pueden aparecer como <strong>eno1</strong> o <strong>enp0s25</strong>. 
        Sin embargo, en algunos casos una interfaz aún puede utilizar el estilo <strong>eth#</strong> de nombramiento del kernel.
      </p>  
      <!--Configurar interfaz-->    
      <!--Modal para agregar servicio-->
      <div class="flex items-center order-2 justify-between gap-4 mt-4 mb-4">
        <button
        @click="showInterfaceModal = true"
        class="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">
        Configurar interfaz
      </button>
    </div>
      <!--Componentes de interfaces-->
      <div v-if="network && network.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 mt-2">  
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
      </div><!--Fin interfaces-->
      <div v-else class="flex items-center justify-center min-h-[250px]"><!--Spinner condicional-->
        <Spinner/>
      </div>
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

      <div class="mx-auto w-full max-w-[630px] flex flex-col items-center mt-4 mb-4">
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
        <div class="flex items-center mt-4 mb-4 gap-4">
          <Button variant="primary" size="md">
            <div v-if="false"><!--Configurar spinner al guardar-->
              <svg
                width="15"
                height="15"
                viewBox="0 0 48 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="animate-spin"
                >
                <circle cx="24" cy="24.5" r="22" stroke="#E5E7EB" stroke-width="4" />
                <mask id="path-2-inside-1_2527_20912" fill="white">
                    <path
                      d="M46.0051 24.5C47.1068 24.5 48.0086 23.6053 47.9172 22.5073C47.5452 18.0426 45.9291 13.7565 43.2335 10.1448C40.139 5.9986 35.7874 2.9634 30.8274 1.4916C25.8674 0.019799 20.5646 0.190212 15.7094 1.97744C11.4802 3.53423 7.78776 6.24518 5.04079 9.78438C4.36525 10.6547 4.63305 11.8965 5.55649 12.4975C6.47993 13.0984 7.70826 12.8295 8.39813 11.9705C10.6656 9.14692 13.6659 6.98122 17.0877 5.72166C21.1357 4.23155 25.557 4.08947 29.6924 5.31659C33.8278 6.54371 37.456 9.07434 40.0361 12.5313C42.217 15.4533 43.5504 18.905 43.9108 22.5083C44.0205 23.6046 44.9033 24.5 46.0051 24.5Z"
                    />
                </mask>
                <path
                  d="M46.0051 24.5C47.1068 24.5 48.0086 23.6053 47.9172 22.5073C47.5452 18.0426 45.9291 13.7565 43.2335 10.1448C40.139 5.9986 35.7874 2.9634 30.8274 1.4916C25.8674 0.019799 20.5646 0.190212 15.7094 1.97744C11.4802 3.53423 7.78776 6.24518 5.04079 9.78438C4.36525 10.6547 4.63305 11.8965 5.55649 12.4975C6.47993 13.0984 7.70826 12.8295 8.39813 11.9705C10.6656 9.14692 13.6659 6.98122 17.0877 5.72166C21.1357 4.23155 25.557 4.08947 29.6924 5.31659C33.8278 6.54371 37.456 9.07434 40.0361 12.5313C42.217 15.4533 43.5504 18.905 43.9108 22.5083C44.0205 23.6046 44.9033 24.5 46.0051 24.5Z"
                  stroke="#3758F9"
                  stroke-width="8"
                  mask="url(#path-2-inside-1_2527_20912)"
                />
              </svg>
            </div>
              Guardar
          </Button>
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
    <!--Modal formulario agregar servicio-->
    <StandarModal
      :visible="showInterfaceModal"
      title="Configurar interfaz"
      description=""
      @close="showInterfaceModal=false"
      @save="saveInterface"
      >
    <!--Contenido del modal-->
      <template #content>
        <div><!--Columna-->          
          <div class="mb-2 mt-2"><!--Seleccionar interfaz-->
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Interfaz:
            </label>
            <div class="relative z-20 bg-transparent"><!--Contenedor select-->
              <select
                  v-model="singleSelect"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  :class="{ 'text-gray-800 dark:text-white/90': singleSelect }"
                >
                <option value="0" disabled>Seleccionar interfaz</option>
                <option 
                  v-for="(interfaceInfo, index) in network"
                  :key="interfaceInfo.ifaceName"
                  :value="interfaceInfo.ifaceName" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                  {{interfaceInfo.ifaceName}}
                </option>
              </select>
              <span class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
                <svg
                  class="stroke-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                </svg>
              </span>
            </div><!--Contenedor select-->
          </div><!--Fin seleccionar interfaz-->
          <!--Toggle activar/desactivar DHCP -->
          <div class="flex items-center gap-4 mt-4 mb-4">
            <h4 class="text-gray-800 dark:text-white/90"><strong>DHCP</strong></h4>
            <ToggleSwitch
              v-model="toggle"
              @toggle-off="showConfigInterface = true"
              @toogle-on="showConfigInterface = false"
            />
          </div>
            <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
              El protocolo de configuración dinámica de host (DHCP) para la asignación automática de direcciones IP.
            </label>
          <div v-if="showConfigInterface"><!--Parametros interfaz-->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                IP:
              </label>
              <input
                type="text"
                placeholder="Ejemplo: 192.168.0.10"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />                      
            </div>   
            <div>
              <label class="mb-2 mt-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Máscara de subred (subnet mask):
              </label>
              <input
                type="text"
                placeholder="Ejemplo: 255.255.255.0"  
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />          
            </div> 
            <div>
              <label class="mb-2 mt-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Puerta de enlace (Gateway):
              </label>
              <input
                type="text"
                placeholder="Ejemplo: 255.255.255.0"  
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />          
            </div>  
            <div>
              <label class="mb-2 mt-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                DNS:
              </label>
              <input
                type="text"
                placeholder="Ejemplo: 8.8.8.8"  
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />  
              <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
                Si se ingresa más de un DNS se deben separar por comas. Ejemplo 8.8.8.8, 1.1.1.1
              </label>        
            </div>   
          </div><!--Fin parametros interfaz-->
        </div><!--Fin columna-->
      </template>
    </StandarModal>

  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import CopytoClipboard from "../../components/common/CopytoClipboard.vue";
import Button from "@/components/ui/Button.vue";
import Spinner from "@/components/common/Spinner.vue";
import StandarModal from "@/components/common/StandarModal.vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import { notificationStore } from '@/stores/notificationStore'
const currentPageTitle = ref("Configuración de red");

//Modal configurar interfaz
const toggle = ref(false)
const showInterfaceModal = ref(false)
const showConfigInterface = ref(false)

const saveInterface = ()=>{
  console.log("Guardar interfaz")
  showInterfaceModal.value = false
  notificationStore.add('success', 'Éxito', 'Los cambios en la interfaz se guardaron correctamente.')
}

//Peticiones
import { ref, onMounted, onUnmounted } from 'vue'
const network = ref({})

let intervalId = null
const apiURL = import.meta.env.VITE_API_URL

async function loadMetrics() {
  try {
    const res = await fetch(`${apiURL}/api/system`, { cache: "no-store" })

    // Si la respuesta no es correcta, lanzar error
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)

    // Verifica que las respuestas sean válidas antes de procesarlas
    const networkData = res.ok ? await res.json() : {}

    // Evita valores null o undefined    
    network.value = networkData.network.networkInfo || {}
  } catch (err) {
    console.error("Error al obtener las interfaces:", err)
    network.value = { networkData: [] } // evitar undefined en el template
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
