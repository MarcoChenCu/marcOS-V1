<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenendor registro-->
    <div class="mb-6 min-h-[400px] max-h-[750px] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Contenedor secundario-->
      <div class="mx-auto w-full">
        <!--Titulo-->
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Registros del sistema
        </h3>
        <!--Ubicacion-->      
        <h4 class="mb-2 text-gray-800 dark:text-white/90">Ubicación: <strong>/var/log/syslong</strong></h4>              
        <!--Descripcion-->
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Contiene más información sobre su sistema.
          Si no puede encontrar nada en los otros registros, probablemente esté aquí.          
        </p>
        <!--Comando para consultar el registro-->
        <CopytoClipboard
          class="mt-6 max-w-[600px]"
          title="Consultar el registro desde la terminal"
          text="cat /var/log/syslog"
        />
        <!--Contenido del registro-->
        <textarea
          v-model="syslog"
          ref="syslogRef"
          placeholder="[Sin registros]"
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
        <button
          v-if="syslog.length>0"
          @click="downloadLog('syslogLog.txt', syslog)"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
          Descargar
        </button>
      </div><!--Contenedor secundario-->
    </div><!--Fin contenedor registro-->

    <!--Contenedor registro-->
    <div class="mb-6 min-h-[400px] max-h-[750px] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Contenendor secundario-->
      <div class="mx-auto w-full">
        <!--Titulo-->
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Registros de depuración
        </h3>
        <!--Ubicacion-->      
        <h4 class="mb-2 text-gray-800 dark:text-white/90">Ubicación: <strong>/var/log/debug</strong></h4>                
        <!--Descripcion-->
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Proporciona información de depuración del sistema y aplicaciones.
        </p>
        <!--Comando para consultar el registro-->
        <CopytoClipboard 
          class="mt-6 max-w-[600px]"
          title="Consultar el registro desde la terminal"
          text="cat /var/log/debug"
        />
        <!--Contenido del registro-->
        <textarea
          v-model="debuglog"
          ref="debuglogRef"
          placeholder="[Sin registros]"        
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
        <button
          v-if="debuglog.length>0"
          @click="downloadLog('debugLog.txt', debuglog)"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
          Descargar
        </button>
      </div><!--Contenedor secundario-->
    </div><!--Fin Contenedor registro-->

    <!--Contenedor registro-->
    <div class="mb-6 min-h-[400px] max-h-[750px] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Contenendor secundario-->
      <div class="mx-auto w-full">
        <!--Titulo-->
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Registros demonios
        </h3>
        <!--Ubicacion-->      
        <h4 class="mb-2 text-gray-800 dark:text-white/90">Ubicación: <strong>/var/log/daemon.log</strong></h4>
        <!--Descripcion-->
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Los demonios son programas que se ejecutan en segundo plano, generalmente sin interacción del usuario. 
          Por ejemplo, servidor de visualización, sesiones de SSH, servicios de impresión, bluetooth y más.
        </p>
        <!--Comando para consultar el registro-->
        <CopytoClipboard 
          class="mt-6 max-w-[600px]"
          title="Consultar el registro desde la terminal"
          text="cat /var/log/daemon.log"
        />
        <!--Contenido del registro-->
        <textarea     
          v-model="daemonlog"
          ref="daemonlogRef"
          placeholder="[Sin registros]"
          value=""          
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
        <button
          v-if="daemonlog.length>0"
          @click="downloadLog('daemonLog.txt', daemonlog)"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
          Descargar
        </button>
      </div><!--Contenedor secundario-->
    </div><!--Fin Contenedor registro-->
    <!--Contenedor registro-->
    <div class="mb-6 min-h-[400px] max-h-[750px] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Contenendor secundario-->
      <div class="mx-auto w-full">
        <!--Titulo-->
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Registros de autorización
        </h3>
        <!--Ubicacion-->      
        <h4 class="mb-2 text-gray-800 dark:text-white/90">Ubicación: <strong>/var/log/auth.log</strong></h4>                
        <!--Descripcion-->
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Realiza un seguimiento de los sistemas de autorización, 
          como las instrucciones de contraseña, el comando <strong>sudo</strong> y los inicios de sesión remotos.
        </p>
        <!--Comando para consultar el registro-->
        <CopytoClipboard 
          class="mt-6 max-w-[600px]"
          title="Consultar el registro desde la terminal"
          text="cat /var/log/auth.log"
        />
        <!--Contenido del registro-->
        <textarea     
          v-model="authlog"   
          ref="authlogRef"
          placeholder="[Sin registros]"
          value=""          
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
        <button
          v-if="authlog.length>0"
          @click="downloadLog('authLog.txt', authlog)"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
          Descargar
        </button>
      </div><!--Contenedor secundario-->
    </div><!--Fin Contenedor registro-->

    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Contenendor secundario-->
      <div class="mx-auto w-full">
        <!--Titulo-->
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Otros registros
        </h3>
        <!--Ubicacion-->              
        <!--Descripcion-->
        <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Hay muchos archivos de registro diferentes que sirven para diferentes propósitos. 
          Al intentar encontrar un registro sobre algo, debe comenzar por identificar el archivo más relevante. 
          A continuación se muestra un enlace con una lista de ubicaciones de archivos de registro comunes.
        </p>        
        <a 
        class="underline cursor-pointer text-brand-500" 
        href="https://ubuntu.com/tutorials/viewing-and-monitoring-log-files#2-log-files-locations">
          Ubuntu Server: Visualización y supervisión de archivos de registro.
        </a>
        <!--Contenido del registro-->
      </div><!--Contenedor secundario-->
    </div>
  </AdminLayout>
