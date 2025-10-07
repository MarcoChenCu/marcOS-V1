<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: Object, required: true }, // componente de icono
  value: { type: Number, required: true }, // porcentaje o métrica numérica
});

// Colores dinámicos según valor (opcional)
const valueColorClass = computed(() => {
  if (props.value >= 80) return "bg-danger-50 text-danger-600 dark:bg-danger-500/15 dark:text-danger-500";
  if (props.value >= 50) return "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500";
  return "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500";
});
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    <div class="flex items-center justify-between mt-2">
      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <!-- Ícono pasado como prop -->
        <component :is="icon" class="w-6 h-6 fill-gray-800 dark:fill-white/90" />
      </div>

      <span
        class="flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-lg font-medium"
        :class="valueColorClass"
      >
        {{ value }}%
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
