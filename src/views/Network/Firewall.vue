<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Descripcion del modulo-->      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-2">
        El firewall que se utiliza para manipular o decidir 
        el destino del tráfico de red que se dirige hacia o a través de su servidor.
      </p>  
      <!--Fila toggle y boton modal agregar servicio-->
      <div class="flex items-center order-2 justify-between gap-4 mt-4 mb-4">
        <!--Toggle activar/desactivar firewall -->
        <div class="flex items-center gap-4 mt-4 mb-4">
          <h4 class="text-gray-800 dark:text-white/90"><strong>Estado del firewall</strong></h4>
          <ToggleSwitch
            v-model="toggle"
            @toggle-off="showModal = true"
            @toggle-on="firewallEnabled"
          />
          <WarningIcon v-if="!toggle" class="text-warning-500"/>
          <Spinner v-if="loadingFirewall"/>
        </div>
        <!--Modal para agregar servicio-->
        <button
        @click="ShowServiceModal = true"
        class="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">
          Agregar servicio
        </button>
      </div>
      <!--Tabla servicios firewall-->
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table v-if="hasData" class="min-w-full">
          <thead>
            <tr class="border-t border-gray-100 dark:border-gray-800">
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Servicio</p>
              </th>              
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">TCP</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">UDP</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acción</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Desde</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(service, index) in Services"
              :key="service.pid"
              class="border-t border-gray-100 dark:border-gray-800">
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.name }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.tcp }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.udp }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.action }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.from }}</p>
              </td>
              <td class="py-3 text-left">
                <button
                @click = "showRemoveModal(service)"
                class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                >                
                <TrashIcon />
              </button>
              </td>
            </tr>
          </tbody>      
        </table>
        <div v-else class="flex flex-row justify-center min-h-[150px]">            
          <SpinnerComponent/>
        </div>
      </div><!--Fin tabla-->
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
          title="Listar servicios por la terminal"
          text="sudo ufw app list"
        />
      </div>
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
          title="Verificar cambios y estado del Firewall"
          text="sudo ufw status"
        />
      </div>
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <a class="underline cursor-pointer text-brand-500" 
          href="https://documentation.ubuntu.com/server/how-to/security/firewalls/">
          Configuración firewall Ubuntu Server
        </a>
      </div>
    </div>
    <!--Modal desactivacion de firewall-->
    <OkCancelModal
      :visible="showModal"
      title="Desactivar el Firewall"
      description="Esto tiene implicaciones en la seguridad del sistema."
      @close="cancelToggle"
      @save="disableFirewall()"
    />
    <!--Modal eliminacion regla de Firewall-->
    <OkCancelModal
      :visible="showRemoveRuleModal"
      title="Eliminar la regla del Firewall"
      :description='"Esto evitará que la aplicación "+serviceInfo+" reciba tráfico."'      
      @close="showRemoveRuleModal=false"
      @save="removeService"
    />
    <!--Modal formulario agregar servicio-->
    <StandarModal
      :visible="ShowServiceModal"
      title="Agregar servicio"
      description="Agregar un servicio al firewall para permitir el trafico."
      @close="ShowServiceModal=false"
      @save="saveService"         
    >
      <!--Contenido del modal-->
      <template #content>        
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Servicio
          </label>
          <input
            v-model="serviceName"
            type="text"            
            placeholder="Nombre del servicio o número de puerto. Ejemplo: Apache o 80"  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
            El nombre se encuentra en la documentación oficial del servicio.
          </label>
          <p v-if="errorModal" class="mt-1.5 text-theme-xs text-error-500">El campo no puede ser vacío.</p>
        </div>
        <!--Copiar comando-->
        <div class="mt-4">
          <CopytoClipboard
            text='sudo ufw allow Servicio'
            title="Agregar el servicio por la terminal"   
            comment="Si se desea agregar por puerto sería: sudo ufw allow 80"         
          />
        </div>
      </template>
    </StandarModal>
  </AdminLayout>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
  import OkCancelModal from "@/components/common/OkCancelModal.vue";
  import StandarModal from "@/components/common/StandarModal.vue";
  import CopytoClipboard from "@/components/common/CopytoClipboard.vue";
  import { notificationStore } from "@/stores/notificationStore";
  import { useCommandPanel } from "@/stores/commandPanel";
  import { OptionIcon, Spinner, WarningIcon, TrashIcon } from "@/icons";
  import SpinnerComponent from "@/components/common/Spinner.vue";

  const currentPageTitle = ref("Firewall");
  const CommandPanel = useCommandPanel();
  const apiURL = import.meta.env.VITE_API_URL
  
  //Agregar servicio modal
  const ShowServiceModal = ref(false)
  const showRemoveRuleModal = ref(false)
  const serviceInfo = ref('')
  
  onMounted(() => {
    getFirewallStatus();
  })
  //Servi
  const Services = ref({})
  const hasData = computed(() => (Services.value?.length > 0))

  /**Administrar servicios */
  //Modal eliminar servicio
  const showRemoveModal = (service) => {
    // Asegurarse de trabajar con string y eliminar el sufijo " (v6)" si existe
    let cleaned = service
    if (typeof service === 'string') {
      // Elimina espacios opcionales y la parte "(v6)" al final (case-insensitive)
      cleaned = service.replace(/\s*\(v6\)\s*$/i, '')
    }
    serviceInfo.value = cleaned
    showRemoveRuleModal.value = true
  }
  // Eliminar servicio
  async function removeService() {

    let currentService = '' 
    if(serviceInfo.value.name!='-' && serviceInfo.value.name!='v6'){
      currentService = serviceInfo.value.name?.trim()
    }else if(serviceInfo.value.tcp!='-'){
      currentService = serviceInfo.value.tcp?.trim()
    }
    else if(serviceInfo.value.udp!='-'){
      currentService = serviceInfo.value.udp?.trim()
    }
    let data = {}

    showRemoveRuleModal.value = false

    try {
      if (!currentService) {
        notificationStore.add('error', 'Firewall', 'Debe especificar un servicio válido para eliminar.')
        return
      }

      const res = await fetch(`${apiURL}/api/exec/ufw/allow-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: currentService })
      })

      data = await res.json()

      if (data.success) {
        notificationStore.add('success', 'Firewall', `Se ha eliminado la regla del firewall para el servicio ${currentService}.`)
        await getFirewallStatus()
      } else {
        notificationStore.add('error', 'Firewall', data.message || 'Error al intentar eliminar la regla del firewall.')
      }
    } catch (err) {      
      notificationStore.add('error', 'Firewall', 'Error interno al ejecutar la acción.')
    } finally {
      // Validar datos
      const commandOutput = data.output || 'Sin salida del comando'

      CommandPanel.add({
        commands: [
          {
            command: 'sudo ufw delete allow ' + currentService,
            title: 'Eliminar regla del firewall.',
            description: "Con privilegios se ejecuta el firewall 'ufw' con el parámetro 'delete allow' para eliminar la regla especificada.",
            output: commandOutput,
          },
        ],
        state: data.success ? 'success' : 'error',
        description: 'Eliminar regla del firewall.',
      })
      
      serviceInfo.value = ''
    }
  }


  //Guardar servicio
  const serviceName = ref('')
  const errorModal = ref(false)
  // Agregar servicio
  async function saveService() {
    let data = {}
    const currentService = serviceName.value.trim() 

    try {
      if (!currentService) {
        errorModal.value = true
        return
      }

      const res = await fetch(`${apiURL}/api/exec/ufw/allow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: currentService })
      })

      data = await res.json()

      if (data.success) {
        notificationStore.add('success', 'Firewall', 'Se ha agregado la regla al firewall.')
        await getFirewallStatus()
      } else {
        notificationStore.add('error', 'Firewall', data.message || 'Error al intentar agregar la regla.')
      }
    } catch (err) {
      console.error(' Error en saveService:', err)
      notificationStore.add('error', 'Firewall', 'Error interno al ejecutar la acción.')
    } finally {
      // Siempre aseguramos que data esté definido
      const commandOutput = data.output || ''

      CommandPanel.add({
        commands: [
          {
            command: 'sudo ufw allow ' + currentService,
            title: "Agregar regla al firewall.",
            description:
              "Con privilegios se ejecuta el firewall 'ufw' con el parámetro 'allow' para agregar la regla especificada.",
            output: commandOutput
          },
        ],
        state: data.success ? 'success' : 'error',
        description: "Agregar regla al firewall.",
      })
      
      ShowServiceModal.value = false
      serviceName.value = ''
    }
  }
  
  /**Firewall */
  //ToggleSwitch/Modal Activar/Desactivar firewall
  const toggle = ref(false)
  const showModal = ref(false)
  const loadingFirewall = ref(false)

  //Cancelar desactivacion del firewall
  const cancelToggle = () => {
    // Cancelar acción → volver a activar el toggle
    toggle.value = true
    showModal.value = false
  }
  //Activar el firewall
  async function firewallEnabled() {
    await toggleFirewall('enable')
  }
  //Desactivar el firewall
  async function disableFirewall() {
    showModal.value = false
    await toggleFirewall('disable')
  }
  //Obtener el estado del firewall
