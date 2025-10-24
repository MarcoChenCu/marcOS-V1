<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      @click="toggleDropdown"
    >
      <PowerIcon/>
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute -right-[240px] mt-[17px] flex h-auto w-[200px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[250px] lg:right-0"
    >
      <div class="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
        <h5 class="text-lg font-semibold text-gray-800 dark:text-white/90">Acciones</h5>

        <button @click="closeDropdown" class="text-gray-500 dark:text-gray-400">
          <svg
            class="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <!-- Lista de acciones -->
      <ul class="flex flex-col h-auto overflow-y-auto custom-scrollbar">
        <!-- Reiniciar -->
         <li @click="Restart">
          <a
            class="flex gap-3 items-center rounded-lg border-b border-gray-100 p-2 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            href="#">
            <!--Icono-->
            <span class="relative block rounded-full z-1">
              <RefreshIcon class="font-bold text-gray-800 text-sm dark:text-white/90"/>              
            </span>
            <!--Titulo-->
            <span class="block">
              <h3 class="font-bold text-gray-800 text-sm dark:text-white/90">Reiniciar</h3>
            </span>  
           </a>           
        </li>
        <!-- Apagar -->
         <li @click="Poweroff">
          <a
            class="flex gap-3 items-center rounded-lg border-b border-gray-100 p-2 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            href="#">
            <!--Icono-->
            <span class="relative block rounded-full z-1">
              <PowerIcon class="font-bold text-gray-800 text-sm dark:text-white/90"/>              
            </span>
            <!--Titulo-->
            <span class="block">
              <h3 class="font-bold text-gray-800 text-sm dark:text-white/90">Apagar</h3>
            </span>  
           </a>           
        </li>
        <!-- Cancelar Apagado/reinicio -->
         <li v-if="actionStarted" @click="StopShutdown">
          <a
            class="flex gap-3 items-center rounded-lg border-b border-gray-100 p-2 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            href="#">
            <!--Icono-->
            <span class="relative block rounded-full z-1">
              <CancelIcon class="font-bold text-gray-800 text-sm dark:text-white/90"/>              
            </span>
            <!--Titulo-->
            <span class="block">
              <h3 class="font-bold text-gray-800 text-sm dark:text-white/90">Cancelar reinicio/apagado</h3>
            </span>  
           </a>           
        </li>
      </ul>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {PowerIcon, RefreshIcon, CancelIcon} from '@/icons'
import { notificationStore } from '@/stores/notificationStore'
import { useCommandPanel } from '@/stores/commandPanel'
import { CanceledError } from 'axios'
const CommandPanel = useCommandPanel();

const dropdownOpen = ref(false)
const notifying = ref(true)
const dropdownRef = ref(null)
const actionStarted = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
  notifying.value = false
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

//Reiniciar el sistema
const Restart=()=>{
  CommandPanel.add({
    commands: [
      { command: "sudo shutdown -r +1 'Reincio desde marcOS'", 
        title: "Reiniciar el sistema con un minuto de retraso.", 
        description: "Con privilegios se ejecuta el comando 'shutdown'. Con el parámetro '-r' se indica que debe realizar un reinicio y con el parámetro '+1' agregamos un minuto de retraso. Opcionalmente se puede agregar un mensaje para los registros." },
    ],
    state: "success",
    description: "Reinicio del servidor.",
  });
  notificationStore.add('warning', 'Reinicio', 'El sistema se reiniciará en 1 minuto.')
  closeDropdown();
  actionStarted.value = true;
}

//Reiniciar el sistema
const Poweroff=()=>{
  CommandPanel.add({
    commands: [
      { command: "sudo shutdown +1 'Apagado desde marcOS'", 
        title: "Apagar el sistema con un minuto de retraso", 
        description: "Con privilegios se ejecuta el comando 'shutdown'. Con el parámetro '+1' agregamos un minuto de retraso. Opcionalmente se puede agregar un mensaje para los registros." },
    ],
    state: "success",
    description: "Apagado del servidor.",
  });
  notificationStore.add('warning', 'Apagado', 'El sistema se apagará en 1 minuto.')
  closeDropdown();
  actionStarted.value = true;
}

//Cancelar Apagado/reinicio
const StopShutdown=()=>{
  CommandPanel.add({
    commands: [
      { command: "sudo shutdown -c", 
        title: "Cancelar el reinicio/apagado programado.", 
        description: "Con privilegios se ejecuta el comando 'shutdown' y con el parámetro '-c' se indica que se deben cancelar el reinicio/apagado programado." },
    ],
    state: "success",
    description: "Cancelar reinicio/apagado del sistema.",
  });
  notificationStore.add('warning', 'Reinicio/Apagado cancelado', 'Se ha cancelado el reinicio/apagado del sistema.')
  closeDropdown();
  actionStarted.value = false;
}

const handleViewAllClick = (event) => {
  event.preventDefault()
  // Handle the "View All Notification" action here
  console.log('View All Notifications clicked')
  closeDropdown()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
