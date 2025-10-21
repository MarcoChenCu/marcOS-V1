<template>
  <div class="fixed top-20 right-5 z-[1000] flex flex-col gap-3 w-[320px]">
    <transition-group name="fade" tag="div">
      <Alert
        v-for="n in notifications"
        :key="n.id"
        :variant="n.variant"
        :title="n.title"
        :message="n.message"
        class="shadow-lg mb-2"
      />
    </transition-group>
  </div>  
</template>

<script setup>
import { computed } from 'vue'
import { notificationStore } from '@/stores/notificationStore'
import Alert from '../ui/Alert.vue'

const notifications = computed(() => notificationStore.notifications)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
