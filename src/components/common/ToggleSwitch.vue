<template>
  <div class="flex items-center gap-3">
    <label class="switch">
      <input type="checkbox" v-model="isChecked" @change="handleChange" />
      <div class="slider round"></div>
    </label>
    <span class="text-sm font-medium text-gray-800 dark:text-gray-300">
      {{ isChecked ? enabledText : disabledText }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, defineEmits } from "vue"

  // Props: texto para los estados y estado inicial
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    enabledText: {
      type: String,
      default: "Habilitado"
    },
    disabledText: {
      type: String,
      default: "Deshabilitado"
    }
  })

  // Emitir cambios al componente padre
  const emit = defineEmits(["update:modelValue", "toggle-off", "toggle-on"]);

  const isChecked = ref(props.modelValue)

  // Sincronizar con v-model externo
  watch(
    () => props.modelValue,
    (newVal) => {
      isChecked.value = newVal
    }
  )

  watch(isChecked, (newVal) => {
    emit("update:modelValue", newVal)
  })

  const handleChange = () => {
  emit("update:modelValue", isChecked.value);
  if (isChecked.value) {
    emit("toggle-on");
  } else {
    emit("toggle-off");
  }
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-brand-500);
}

input:checked + .slider:before {
  transform: translateX(22px);
}
</style>
