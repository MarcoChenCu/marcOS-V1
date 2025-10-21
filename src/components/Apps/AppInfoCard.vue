<script setup lang="ts">
  import { defineProps, computed } from "vue";
  import Badge from "../ui/Badge.vue";

  const props = defineProps({
    AppName: { type: String, required: true },
    description: { type: String, required: true },  
    version: { type: Number, required: true },
    image: {type: String, default: ""}
  });

  //Imagen predeterminada
  const defaultImage = "/images/apps/appIcon.png";
  //Seleccionar imagen predeterminada si no se ha enviado una
  const resolvedImage = computed(() => {
    return props.image && props.image.trim() !== "" ? props.image : defaultImage;
  });
</script>

<template>
  <!--Contenedor principal-->
  <div class="max-w-[450px] min-h-[230px] flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-6">
    <!--Contenedor imagen-->
    <div class="rounded-lg">
      <img class="overflow-hidden rounded-lg max-w-[130px] max-h-[130px]" :src="resolvedImage" alt="AppIcon">
    </div>
    <!--Contenedor info-->
    <div>
      <!--Contenedor Nombre-version-->
      <div>
        <div class="flex items-center gap-4">
          <h5 class="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">{{ AppName }}</h5>
          <Badge
            BadgeVariant="light"
            BadgeSize="md"
            BadgeColor="primary"
          >{{ version || "latest" }}</Badge>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</span>
      </div>
      <button      
        type="button"
        class="flex justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 mt-4">
        Instalar
      </button>
    </div><!--Contenedor info-->
  </div><!--Contenedor principal-->
</template>