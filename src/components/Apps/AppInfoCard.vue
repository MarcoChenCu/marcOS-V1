<script setup>
import { computed } from "vue";
import Badge from "../ui/Badge.vue";
import { Spinner } from "@/icons";
import SpinnerComp from "../common/Spinner.vue";


const props = defineProps({
  Name: { type: String, required: true },
  description: { type: String, required: true },
  version: { type: [String, Number], required: true },
  image: { type: String, default: "" },
  installing: { type: Boolean, default: false },
  installed: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(["install", "uninstall"]);

const defaultImage = "/images/apps/appIcon.png";
const resolvedImage = computed(() =>
  props.image && props.image.trim() !== "" ? props.image : defaultImage
);
</script>


<template>
  <!-- Contenedor principal -->
  <div
    class="w-full min-h-[230px] flex flex-col sm:flex-row flex-wrap gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <!-- Contenedor imagen -->
    <div class="flex justify-center sm:justify-start w-full sm:w-auto">
      <img
        class="rounded-lg max-w-[120px] w-full h-auto object-contain"
        :src="resolvedImage"
        alt="AppIcon"
      />
    </div>

    <!-- Contenedor info -->
    <div class="flex justify-center flex-col flex-1 min-w-0">
      <!-- Contenedor Nombre-version -->
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h5 class="font-bold text-gray-800 text-lg dark:text-white/90 truncate">
            {{ Name }}
          </h5>
          <Badge BadgeVariant="light" BadgeSize="md" BadgeColor="primary">
            {{ version || "latest" }}
          </Badge>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400 break-words">
          {{ description }}
        </span>
      </div>

      <!-- Botones -->
      <div class="mt-4">
        <button
          v-if="!installed"
          type="button"
          @click="emit('install')"
          class="flex justify-center w-full sm:w-auto rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="installing"
        >
          <Spinner
            v-if="installing"
            height="15"
            width="15"
            class="mr-1 ml-1 animate-spin"
          />
          <span>{{ installing ? "Instalando..." : "Instalar" }}</span>
        </button>

        <!-- Botón desinstalar -->
        <button
          v-else        
          @click="emit('uninstall')"        
          :disabled="installing"
          class="flex justify-center w-full sm:w-auto rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Spinner
            v-if="installing"
            height="15"
            width="15"
            class="mr-1 ml-1 animate-spin"
          />
          <span>{{ installing ? "Desinstalando..." : "Desinstalar" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

