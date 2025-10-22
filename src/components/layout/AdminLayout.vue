<template>
  <div class="min-h-screen xl:flex">
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
      :style="{ paddingBottom: `${statusPanelHeight}px` }"      
    >
      <app-header />
      <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        <slot></slot>
      </div>
    </div>
      <!--Test bootn panel-->
    <!-- Barra inferior -->
    <StatusPanel
  :is-expanded="isExpanded"
  :is-hovered="isHovered"
  @update:height="statusPanelHeight = $event"
  >

      <div>
        <p>[12:30:21] Usuario admin inició sesión</p>
        <p>[12:31:05] Se editó el registro #45</p>
      </div>
    </StatusPanel>
    <!--Test bootn panel-->
    </div>
    
</template>

<script setup>
  import AppSidebar from './AppSidebar.vue'
  import AppHeader from './AppHeader.vue'
  import { useSidebar } from '@/composables/useSidebar'
  import Backdrop from './Backdrop.vue'
  import StatusPanel from '@/components/common/StatusPanel.vue'
  const { isExpanded, isHovered } = useSidebar()
  
  import { ref } from 'vue'
  const statusPanelHeight = ref(200) // altura inicial del panel
</script>

<!--splitpane code https://codepen.io/antoniandre/pen/XybPKP-->
