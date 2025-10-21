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
          placeholder="[Sin registros]"
          value="Oct 20 00:38:05 test systemd[1]: dmesg.service: Deactivated successfully.
Oct 20 00:38:07 test ModemManager[706]: <info>  [base-manager] couldnt check support for device /sys/devices/pci0000:00/0000:00:12.0: not supported by any plugin
Oct 20 00:38:14 test systemd[1]: NetworkManager-dispatcher.service: Deactivated successfully.
Oct 20 00:38:28 test systemd[1]: systemd-fsckd.service: Deactivated successfully.
Oct 20 00:38:34 test systemd-timesyncd[608]: Initial synchronization to time server [2620:2d:4000:1::41]:123 (ntp.ubuntu.com).
Oct 20 00:38:34 test systemd[1]: systemd-hostnamed.service: Deactivated successfully.
Oct 20 00:38:37 test systemd[1]: systemd-timedated.service: Deactivated successfully.
Oct 20 00:42:08 test systemd[1]: Created slice User Slice of UID 1000.
Oct 20 00:42:08 test systemd[1]: Starting User Runtime Directory /run/user/1000...
Oct 20 00:42:08 test systemd[1]: Finished User Runtime Directory /run/user/1000.
Oct 20 00:42:08 test systemd[1]: Starting User Manager for UID 1000...
Oct 20 00:42:08 test systemd[920]: Queued start job for default target Main User Target.
Oct 20 00:42:08 test systemd[920]: Created slice User Application Slice.
Oct 20 00:42:08 test systemd[920]: Reached target Paths.
Oct 20 00:42:08 test systemd[920]: Reached target Timers.
Oct 20 00:42:08 test systemd[920]: Starting D-Bus User Message Bus Socket...
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG network certificate management daemon.
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent and passphrase cache (access for web browsers).
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent and passphrase cache (restricted).
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent (ssh-agent emulation).
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent and passphrase cache.
Oct 20 00:42:08 test systemd[920]: Listening on debconf communication socket.
Oct 20 00:42:08 test systemd[920]: Listening on REST API socket for snapd user session agent.
Oct 20 00:42:08 test systemd[920]: Listening on D-Bus User Message Bus Socket.
Oct 20 00:42:08 test systemd[920]: Reached target Sockets.
Oct 20 00:42:08 test systemd[920]: Reached target Basic System.
Oct 20 00:42:08 test systemd[920]: Reached target Main User Target.
Oct 20 00:42:08 test systemd[920]: Startup finished in 98ms.
Oct 20 00:42:08 test systemd[1]: Started User Manager for UID 1000.
Oct 20 00:42:08 test systemd[1]: Started Session 1 of User marco."          
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
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
          placeholder="[Sin registros]"
          value="Oct 20 00:38:05 test systemd[1]: dmesg.service: Deactivated successfully.
Oct 20 00:38:07 test ModemManager[706]: <info>  [base-manager] couldnt check support for device /sys/devices/pci0000:00/0000:00:12.0: not supported by any plugin
Oct 20 00:38:14 test systemd[1]: NetworkManager-dispatcher.service: Deactivated successfully.
Oct 20 00:38:28 test systemd[1]: systemd-fsckd.service: Deactivated successfully.
Oct 20 00:38:34 test systemd-timesyncd[608]: Initial synchronization to time server [2620:2d:4000:1::41]:123 (ntp.ubuntu.com).
Oct 20 00:38:34 test systemd[1]: systemd-hostnamed.service: Deactivated successfully.
Oct 20 00:38:37 test systemd[1]: systemd-timedated.service: Deactivated successfully.
Oct 20 00:42:08 test systemd[1]: Created slice User Slice of UID 1000.
Oct 20 00:42:08 test systemd[1]: Starting User Runtime Directory /run/user/1000...
Oct 20 00:42:08 test systemd[1]: Finished User Runtime Directory /run/user/1000.
Oct 20 00:42:08 test systemd[1]: Starting User Manager for UID 1000...
Oct 20 00:42:08 test systemd[920]: Queued start job for default target Main User Target.
Oct 20 00:42:08 test systemd[920]: Created slice User Application Slice.
Oct 20 00:42:08 test systemd[920]: Reached target Paths.
Oct 20 00:42:08 test systemd[920]: Reached target Timers.
Oct 20 00:42:08 test systemd[920]: Starting D-Bus User Message Bus Socket...
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG network certificate management daemon.
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent and passphrase cache (access for web browsers).
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent and passphrase cache (restricted).
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent (ssh-agent emulation).
Oct 20 00:42:08 test systemd[920]: Listening on GnuPG cryptographic agent and passphrase cache.
Oct 20 00:42:08 test systemd[920]: Listening on debconf communication socket.
Oct 20 00:42:08 test systemd[920]: Listening on REST API socket for snapd user session agent.
Oct 20 00:42:08 test systemd[920]: Listening on D-Bus User Message Bus Socket.
Oct 20 00:42:08 test systemd[920]: Reached target Sockets.
Oct 20 00:42:08 test systemd[920]: Reached target Basic System.
Oct 20 00:42:08 test systemd[920]: Reached target Main User Target.
Oct 20 00:42:08 test systemd[920]: Startup finished in 98ms.
Oct 20 00:42:08 test systemd[1]: Started User Manager for UID 1000.
Oct 20 00:42:08 test systemd[1]: Started Session 1 of User marco."          
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
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
          placeholder="[Sin registros]"
          value=""          
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
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
          placeholder="Enter a description..."
          value=""          
          rows="15"
          readonly
          spellcheck="false"
          class="mt-4 min-h-[100px] max-h-[400px] dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300  focus:outline-hidden focus:ring-0 disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15"
        ></textarea>
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
  import { ref } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import CopytoClipboard from "@/components/common/CopytoClipboard.vue";
  
  const currentPageTitle = ref("Registros");
</script>

<style></style>