</template>

<script setup>
  import { ref, nextTick, onMounted, onUnmounted } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import CopytoClipboard from "@/components/common/CopytoClipboard.vue";
  import { notificationStore } from "@/stores/notificationStore";
  import { useCommandPanel } from "@/stores/commandPanel";
  
  const currentPageTitle = ref("Registros");
  const apiURL = import.meta.env.VITE_API_URL
  const CommandPanel = useCommandPanel();
  //Ref a los textareas
  const syslogRef = ref(null);
  const debuglogRef = ref(null);
  const daemonlogRef = ref(null);
  const authlogRef = ref(null);

  //Estado de carga
  const loading = ref(false)
  //Estados de los logs
  const syslog = ref('')
  const debuglog = ref('')
  const daemonlog = ref('')
  const authlog = ref('')

  async function fetchLogs() {
    syslog.value = await loadLogs('syslog')
    await scrollToBottom(syslogRef)
    debuglog.value = await loadLogs('debug')
    await scrollToBottom(debuglogRef)
    daemonlog.value = await loadLogs('daemon.log')
    await scrollToBottom(daemonlogRef)
    authlog.value = await loadLogs('auth.log')
    await scrollToBottom(authlogRef)
  }
  //Función para cargar los logs
  async function loadLogs(fileName) {
    loading.value = true
    let success = false
    let message = ''
    let output = ''
    let warning = false

    try {
      const response = await fetch(`${apiURL}/api/exec/logs/read`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: fileName }),
      })

      if (!response.ok) throw new Error(`Error HTTP logFile: ${response.status}`)

      const fileData = await response.json()
      success = fileData.success || false
      message = fileData.message || ''
      output = fileData.output || ''
      warning = fileData.warning || false

      return fileData.output || ''
    } catch (err) {
      message = `Error al cargar los registros: ${err.message}`
      console.error('Error al cargar los registros (loadLogs):', err)
      success = false
      output = err.output
      return ''
    } finally {
      // Determinar el estado visual
      const state = success
        ? (warning ? 'warning' : 'success')
        : 'error'

      // Notificación: solo si es error real
      if (!success) {
        notificationStore.add('error', 'Carga de registros', message)
      }

      // Registrar en el CommandPanel
      CommandPanel.add({
        commands: [
          {
            command: `cat /var/log/${fileName}`,
            title: `Leer el registro ${fileName}`,
            description:
              "Utilizando el comando 'cat' se muestra el contenido de un archivo. Como parámetro es necesario enviar la ruta del archivo.",
            output: warning ? message : (success ? '' : output),
          },
        ],
        state,
        description: `Lectura del archivo de registro ${fileName}`,
      })

      loading.value = false
    }
  }
  // función genérica para mover scroll al final
  async function scrollToBottom(textareaRef) {
    await nextTick() // aseguramos que el DOM ya se actualizó
    if (textareaRef.value) {
      textareaRef.value.scrollTop = textareaRef.value.scrollHeight
    }
  }

  // función para descargar logs
  function downloadLog(filename, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

  onMounted(() => {
    fetchLogs()
    // Actualiza cada 5 segundos, solo si el componente está activo    
    //intervalId = setInterval(loadLogs, 5000)
  })

  onUnmounted(() => {
    // Detener las peticiones al salir de la vista
    /** 
     * 
     if (intervalId){
      clearInterval(intervalId)
      intervalId = null
    }    
    */
  })
</script>

<style></style>
