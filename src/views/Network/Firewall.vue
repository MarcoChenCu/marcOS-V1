<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Descripcion del modulo-->      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-2">
        Start putting content on grids or panels, you can also use different
        combinations of grids.Please check out the dashboard and other pages
      </p>  
      <div class="flex items-center order-2 justify-between gap-4 mt-4 mb-4" >
        <div class="flex items-center gap-4 mt-4 mb-4">
          <h4><strong>Estado del firewall</strong></h4>
          <ToggleSwitch
            v-model="toggle"
            @toggle-off="showModal = true"
          />
        </div>        
        <button
        @click="showModal = true"
        class="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
        >
        Agregar servicio
      </button>      
    </div>
      
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
              <td v-if="limit==='all'" class="py-3 text-left">
                <Button variant="error" size="md">Cancelar</Button>
              </td>
            </tr>
          </tbody>      
        </table>
      </div>
    </div>
    
    <OkCancelModal
    :visible="showModal"
    title="Desactivar el Firewall"
    description="Esto tiene implicaciones en la seguridad del sistema."
    @close="cancelToggle"
    @save="confirmToggle"
    />
    <StanndarModal
    :visible="ShowServiceModal"
    title="Agregar servicio"
    description="Agregar un servicio al firewall para permitir el trafico."
    @close="ShowServiceModal=false"
    @save="saveService"
    >
    <template #content>
      <h1>hola mundo</h1>
    </template>
    </StanndarModal>
    
    </AdminLayout>
</template>

<script setup>
  import { ref } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
  import OkCancelModal from "@/components/common/OkCancelModal.vue";
  import StanndarModal from "@/components/common/StandarModal.vue";

  const Services = ({})
  const currentPageTitle = ref("Firewall");
  const toggle = ref(false)

  const showModal = ref(false)
  const ShowServiceModal = ref(false)

  const handleSave = () => {
    console.log("Acción confirmada")
    showModal.value = false
  }

  const cancelToggle = () => {
    // Cancelar acción → volver a activar el toggle
    toggle.value = true
    showModal.value = false
  }
  
  const confirmToggle = () => {
    console.log("Firewall desactivado")
    showModal.value = false
  }

  const saveService = ()=>{
    console.log("Servicio guardado")
  }

</script>

<style></style>
