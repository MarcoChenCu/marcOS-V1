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
        <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-100 dark:border-gray-800">
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Servicio</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Descripción</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">TDP</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">UDP</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(service, index) in Services"
              :key="service.pid"
              class="border-t border-gray-100 dark:border-gray-800">
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.pid }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.description }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.name }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.command }}</p>
              </td>
              <td class="py-3 text-left">
                <button                        
                class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
              >
                <OptionIcon />
              </button>
              </td>
            </tr>
          </tbody>      
        </table>
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
            type="text"
            placeholder="Nombre del servicio (sin comillas). Ejemplo: Apache"  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
            El nombre se encuentra en la documentación oficial del servicio.
          </label>
        </div>        
        <div class="mt-4">
          <CopytoClipboard
            text='sudo ufw allow "Servicio"'
            title="Agregar el servicio por la terminal"
            comment="*Se incluyen las comillas al nombre."
          />
        </div>
      </template>
    </StandarModal>
  </AdminLayout>
</template>

<script setup>
  import { ref } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
  import OkCancelModal from "@/components/common/OkCancelModal.vue";
  import StandarModal from "@/components/common/StandarModal.vue";
  import CopytoClipboard from "@/components/common/CopytoClipboard.vue";
  import { notificationStore } from "@/stores/notificationStore";
  import { useCommandPanel } from "@/stores/commandPanel";
  import { OptionIcon } from "@/icons";

const CommandPanel = useCommandPanel();

  const Services = [{
    pid: "1",
    description: "Servidor web",
    name: "Apache",
    command: "nosexd"
  }]
  const currentPageTitle = ref("Firewall");
  const toggle = ref(false)

  const showModal = ref(false)
  const ShowServiceModal = ref(false)

  const cancelToggle = () => {
    // Cancelar acción → volver a activar el toggle
    toggle.value = true
    showModal.value = false
  }
  
  async function disableFirewall() {
    showModal.value = false
    let status = 'error';
    let output = '';
    const res = await modFirewall("ufw-disable");
    console.log("res function",res)
    if(res.success){
      status = "success",
      output = res.output
      notificationStore.add('warning', 'Seguridad de la red', 'Se ha desactivado el firewall.')
    }else{      
      notificationStore.add('error', 'Error', 'Error al intentar administar el firewall.')
      output = res.error
    }

    CommandPanel.add({      
        commands: [
          { command: "sudo ufw disable", title: "Desactivar el firewall ufw", description: "Con privilegios se desactiva el firewall 'ufw' con el parametro 'disable'" },
        ],
        state: status,
        description: "Desactivar el firewall.",
        output: output
      });    
  }

  async function firewallEnabled(){
    let status = 'error';
    let output = 'error';
    const res = await modFirewall('ufw-enable');
    console.log('res enable ufw',res)
    if(res.success){      
      status = "success";
      output = res.output;
      notificationStore.add('success', 'Seguridad de la red', 'Se ha activado el firewall.')
    }else{
      output = res.error
      notificationStore.add('error', 'Error', 'Error al intentar administar el firewall.')
    }
    //Agregar el comando
    CommandPanel.add({
        commands: [
          { command: "sudo ufw enable", title: "Activar el firewall ufw", description: "Con privilegios se activa el firewall 'ufw' con el parametro 'enable'" },
        ],
        state: status,
        description: "Activar el firewall.",
        output: output
      });
  }

  const saveService = ()=>{
    console.log("Servicio guardado")
    ShowServiceModal.value = false
  }
  const apiURL = import.meta.env.VITE_API_URL
  //Realizar peticion para el firewall

   async function modFirewall(command) {
    try {
      const res = await fetch(`${apiURL}/api/exec`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: command }),
      })      
      // Si la respuesta no es correcta, lanzar error
      if (!res.ok) throw new Error(`Error HTTP: ${res.message}`)
      // Verifica que las respuestas sean válidas antes de procesarlas
      const data = await res.json();       
      return data
    } catch (err) {
      console.error("Error al modificar el firewall:", err)      
    }
  }

</script>

<style></style>
