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
            <h1 class="font-semibold text-gray-800 dark:text-white/90">Registro de comandos</h1><!--Titulo muy a la izquierda-->            
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
                  <tr
                    v-for="(command, index) in CommandList"
                    :key="index"
                    class="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td class="px-5 py-4 sm:px-6">
                      <p class="text-gray-500 dark:text-gray-400">{{ command.datetime }}</p>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <p class="text-gray-500 dark:text-gray-400">{{ command.user }}</p>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <div class="flex flex-col gap-1">
                        <p
                          v-for="(cmd, i) in command.commands"
                          :key="i"
                          class="text-gray-500 dark:text-gray-400"
                        >
                          {{ cmd.command }}
                        </p>
                      </div>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <span
                        :class="[
                          'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                          {
                            'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                              command.state === 'success',
                            'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                              command.state === 'warning',
                            'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                              command.state === 'error',
                          },
                        ]"
                      >
                        {{ command.state === 'success' ? 'Éxito' : 'Error' }}
                      </span>
                    </td>
                    <td class="px-5 py-4 sm:px-6">
                      <p class="text-gray-500 dark:text-gray-400">{{ command.description }}</p>
                    </td>

                    <!-- Botón -->
                    <td class="px-4 py-4 sm:px-6">
                      <button
                        @click="openModal(command)"
                        class="inline-flex items-center justify-center rounded-lg transition px-1 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                      >
                        <InfoIcon />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div><!--Fin contenido-->
        </div>
      </pane>
    </splitpanes>    
  </div>
  <!--Modal formulario agregar servicio-->   
  <CommandModal
    v-if="showInfoModal"
    :visible="showInfoModal"
    :commandInfo="selectedCommand"
    @close="showInfoModal = false"
    description=""
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import { ChevronDownIcon, InfoIcon } from "../../icons";
import CommandModal from '../StatusPanel/CommandModal.vue'
import { useCommandPanel } from "@/stores/commandPanel";
/*Administracion de comandos */
const CommandPanel = useCommandPanel();
const CommandList = CommandPanel.state.logs;


//Modal informacion comando
const showInfoModal = ref(false)
const selectedCommand = ref(null)

const openModal = (command) => {
  selectedCommand.value = command;
  showInfoModal.value = true;
};

const props = defineProps({
  isExpanded: Boolean,
  isHovered: Boolean
})

// Convertir explícitamente el valor del localStorage a booleano
const collapsed = ref(localStorage.getItem('panelCollapsed') === 'true')
const height = ref(collapsed.value ? 40 : 200)
const emit = defineEmits(['update:height'])

watch(height, (val) => emit('update:height', val))

function toggleCollapse() {
  collapsed.value = !collapsed.value
  localStorage.setItem("panelCollapsed", collapsed.value)
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
