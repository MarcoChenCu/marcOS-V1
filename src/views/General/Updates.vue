<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenedor principal-->
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">            
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Aquí puede gestionar las actualizaciones del sistema. Mantenga su sistema al día para contar con las últimas características y mejoras de seguridad.<br></br>
        Actualice primero los repositorios para obtener la lista más reciente de paquetes disponibles y luego actualice el sistema para instalar las últimas versiones de los paquetes instalados.
      </p>
      <!--Fila botones-->
      <div class="flex items-center mt-4 mb-4 gap-4">
          <Button @click="manageUpdates('update'); updatingRepos = true " :disabled="updatingSystem" variant="primary" size="md">
            <div v-if="updatingRepos"><!--Configurar spinner al guardar-->
              <SpinnerIcon width="15" height="15" />
            </div>
              Actualizar repositorios
          </Button>
          <Button @click="manageUpdates('upgrade'); updatingSystem = true" :disabled="updatingRepos" variant="primary" size="md">
            <div v-if="updatingSystem"><!--Configurar spinner al guardar-->
              <SpinnerIcon width="15" height="15" />
            </div>
              Actualizar sistema
          </Button>                    
        </div><!--Fila botones-->
          <!--Contenido del registro-->
        <h3 class="mb-2 mt-6 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Actualizaciones disponibles
        </h3>
        <div>
          <textarea
          v-model="updatesAvailable"
          ref="updatesRef"
          v-if="!updateList"
          placeholder="[Sin actualizaciones disponibles]"        
          rows="15"
          readonly
          spellcheck="false"
          class="mt-2 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
          ></textarea>
          <Spinner v-else :size="30" />
        </div>
    </div><!--Contenedor principal-->
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import Button from "@/components/ui/Button.vue";
import SpinnerIcon from "@/icons/Spinner.vue";
import Spinner from "@/components/common/Spinner.vue";
import { notificationStore } from "@/stores/notificationStore";
import { useCommandPanel } from "@/stores/commandPanel";

const currentPageTitle = ref("Actualizaciones");
const CommandPanel = useCommandPanel();
const apiURL = import.meta.env.VITE_API_URL

const updatingRepos = ref(false);
const updatingSystem = ref(false);
const updateList = ref(false);

const updatesAvailable = ref("");
const updatesRef = ref(null);

// función genérica para mover scroll al final
  async function scrollToBottom(textareaRef) {
    await nextTick() // aseguramos que el DOM ya se actualizó
    if (textareaRef.value) {
      textareaRef.value.scrollTop = textareaRef.value.scrollHeight
    }
  }
  //Listar actualizaciones disponibles
  async function listAvailableUpdates() {
    if(updateList.value) return;
    updateList.value = true;
    scrollToBottom(updatesRef);
    const response = await execUpdate("update-list")    
    updatesAvailable.value = response.output || 'No se encontraron actualizaciones disponibles.';
    // Agregar entrada al Command Panel
    CommandPanel.add({
      commands: [{
        command: 'sudo apt list --upgradeable',
        title: 'Listar actualizaciones disponibles.',
        description: "Con privilegios se ejecuta el gestor de paquetes 'apt' con el parámetro 'list --upgradeable' para listar las actualizaciones disponibles.",
        output: response.output || '',
      }],
      state: response.success ? 'success' : 'error',
      description: 'Listar actualizaciones disponibles.',
    })
    updateList.value = false;
  }
  //Funcion para ejecutar update o upgrade
  async function manageUpdates(command){
    if(updatingSystem.value || updatingRepos.value) return;
    const response = await execUpdate(command);
    if(response.success)
      await listAvailableUpdates();
    //notificacion
    notificationStore.add(response.success ? 'success' : 'error', 'Actualización del sistema',response.message)
    //registro en command panel

    let titleCommand = command === 'update' ? 'Actualizar repositorios' : 'Actualizar sistema';
    let descriptionCommand = command === 'update' ? "Con privilegios se ejecuta el gestor de paquetes 'apt' con el parámetro 'update' para actualizar los repositorios del sistema." : "Con privilegios se ejecuta el gestor de paquetes 'apt' con el parámetro 'upgrade' para actualizar el sistema.";
    let description = command === 'update' ? 'Actualizar lista local de repositorios.' : 'Instalar actualizaciones.';
    CommandPanel.add({
      commands: [{
        command: 'sudo apt '+command,
        title: titleCommand,
        description: descriptionCommand,
        output: response.output,
      }],
      state: response.success ? 'success' : 'error',
      description: description,
    })
  updatingRepos.value = false;
  updatingSystem.value = false;
  }
  //funcion para ejecutar comandos de actualizacion
  async function execUpdate(command){
    let response = {success:false, message:"Error", output: ""}
    try {      
      let method = "POST"
      if(command==="update-list") method="GET"
      const res = await fetch(`${apiURL}/updates/${command}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
      })
      // Si la respuesta no es correcta, lanzar error
      //if (!res.ok) {throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)}
        // Verifica que las respuestas sean válidas antes de procesarlas
        response = await res.json();
    } catch (err) {
      response = {success: false, message:'Error actualizaciones del sistema.', output: response.output || err.message}
    }

    finally{
      return response
    }
  }


  onMounted(() => {
    //listAvailableUpdates();
  });


</script>

<style></style>
