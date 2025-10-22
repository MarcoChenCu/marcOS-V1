<template>
  <Modal v-if="visible" @close="emit('close')">
    <template #body>
      <div
        class="relative w-full max-w-[600px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
        <!-- Botón cerrar -->
        <button
          @click="emit('close')"
          class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg
            class="fill-current"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.04 16.54a.958.958 0 0 0 1.35 1.35l4.61-4.61 4.61 4.61a.958.958 0 0 0 1.35-1.35l-4.61-4.61 4.61-4.61a.958.958 0 0 0-1.35-1.35l-4.61 4.61-4.61-4.61a.958.958 0 1 0-1.35 1.35l4.61 4.61-4.61 4.61Z"
            />
          </svg>
        </button>

        <!-- Contenido -->
        <div class="px-2 pr-10">
          <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {{ title }}
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {{ description }}
          </p>
          <slot name="content"/>
        </div>

        <!-- Botones -->
        <div v-if="Enablebuttons" class="flex items-center gap-3 mt-6 justify-end">          
          <button
            @click="emit('save')"
            type="button"
            class="flex justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
            >
            Guardar
          </button>
          <button
            @click="emit('close')"
            type="button"
            class="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang>
import Modal from "../profile/Modal.vue"

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "Confirmar acción"
  },
  description: {
    type: String,
    default: "¿Estás seguro de continuar con esta acción?"
  },
  Enablebuttons: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["close", "save"])
</script>
