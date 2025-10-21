<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
  <NotificationContainer />
</template>

<script setup lang="ts">
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import NotificationContainer from '@/components/common/NotificationContainer.vue'
import 'splitpanes/dist/splitpanes.css' //Test panel

</script>
