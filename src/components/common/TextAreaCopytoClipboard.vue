<template>
  <div>
    <!-- Etiqueta opcional -->
    <label
      v-if="title"
      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
    >
      {{ title }}
    </label>

    <div class="relative">
      <!-- Input con el texto pasado por props -->  
      <textarea        
        :placeholder="placeholder"
        :value="text"
        rows="6"        
        :class="class"
      ></textarea> 

      <!-- Botón para copiar -->
      <button
        @click="copyTextToClipboard"
        class="absolute right-0 top-1/4 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1 border-l border-gray-200 py-3 pl-3.5 pr-3 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-400"
      >
        <Copy/>
        <div>{{ copyStatus }}</div>
      </button>
    </div>
    <label
      v-if="comment"
      class="mb-1.5 block text-sm font-medium text-gray-400 dark:text-gray-600"
    >
      {{ comment }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Copy from "@/icons/Copy.vue"

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
  class:{
    type: String,
    default: ""
  },
  comment:{
    type: String,
    default: ""
  },
  placeholder:{
    type: String,
    default: "[...]"
  },
  rows:{
    type: String,
    default: "6"
  }

})

const copyStatus = ref("Copiar")

const copyTextToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copyStatus.value = "¡Copiado!"
    setTimeout(() => (copyStatus.value = "Copiar"), 2000)
  } catch (err) {
    console.error("Error al copiar:", err)
    copyStatus.value = "Error"
  }
}
</script>
