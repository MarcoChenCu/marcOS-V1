<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },  
  value: { type: Number, required: true }, // porcentaje o métrica numérica
  unit: {type: String}
});
// Computa la clase según el valor
const valueColorClass = computed(() => {
  if (props.value < 60) {
    return 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
  } else if (props.value < 85) {
    return 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-500'
  } else {
    return 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500'
  }
})
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    <div class="flex items-center justify-between mt-2">
      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <!-- Ícono -->
        <slot name="icon"/>
      </div>

      <span 
        class="flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium"
        :class="valueColorClass"
      >
        {{ value }}{{ unit ? unit : '' }}
      </span>
    </div>

    <div class="flex items-end justify-between mt-5">
      <div>
        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ title }}</h4>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</span>
      </div>
    </div>
  </div>
</template>
