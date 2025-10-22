<template>
  <!-- ORIGINAL -- class="fixed bottom-0 left-0 w-full z-[999] border-t bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-t" --> 
  <!-- AppHeader -- class="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b"-->
  <div
    class="fixed bottom-0 left-0 z-[999] border-t bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 transition-all duration-300 ease-in-out"
    :class="[isExpanded || isHovered ? 'lg:left-[290px] w-[calc(100vw-290px)]' : 'lg:left-[90px] w-[calc(100vw-90px)]']"
    :style="{ height: `${height}px` }">

    <splitpanes
      horizontal
      class="default-theme"
      :dbl-click-splitter="false"
      @resize="onResize"
    >
      <pane>
        <div class="flex flex-col h-full">
          <!-- Header de la barra -->
          <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <h1 class="font-semibold text-gray-800 dark:text-white/90">Consola del sistema</h1><!--Titulo muy a la izquierda-->            
            <!--Boton expandir panel-->
            <button
              @click="toggleCollapse"
              class="rounded-lg bg-brand-500 px-2 py-1 text-white hover:bg-brand-600">
              <!--Icono expandir-->
              <ChevronDownIcon
                :class="[
                  'ml-auto w-5 h-5 transition-transform duration-200',{'rotate-180': collapsed},
                ]"/>
            </button><!--Boton visible-->
          </div><!--Fin header-->

          <!-- Contenido -->
          <div class="flex-1 overflow-y-auto px-4 py-2 text-xs font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900">
            <div class="max-w-full overflow-x-auto custom-scrollbar">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Hora</p>
                    </th>
                    <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Usuario</p>
                    </th>
                    <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comandos</p>
                    </th>            
                    <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Estado</p>
                    </th>
                    <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                      <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Descripción</p>
                    </th>            
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <!--Fila - Ciclo de los comandos/acciones -->
                  <tr
                    v-for="(command, index) in CommandList"
                    :key="index"
                    class="border-t border-gray-100 dark:border-gray-800"
                  >
                    <!--Fecha en formato estandar-->
                    <td class="px-5 py-4 sm:px-6">
                      <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ command.datetime }}</p>
                    </td>
                    <!--Nombre de usuario-->
                    <td class="px-5 py-4 sm:px-6">
                      <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ command.user }}</p>
                    </td>
                    <!--Comandos-->
                    <td class="px-5 py-4 sm:px-6">              
                      <!--Aqui deberia haber un ciclo for para los comandos-->
                      <div                  
                        class="flex flex-col gap-2">
                        <p
                        v-for="(commandEx, i) in command.commands"
                        :key="i"
                        class="text-gray-500 text-theme-sm dark:text-gray-400"
                        >{{ commandEx.command }}</p>                
                      </div>              
                    </td>
                    <!--Estado - Reconfigurar para mostrar facilmente el resultado de la ejecucion-->
                    <td class="px-5 py-4 sm:px-6">
                      <span
                        :class="[
                          'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                          {
                            'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                              command.state === 'success',
                            'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                              command.state === 'error',
                          },
                        ]"
                      >
                        {{ command.state ==='success' ? 'Éxito' : 'Error' }}
                      </span>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ command.description }}</p>
                    </td>
                    <!--Llamar modal-->
                    <td class="px-4 py-4 sm:px-6">
                      <button
                      @click="showInfoModal=true"
                      class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                    >
                    <InfoIcon/>
                    </button><!--Boton visible-->
                    </td>
                    <!--Modal info comandos-->
                    <CommandModal
                      :visible="showInfoModal"
                      description=""
                      @close="showInfoModal=false"
                      :commandInfo="command"
                      :commandList="command.commands"
                    />
                    <!--Fin modal-->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </pane>
    </splitpanes>    
  </div>
  <!--Modal formulario agregar servicio-->
 
</template>

<script setup>
import { ref, watch } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import { ChevronDownIcon, InfoIcon } from "../../icons";
import CommandModal from '../StatusPanel/CommandModal.vue'

const showInfoModal = ref(false)

const props = defineProps({
  isExpanded: Boolean,
  isHovered: Boolean
})

const CommandList =[
  {
    datetime: '22/10/25 14:28:55', 
    user: 'marco', 
    commands:[
      {
        command: 'sudo apt update',
        title: 'Actualizar el sistema',
        description: 'Comando para actualizar los repositorios.'
      }
    ],
    state: 'success',
    description: 'Actualizacion de paquetes antes de instalar software o acutalizaciones del sistema.'    
  },
  {
    datetime: '20/10/25 08:28:55', 
    user: 'root', 
    commands:[
      {
        command: 'cat /var/log/auth.log',
        title: 'Leer registro',
        description: 'Con el comando "cat" se lee un archivo en la ruta específicada.'
      }
    ],
    state: 'success',
    description: 'Lectura del registro de autenticación.'
  },
  {
    datetime: '12/08/25 08:28:55', 
    user: 'sumit', 
    commands:[
      {
        command: 'cat /var/log/auth.log',
        title: 'Leer registro',
        description: 'Con el comando "cat" se lee un archivo en la ruta específicada.'
      }
    ],
    state: 'error',
    description: 'Lectura del registro de autenticación.'
  },
  {
    datetime: '12/08/25 08:28:55', 
    user: 'sumit', 
    commands:[
      {
        command: 'sudo nano /etc/netplan/50-netplan.yaml',
        title: 'Editar archivo de red',
        description: 'Modificar el archivo de red con el el editor "nano". El comando "sudo" es necesario porque se requieren privilegios para realizar esta accion.'
      },
      {
        command: 'sudo netplan apply',
        title: 'Aplicar cambios de red',
        description: 'Con privilegios se aplican los cambios en el archivo de red.'
      }
    ],
    state: 'success',
    description: 'Modificacion del archivo de red y aplicacion de cambios.'
  }
]

const height = ref(200)
const collapsed = ref(false)
const emit = defineEmits(['update:height'])

watch(height, (val) => emit('update:height', val))

function toggleCollapse() {
  collapsed.value = !collapsed.value
  height.value = collapsed.value ? 40 : 200
}

function onResize(e) {
  const pane = e[0]
  if (pane?.size) {
    const viewportHeight = window.innerHeight
    height.value = (viewportHeight * pane.size) / 100
  }
}
</script>


<style scoped>
.splitpanes__pane {
  display: flex;
  flex-direction: column;
  background: transparent;
}

/* Ajuste visual del "splitter" horizontal */
.splitpanes.default-theme.splitpanes--horizontal > .splitpanes__splitter {
  height: 6px;
  cursor: row-resize;
  background: rgba(100, 100, 100, 0.2);
  transition: background 0.2s;
}
.splitpanes.default-theme.splitpanes--horizontal > .splitpanes__splitter:hover {
  background: rgba(100, 100, 100, 0.4);
}
</style>
