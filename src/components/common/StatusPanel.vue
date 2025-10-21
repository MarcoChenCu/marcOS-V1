<template>
  <div
    class="fixed bottom-0 left-0 w-full border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 z-[999]"
    :style="{ height: `${panelHeight}px` }"
  >
    <Splitpanes
      horizontal
      class="default-theme"
      @resize="onResize"
      :dbl-click-splitter="false"
    >
      <Pane :size="100">
        <div class="h-full flex flex-col text-sm text-gray-700 dark:text-gray-300">
          <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <span class="font-semibold">Consola de acciones</span>
            <button
              @click="toggleCollapse"
              class="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              {{ collapsed ? 'Expandir' : 'Contraer' }}
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-3">
            <slot>
              <p class="italic text-gray-500">No hay acciones recientes.</p>
            </slot>
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'

const panelHeight = ref(200)
const collapsed = ref(false)

function toggleCollapse() {
  collapsed.value = !collapsed.value
  panelHeight.value = collapsed.value ? 40 : 200
}

function onResize(e) {
  // Guarda la altura del panel al redimensionar
  const newHeight = e[0]?.size
  if (newHeight) panelHeight.value = (window.innerHeight * newHeight) / 100
}
</script>

<style scoped>
.splitpanes__pane {
  display: flex;
  flex-direction: column;
}
</style>
