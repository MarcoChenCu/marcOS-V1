<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenido principal-->
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Descripcion del modulo-->      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-2">
        Desde este módulo puede administrar los usuarios del sistema. Puede agregar nuevos usuarios y eliminar usuarios existentes. Asegúrese de manejar los usuarios con precaución para mantener la seguridad del sistema.
      </p>  
      <!--Fila toggle y boton modal agregar servicio-->
      <div class="flex items-end order-2 gap-4 mt-4 mb-4" >
        <!--Modal para agregar usuarios-->
        <Button
        @click="showUserModal = true"
        :disabled="creating"
        class="rounded-lg bg-brand-500 px-2 py-2 text-white hover:bg-brand-600">
        <Spinner v-if="creating" height="15" width="15" />
          {{ creating ? 'Creando...' : 'Agregar usuario' }}
        </Button>
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
        <table v-if="!loading" class="min-w-full">
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
              v-for="(user, index) in usersList"
              :key="user.uid"
              class="border-t border-gray-100 dark:border-gray-800">
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.uid }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.username }}</p>
              </td>
              <td class="py-3 whitespace-nowrap">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ user.name }}</p>
              </td>              
              <td class="py-3 text-left">
                <button
                  @click = "showRemoveModal = true; userInfo = user"
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
      <p class="mt-8 text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-2">
        Agregar usuarios desde la terminal con 
        <strong>adduser</strong>.
      </p> 
      <div class="mx-auto w-full max-w-[630px] text-center mt-4 mb-4">
        <CopytoClipboard
          title="Agregar usuario al sistema"
          text="sudo adduser usuario"
          comment="Reemplace 'usuario' por el nombre del usuario que desea agregar que debe ser único, sin espacios, carácteres especiales o mayúsculas."
        />
      </div>
      <p class="mt-8 text-sm text-gray-500 dark:text-gray-400 sm:text-base mb-2">
        Este comando proporciona una forma más interactiva de crear usuarios, Ingrese primero su contraseña y la confirmación. Luego, ingrese el nombre de usuario y puede proporcionar información adicional como número de habitación, teléfono de trabajo, teléfono de casa y otro. Puede dejar estos campos en blanco si lo desea. Finalmente, confirme la información ingresada.
      </p>
    </div><!--Fin contenido principal-->
    <!--Modal formulario agregar Usuario-->
    <StanndarModal
    :visible="showUserModal"
    title="Agregar usuario"
    description="Agregar un usuario al sistema."
    @close="showUserModal=false"
    @save="saveUser()"
    >
      <!--Contenido del modal-->
      <template #content>        
        <div class="mb-2"><!--Usuario-->
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Nombre de usuario
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Ejemplos: pedro1, pedro, p3dro."  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />          
          <label class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600">
            *El usuario debe ser único, en minúsculas, sin espacios o carácteres especiales.
          </label>
        </div><!--fin usuario-->
        <div class="mb-2"><!--Nombre completo-->
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Nombre
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="Nombre de usuario. Ejemplo: Pedro Ruiz."  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />                    
        </div><!--fin nombre completo-->
        <div class="mb-2"><!--Contraseña-->
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Contraseña
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña del usuario."  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div><!--fin contraseña-->
        <div class="mb-2"><!--Contraseña-->
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Confirmar contraseña
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña."  
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div><!--fin contraseña-->
        <label class="mb-1.5 block text-sm font-medium text-red-400 dark:text-red-600">            
          {{ errorCreateUser }}
        </label>
      </template>
    </StanndarModal>
    <!--Modal eliminacion regla de Firewall-->
    <OkCancelModal
      :visible="showRemoveModal"
      title="Eliminar usuario"
      :buttonText="'Eliminar'"
      :description='"Esto eliminará al usuario "+userInfo.username+" (UID: "+userInfo.uid+") del sistema incluyendo su directorio home."'      
      @close="showRemoveModal=false"
      @save="removeUser()"
    />
    
    </AdminLayout>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import StanndarModal from "@/components/common/StandarModal.vue";  
  import OkCancelModal from "@/components/common/OkCancelModal.vue";
  import CopytoClipboard from "@/components/common/CopytoClipboard.vue";
  import SpinnerComponent from "@/components/common/Spinner.vue";
  import Button from "@/components/ui/Button.vue";
  import { notificationStore } from "@/stores/notificationStore";
  import { useCommandPanel } from "@/stores/commandPanel";
  import { TrashIcon,Spinner } from "@/icons";
  
  const usersList = ref({})

  const currentPageTitle = ref("Usuarios");
  const commandPanel = useCommandPanel();
  const apiURL = import.meta.env.VITE_API_URL;
  
  //Mostrar modales
  const showUserModal = ref(false)
  const showRemoveModal = ref(false)

  //userinfo para eliminar usuario
  const userInfo = ref('')

  //valores modal crear usuario
  const username = ref("")
  const name = ref("")
  const password = ref("")
  const confirmPassword = ref("")
  const errorCreateUser = ref("")

  //
  const loading = ref(false)
  const creating = ref(false)

  //Guardar usuario
  async function saveUser() {
    creating.value = true
    //Verificar que el usuario no sea vacío, tenga mayúsculas, espacios o caracteres especiales
    if(username.value.trim() === "" || /[A-Z]/.test(username.value) || /\s/.test(username.value) || /[^a-zA-Z0-9]/.test(username.value)){
      errorCreateUser.value = "El nombre de usuario no puede estar vacío, contener mayúsculas, espacios o caracteres especiales."
      return
    }
    //Verificar que las contraseñas coincidan y no sean vacías
    if(password.value !== confirmPassword.value || password.value.trim() === ""){
      errorCreateUser.value = "Las contraseñas no coinciden o están vacías."
      return
    }
    
    showUserModal.value = false
    //Realizar petición para crear usuario
    let data = {success: false, message: 'Error inesperado al crear el usuario', output: 'ERROR'};    
    try {
      const response = await fetch(`${apiURL}/users/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username.value, name: name.value, password: password.value}),
      });
      data = await response.json();
      if(data.success){
        //Actualizar lista de usuarios
        getUsers();
      }
    } catch (error) {
      console.log(error)
      data = {success: false, message: 'Error al crear el usuario.', output: error.message};
    } finally {
      notificationStore.add(data.success ? 'success' : 'error', 'Creando usuario',data.message)
      
       commandPanel.add({
        commands: [
          {
            command: 'sudo useradd -m -c "'+name.value+'" -s /bin/bash '+username.value,
            title: 'Crear usuario',
            description: 'Con privilegios se ejecuta el comando \'useradd\' para crear un nuevo usuario del sistema. Agregando entre comillas el nombre: "'+name.value+'", y el nombre de usuario: '+username.value+'.',
            output: data.output,
          },
          {
            command: 'echo "'+username.value+':contraseña" | sudo chpasswd',
            title: 'Establecer contraseña',
            description: 'Con privilegios se ejecuta el comando \'chpasswd\' para establecer la contraseña del usuario '+username.value+'.',
            output: '',
          },
        ],
        state: data.success ? 'success' : 'error',
        description: 'Crear usuario',
      })
      creating.value = false
      //Restablecer mensaje de error
      errorCreateUser.value = ""
    }
  }
  //Eliminar usuario
  async function removeUser() {      
    showRemoveModal.value = false
    //Realizar petición para eliminar usuario
    let data = {success: false, message: 'Error inesperado al eliminar el usuario', output: 'ERROR'};
    try {
      const response = await fetch(`${apiURL}/users/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: userInfo.value.username }),
      });
      data = await response.json();
      if(data.success){
        //Actualizar lista de usuarios
        getUsers();
      }
    } catch (error) {
      console.log(error)
      data = {success: false, message: 'Error al eliminar el usuario.', output: error.message};
    } finally {
      notificationStore.add(data.success ? 'success' : 'error', 'Eliminando usuario',data.message)

       commandPanel.add({
        commands: [{
          command: 'sudo userdel -r '+userInfo.value.username,
          title: 'Eliminar usuario',
          description: 'Con privilegios se ejecuta el comando \'userdel\' para eliminar un usuario del sistema. Se utiliza la opción -r para eliminar también el directorio home del usuario.',
          output: data.output,
        }],
        state: data.success ? 'success' : 'error',
        description: 'Eliminar usuario',
      })
      creating.value = false
      //Restablecer mensaje de error
      errorCreateUser.value = ""
    }
  }

  //Realizar peticion para obtener usuarios
   async function getUsers() {
    try {
      loading.value = true
      const res = await fetch(`${apiURL}/users/list`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },        
      })      
      // Si la respuesta no es correcta, lanzar error
      if (!res.ok) {throw new Error(`Error HTTP ${res.status}: ${res.statusText}`)}

      // Verifica que las respuestas sean válidas antes de procesarlas
      const data = await res.json();
      usersList.value = data.users;      
    } catch (err) {      
      console.error("Error fetching users:", err);
    }
    finally{
      loading.value = false
    }
  }
  onMounted(() => {
    getUsers();
  })

</script>

<style></style>
