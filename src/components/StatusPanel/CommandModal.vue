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
            Información de tareas
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {{ description }}
          </p>
          <div class="flex gap-4 items-center mb-4">
            <p class="text-sm text-gray-500 dark:text-gray-400"><strong>Estado:</strong></p>            
            <span
              :class="[
                'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                {
                  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                    commandInfo.state === 'success',
                    'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                    commandInfo.state === 'error',
                },
              ]"
            >
              {{ commandInfo.state ==='success' ? 'Éxito' : 'Error' }}
            </span>
          </div>
          <div class="flex gap-4 mb-4">
            <p class="text-sm text-gray-500 dark:text-gray-400"><strong>Fecha y hora:</strong></p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ commandInfo.datetime }}</p>            
          </div>
          <div class="flex gap-4 mb-4">
            <p class="text-sm text-gray-500 dark:text-gray-400"><strong>Usuario:</strong></p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ commandInfo.user }}</p>            
          </div>
          <div class="flex gap-4 mb-4">
            <p class="text-sm text-gray-500 dark:text-gray-400"><strong>Descripción:</strong></p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ commandInfo.description }}</p>            
          </div>

          <h4 class="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-white/90">
            Comandos
          </h4>
          <div v-for="(commands, index) in commandList" class="flex gap-4 mb-4">
            <p class="text-sm text-gray-500 dark:text-gray-400"><strong>Comando:</strong></p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ commands.command }}</p>            
          </div>

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
  description: {
    type: String,
    default: "¿Estás seguro de continuar con esta acción?"
  },
  commandInfo: {
    type: Object,
    default: () => ({})
  },
  commandList: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(["close", "save"])
</script>
