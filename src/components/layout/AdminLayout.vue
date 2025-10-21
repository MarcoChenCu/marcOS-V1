<template>
  <div class="min-h-screen xl:flex">
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <app-header />
      <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        <slot></slot>
      </div>
    </div>
    <!--Test bootn panel-->    
    <!-- Barra inferior -->
    <BottomStatusPanel>
      <div>
        <p>[12:30:21] Usuario admin inició sesión</p>
        <p>[12:31:05] Se editó el registro #45</p>
      </div>
    </BottomStatusPanel>
    <!--Test bootn panel-->
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useSidebar } from '@/composables/useSidebar'
import Backdrop from './Backdrop.vue'
import StatusPanel from '../common/StatusPanel.vue' //Test
const { isExpanded, isHovered } = useSidebar()
</script>

<!--splitpane code https://codepen.io/antoniandre/pen/XybPKP-->
