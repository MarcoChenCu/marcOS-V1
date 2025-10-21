<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Descripcion del modulo-->      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-2">
        Usuarios del sistema.
      </p>  
      <!--Fila toggle y boton modal agregar servicio-->
      <div class="flex items-end order-2 gap-4 mt-4 mb-4" >
        <!--Modal para agregar usuarios-->
        <button
        @click="showUserModal = true"
        class="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">
          Agregar usuario
        </button>
        <!--Modal para agregar grupos-->
        <!-- Agregar grupos para la version 2
          <button
          @click="showGroupModal = true"
          class="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">
          Agregar grupos
        </button>
        -->
      </div>
      <!--Tabla usuarios-->
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-100 dark:border-gray-800">
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">ID</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Usuario</p>
              </th>
              <th class="py-3 text-left">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombre</p>
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
              <td v-if="limit==='all'" class="py-3 text-left">
                <Button 
                class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-green-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                variant="error" 
                size="md">
                  Acciones                  
                </Button>
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
    </div>
    <!--Modal formulario agregar Usuario-->
    <StanndarModal
    :visible="showUserModal"
    title="Agregar usuario"
    description="Agregar un usuario al sistema."
    @close="showUserModal=false"
    @save="saveUser"
    >
      <!--Contenido del modal-->
      <template #content>        
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Nombre de usuario
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario. En minúsculas, sin espacios o carácteres especiales."  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />          
          <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
            *El usuario debe ser único.
          </label>
        </div>        
        <div class="mt-4">
          <CopytoClipboard
            text='sudo adduser'
            title="Agregar el usuario por la terminal"
          />
        </div>
      </template>
    </StanndarModal>
    
    </AdminLayout>
</template>

<script setup>
  import { ref } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import StanndarModal from "@/components/common/StandarModal.vue";
  import CopytoClipboard from "@/components/common/CopytoClipboard.vue";

  const Services = ({    
    pid: "1",
    description: "Servidor web",
    name: "Apache",
    command: "nosexd"
  })
  const currentPageTitle = ref("Usuarios");
  
  //Mostrar modales
  const showUserModal = ref(false)
  const showGroupModal = ref(false)

  //Guardar usuario
  const saveUser = () => {
    console.log("Usuario guardado")
    showUserModal.value = false
  }
  //Guardar grupo
  const SaveGroup = () => {
    console.log("Grupo guardado")
    showGroupModal.value = false
  }

</script>

<style></style>