// Obtener estado y reglas del firewall
  async function getFirewallStatus() {
    let generalStatus = 'error';
    let output = '';
    let rulesList = [];

    const res = await modFirewall('ufw-status-verbose');

    if (res.success) {
      output = res.output;
      const lowerOutput = output.toLowerCase();

      // Detectar si está activo
      const isActive = lowerOutput.includes('status: active');
      toggle.value = isActive;

      // Parsear reglas desde la salida del comando
      const lines = output.split('\n');

      // Buscar la línea donde comienza la tabla ("To  Action  From")
      const startIndex = lines.findIndex(line =>
        line.includes('To') && line.includes('Action') && line.includes('From')
      );

      if (startIndex !== -1) {
        const ruleLines = lines.slice(startIndex + 2); // Saltar encabezados

        for (const line of ruleLines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // Separar columnas por múltiples espacios
          const parts = trimmed.split(/\s{2,}/);
          if (parts.length >= 3) {
            const [to, action, from] = parts;

            let name = '-';
            let tcp = '-';
            let udp = '-';
            let port = '-';

            // Extraer texto dentro de paréntesis → nombre del servicio
            const nameMatch = to.match(/\(([^)]+)\)/);
            if (nameMatch) name = nameMatch[1];

            // Detectar si hay puerto explícito
            const portMatch = to.match(/\d{1,5}/);
            if (portMatch) port = portMatch[0];

            // Determinar protocolo
            if (to.includes('/tcp')) {
              tcp = port;
            } else if (to.includes('/udp')) {
              udp = port;
            } else if (port !== '-') {
              // Si tiene puerto pero no indica protocolo, asumimos ambos
              tcp = port;
              udp = port;
            }
            if(name[name.length-1]==='6' && name.length>2) name = name+')'
            rulesList.push({ name, port, tcp, udp, action, from });
          }
        }
        Services.value = rulesList;
        console.log(Services.value)
        generalStatus = 'success';
      } else {
        output = res.error;
      }
    }

    // Enviar al panel
    CommandPanel.add({
      commands: [
        {
          command: 'sudo ufw status verbose',
          title: 'Obtener el estado detallado del firewall.',
          description:
            "Con privilegios se ejecuta el firewall 'ufw' con los parámetros 'status' y 'verbose' para obtener las reglas activas.",
          output,
        },
      ],
      state: generalStatus,
      description: 'Obtener el estado del firewall.',
    });
  }


  //Activar/desactivar el firewall
  async function toggleFirewall(action) {
    const command = action === 'enable' ? 'ufw-enable' : 'ufw-disable'
    const res = await modFirewall(command)
    const success = res?.success
    const output = res?.output || res?.error || ''

    const title = action === 'enable' ? 'Activar el firewall ufw' : 'Desactivar el firewall ufw'
    const desc = action === 'enable' ? 'Se ha activado el firewall.' : 'Se ha desactivado el firewall.'
    const commandDesc = action === 'enable' ? "Con privilegios se activa el firewall 'ufw' con el parametro 'enable'" : "Con privilegios se desactiva el firewall 'ufw' con el parametro 'disable'"
    const level = action === 'enable' ? 'success' : 'warning'    

    if (success) {
      notificationStore.add(level, 'Seguridad de la red', desc)
      toggle.value = (action === 'enable')
    } else {
      notificationStore.add('error', 'Error', 'Error al intentar administrar el firewall.')
      toggle.value = !(action === 'enable')
    }

    CommandPanel.add({
      commands: [{ command: `sudo ufw ${action}`, title, description: commandDesc, output: output || '' }],
      state: success ? 'success' : 'error',
      description: desc,
    })
  }

  //Realizar peticion para el firewall
   async function modFirewall(command) {
    try {
      loadingFirewall.value = true
      const res = await fetch(`${apiURL}/api/exec/ufw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: command }),
      })      
      // Si la respuesta no es correcta, lanzar error
      if (!res.ok) {throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)}

      // Verifica que las respuestas sean válidas antes de procesarlas
      const data = await res.json();
      return data
    } catch (err) {
      console.error("Error al modificar el firewall:", err)
      return {success: false, error: err.message}
    }
    finally{
      loadingFirewall.value = false
    }
  }

</script>

<style></style>
