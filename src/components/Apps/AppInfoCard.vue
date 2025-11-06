<script setup>
import { computed } from "vue";
import Badge from "../ui/Badge.vue";
import { Spinner } from "@/icons";
import Button from "../ui/Button.vue";

const props = defineProps({
  Name: { type: String, required: true },
  description: { type: String, required: true },
  version: { type: [String, Number], required: true },
  image: { type: String, default: "" },
  installing: { type: Boolean, default: false }, // <- agregado para el spinner
  installed: { type: Boolean, default: false } // <- agregado para el botón desinstalar
});

const emit = defineEmits(["install","uninstall"]); // <- emitirá el evento "install"


// Imagen predeterminada
const defaultImage = "/images/apps/appIcon.png";
const resolvedImage = computed(() =>
  props.image && props.image.trim() !== "" ? props.image : defaultImage
);
</script>

<template>
  <!-- Contenedor principal -->
  <div
    class="max-w-[450px] min-h-[230px] flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-6"
  >
    <!-- Contenedor imagen -->
    <div class="rounded-lg">
      <img
        class="overflow-hidden rounded-lg max-w-[130px] max-h-[130px]"
        :src="resolvedImage"
        alt="AppIcon"
      />
    </div>

    <!-- Contenedor info -->
    <div>
      <!-- Contenedor Nombre-version -->
      <div>
        <div class="flex items-center gap-4">
          <h5 class="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">
            {{ Name }}
          </h5>
          <Badge BadgeVariant="light" BadgeSize="md" BadgeColor="primary">
            {{ version || "latest" }}
          </Badge>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ description }}
        </span>
      </div>

      <!-- Botón instalar -->
      <button
        v-if="!installed"
        type="button"
        @click="emit('install')"
        class="flex justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <!--Boton desintalar - Mostrar si "installed" es true-->
      <Button
        v-else
        type="button"
        @click="emit('uninstall')"
        variant="error"
        size="sm"
        :disabled="installing"
        class="mt-2"
      >
        <Spinner
          v-if="installing"
          height="15"
          width="15"
          class="mr-1 ml-1 animate-spin"
        />
        <span>{{ installing ? "Desinstalando..." : "Desinstalar" }}</span>
      </Button>
    </div>
  </div>
</template>
