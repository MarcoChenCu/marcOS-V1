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
        <Button @click="showInterfaceModal = true">
          <div v-if="saving"><!--Configurar spinner al guardar-->
              <SpinnerMini width="15" height="15" />
            </div>
              {{ saving ? 'Guardando...' : 'Configurar interfaz' }}          
        </Button>
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
      <!--Editar archivo netplan-->
      <div v-if="!loading" class="mx-auto w-full max-w-[630px] flex flex-col items-center mt-4 mb-4">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Archivo en /etc/netplan/50-cloud-init.yaml
        </label>
        <!--Ejemplo-->
        <textarea
          v-model="netplanInfo"
          @keydown="handleTab"
          placeholder="Ingrese la configuración..."                    
          rows="6"
          spellcheck="false"
          class="min-h-54 dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:shadow-focus-ring focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>         
        <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
          *La sintaxis de YAML depende en gran medida del uso de sangrías y del número de espacios para representar la estructura de los datos. Si el formato no se aplica correctamente las configuración de red no se aplicará.
        </label>
        <div class="flex items-center mt-4 mb-4 gap-4">
          <Button variant="success" size="md" @click="saveNetplan(netplanInfo)">
            <div v-if="savingInterface"><!--Configurar spinner al guardar-->
              <SpinnerMini width="15" height="15" />
            </div>
              {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </Button>
          <!--Button variant="error" size="md">Cancelar</Button-->
          <Button
          v-if="netplanInfo.length>0"
          @click="download('netplanconfig.txt', netplanInfo)"
          variant="primary">
          Descargar
        </Button>
        </div>
        <a class="underline cursor-pointer text-brand-500" href="https://documentation.ubuntu.com/server/explanation/networking/configuring-networks/">Configuración de red Ubuntu Server</a>
      </div><!-- Fin editar archivo netplan-->
      <!--spinner-->
      <Spinner v-else />
      <!--spinner-->
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
          placeholder="Ingrese la configuración..."
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
                  v-model="indexInterface"
                  id="interface"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"                  
                >
                <option value="-1" disabled>Seleccionar interfaz</option>
                <option                
                  v-for="(interfaceInfo, index) in network"
                  :key="interfaceInfo.ifaceName"
                  :value="index" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
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
              v-model="DHCP"
              @toggle-off="showConfigInterface = true"
              @toogle-on="showConfigInterface = false"
            />
          </div>
            <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
              El protocolo de configuración dinámica de host (DHCP) para la asignación automática de direcciones IP.
            </label>
          <div v-if="!DHCP"><!--Parametros interfaz-->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                IP:
              </label>
              <input
                v-model="ip"
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
                v-model="subnet"
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
                v-model="gateway"
                type="text"
                placeholder="Ejemplo: 192.168.0.1"  
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />          
            </div>  
            <div>
              <label class="mb-2 mt-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                DNS:
              </label>
              <input
                v-model="dns"
                type="text"
                placeholder="Ejemplo: 8.8.8.8"  
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />  
              <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
                Si se ingresa más de un DNS se deben separar por comas. Ejemplo 8.8.8.8, 1.1.1.1
              </label>        
            </div>   
          </div><!--Fin parametros interfaz-->
          <p class="mt-1.5 text-theme-xs text-error-500">{{ errorModal }}</p>
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
  import { useCommandPanel } from "@/stores/commandPanel";
  import SpinnerMini from "@/icons/Spinner.vue";
  const currentPageTitle = ref("Configuración de red");

  const apiURL = import.meta.env.VITE_API_URL

  const CommandPanel = useCommandPanel();

  //Modal configurar interfaz
  const showInterfaceModal = ref(false)
  const errorModal = ref('')
  const indexInterface = ref(0)
  const loading = ref(false)
  const saving = ref(false)
  const savingInterface = ref(false)
  
  //Parametros interfaz / v-model
  const DHCP = ref(false)
  const ip = ref('')
  const subnet = ref('')
  const gateway = ref('')
  const dns = ref('')

  async function saveInterface() {
  //Validaciones básicas de selección
  if (indexInterface.value === -1) {
    errorModal.value = 'Seleccione una interfaz.'
    return
  } else if (indexInterface.value === 0) {
    errorModal.value = 'La interfaz "lo" (loopback) no se puede configurar.'
    return
  }

  //Validaciones si DHCP está desactivado
  if (!DHCP.value) {
    if (ip.value === '') {
      errorModal.value = 'Ingrese una dirección IP.'
      return
    }
    if (subnet.value === '') {
      errorModal.value = 'Ingrese una máscara de subred.'
      return
    }
    if (gateway.value === '') {
      errorModal.value = 'Ingrese una puerta de enlace.'
      return
    }
  }

  //Limpiar errores
  errorModal.value = ''
  showInterfaceModal.value = false
  //Cálculo del CIDR desde la máscara
  const cidr = maskToCIDR(subnet.value)

  //Conversión de DNS a lista
  const dnsArray = dns.value
    ? dns.value.split(',').map(x => x.trim()).join(', ')
    : ''

  // 🔹 Obtener nombre de la interfaz seleccionada
  const interfaceName = network.value[indexInterface.value].ifaceName
  const dhcpStatus = DHCP.value ? 'true' : 'false'

  //Generación dinámica del archivo Netplan
  const netplanConfig = `
network:
  version: 2
  ethernets:
    ${interfaceName}:
      dhcp4: ${dhcpStatus}${!DHCP.value ? `
      addresses:
        - ${ip.value}/${cidr}
      routes:
        - to: default
          via: ${gateway.value}
      nameservers:
        addresses: [${dnsArray}]` : ''}
`

  // Validación extra (opcional): verificar formato de IP
  if (!validateIP(ip.value) && !DHCP.value) {
    errorModal.value = 'Dirección IP inválida.'
    return
  }
  if (!validateIP(gateway.value) && !DHCP.value) {
    errorModal.value = 'Puerta de enlace inválida.'
    return
  }

  //Guardar y aplicar configuración
    let state = true
    try {
      await saveNetplan(netplanConfig)      
    } catch (err) {
      console.error('Error al guardar/aplicar Netplan:', err)
      state = false
    } finally {      
      notificationStore.add(
        state ? 'success' : 'error',
        'Interfaz de red',
        state
          ? 'Configuración de interfaz guardada exitosamente.'
          : 'Error al guardar la configuración de la interfaz.'
      )
    }
  }


  //Guardar cambios archivo netplan
  async function saveNetplan(configFile) {      
    saving.value = true
    //Revisar sintaxis archivo yaml
    //const check = checkYaml(netplanInfo.value)
    //console.log(check.status)
    
    //if(!check.status){
    //  notificationStore.add(check.status,check.status ? 'Éxito' : "Error", check.message)
    //  saving.value = false
    //  return 
    //}

    let output = ''
    let state = false
    try {
      if (!configFile) {
        output = 'El contenido del archivo no puede estar vacío.'
        throw new Error('El contenido del archivo no puede estar vacío.')
      }
      const response = await fetch(`${apiURL}/api/exec/netplan/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: configFile })
    })
  
    const data = await response.json()
    if (data.success) {
      output = data.output 
      state = true
    }
    else {
      output = data.error || 'Error desconocido al guardar el archivo.'
      state = false
    }    
    
    //Aplicar los cambios en la red
    if(data.success)
      await applyNetplanChanges()
  } catch (err) {
    console.error("Error al guardar Netplan:", err)
  }finally{  
    saving.value = false
    //Enviar notificacion de estado
    notificationStore.add(state ? 'success' : 'error',state ? 'Éxito' : 'Error', state ? 'Los cambios en el archivo de red se guardaron correctamente.' : "Error al guardar los cambios en el archivo de red.")
    //Agregar comando
    CommandPanel.add({
      commands: [
        { command: "sudo nano /etc/netplan/50-netplan.yaml", title: "Editar archivo de red netplan", description: "Utilizando el programa 'nano' se edita el archivo de red. El comando 'sudo' es necesario ya que se requieren privilegios para realizar esta tarea.", output: output },       
      ],
      state: state ? "success" : "error",
      description: 'Editar la configuración de red.',      
    });
  }
  }

  async function applyNetplanChanges() {
    try {
      const res = await fetch(`${apiURL}/api/exec/netplan/apply`, {
        method: "POST"
      })

      const data = await res.json()
      let output = ''
      let state = false
      if (data.success) {
        output = data.output
        state = true
        await loadMetrics() // Recargar métricas después de aplicar cambios
      } else {
        output = data.error || 'Error desconocido al guardar el archivo.'
      }

       //Enviar notificacion de estado
      notificationStore.add(state ? 'success' : 'error',state ? 'Éxito' : 'Error', state ? 'Los cambios en el archivo de red se aplicaron correctamente.' : "Error al aplicar los cambios en el archivo de red.")
      //Agregar comando
      CommandPanel.add({      
      commands: [
        { command: "sudo netplan apply", title: "Aplicar cambios al archivo de red", description: "Utilizando el comando 'netplan' y el parámetro 'apply' se aplican los cambios a la configuración de red del sistema.", output: output },       
      ],
      state: state ? "success" : "error",
      description: 'Aplicar cambios a la configuración de red.',      
    });
    } catch (err) {
      console.error("Error al aplicar Netplan:", err)
    }
  }

  //Peticiones
  import { ref, onMounted, onUnmounted } from 'vue'

  const netplanInfo = ref("")
  const network = ref({ networkData: [] })

  async function loadMetrics() {
    loading.value = true
    try {
      // Ejecutar ambas peticiones en paralelo
      const [resSystem, resNetplan] = await Promise.all([
        fetch(`${apiURL}/api/system`, { cache: "no-store" }),
        fetch(`${apiURL}/api/exec/netplan`, { cache: "no-store" })
      ])

      // Validar respuestas individualmente
      if (!resSystem.ok) throw new Error(`Error HTTP sistema: ${resSystem.status}`)
      if (!resNetplan.ok) throw new Error(`Error HTTP netplan: ${resNetplan.status}`)

      // Parsear JSON de ambas respuestas
      const [systemData, netplanData] = await Promise.all([
        resSystem.json(),
        resNetplan.json()
      ])

      // Asignar valores de forma segura
      network.value = systemData?.network?.networkInfo || {}      
      netplanInfo.value = netplanData?.output || "" // asegurarte de usar el campo correcto
    } catch (err) {
      console.error("Error al obtener métricas del sistema o netplan:", err)
      // Fallbacks seguros para mantener la UI estable
      network.value = { networkData: [] }
      netplanInfo.value = ""
    }
    loading.value = false
  }

  function checkYaml(content){   
    if (!content)
      return {status: false, message: 'El contenido del archivo no puede estar vacío'}

    // Validar sintaxis YAML antes de escribir
    try {
      yaml.load(content)
      return {status: true, message: ""}
    } catch (err) {
      return {
        status: false,
        message: `Error de sintaxis YAML: ${err.message}`
      }
    }
  }

  onMounted(() => {
    loadMetrics()
    // Actualiza cada 5 segundos, solo si el componente está activo    
    //intervalId = setInterval(loadMetrics, 5000)
  })

  onUnmounted(() => {
    // Detener las peticiones al salir de la vista
    /*
    if (intervalId){
      clearInterval(intervalId)
      intervalId = null
    }
      */
  })

  function handleTab(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      const textarea = event.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      // Insertar tabulación (puedes usar '\t' o 2/4 espacios)
      const tab = '\t' // usa '\t' si prefieres tab real
      textarea.value =
        textarea.value.substring(0, start) + tab + textarea.value.substring(end)

      // Mover el cursor después de la tabulación
      textarea.selectionStart = textarea.selectionEnd = start + tab.length

      // Actualizar el modelo (v-model)
      netplanInfo.value = textarea.value
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

  function maskToCIDR(mask) {
  return mask.split('.')
    .map(octet => parseInt(octet, 10).toString(2))
    .join('')
    .split('1').length - 1
  }

  function validateIP(ip) {
    if (!ip) return true // permite vacío si DHCP está activado
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    return regex.test(ip)
  }
  // función para descargar logs
  function download(filename, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

</script>



<style></style>
