<template>
  <!-- ORIGINAL -- class="fixed bottom-0 left-0 w-full z-[999] border-t bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-t" --> 
  <!-- AppHeader -- class="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b"-->
<div
  class="fixed bottom-0 left-0 z-[999] border-t bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 transition-all duration-300 ease-in-out"
  :class="[isExpanded || isHovered ? 'lg:left-[290px] w-[calc(100vw-290px)]' : 'lg:left-[90px] w-[calc(100vw-90px)]']"
  :style="{ height: `${height}px` }"
>

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
              class="rounded-lg bg-brand-500 px-2 py-1 text-white hover:bg-brand-600"
            >
              <!--Icono expandir-->             
              <ChevronDownIcon
                :class="[
                  'ml-auto w-5 h-5 transition-transform duration-200',
                  {
                    'rotate-180': collapsed
                  },
                ]"/>
            </button><!--Boton visible-->
          </div><!--Fin header-->

          <!-- Contenido -->
          <div class="flex-1 overflow-y-auto px-4 py-2 text-xs font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900">
            <slot>
              <p class="italic text-gray-500 dark:text-gray-400">
                No hay acciones registradas.
              </p>
            </slot>
          </div>
        </div>
      </pane>
    </splitpanes>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import { ChevronDownIcon } from "../../icons";

const props = defineProps({
  isExpanded: Boolean,
  isHovered: Boolean
})

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
