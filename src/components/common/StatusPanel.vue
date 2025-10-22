<template>
  <div
    class="fixed bottom-0 left-0 w-full z-[999] border-t bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b"
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
          <div class="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Consola del sistema
            </span>
            <button
              @click="toggleCollapse"
              class="text-xs px-2 py-1 border rounded-md border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {{ collapsed ? 'Expandir' : 'Contraer' }}
            </button>
          </div>

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
