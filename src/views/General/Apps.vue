<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenedor principal-->
    <div
      class="min-h-screen overflow-x-auto custom-scrollbar rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03]  xl:py-12">
      <!--Descripcion-->      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Para instalar programas en Ubuntu Server, la forma más común es usar el gestor de paquetes <strong>apt</strong>.
      </p>    
      <!--Contenedor Apss-->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 mt-6">
        <!--Tarjetas informacion de aplicaciones-->
        <AppInfoCard
          v-for="app in AppList"
          :key="app.appName"
          :Name="app.name"
          :description="app.description"
          :version="app.version"
          :image="app.image"
          :installing="installingApp === app.appName"
          :installed="installedApps[app.appName] || false"
          :loading="loadingApps[app.appName] || false"
          @install="installApp(app.appName)"
          @uninstall="uninstallApp(app.appName)"
        />
      </div><!--Fin contenedor Apps-->
    </div><!--Fin contenedor principal-->
  </AdminLayout>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import AppInfoCard from "@/components/Apps/AppInfoCard.vue";
  import { notificationStore } from "@/stores/notificationStore";
  import { useCommandPanel } from "@/stores/commandPanel";

  const currentPageTitle = ref("Aplicaciones");
  const CommandPanel = useCommandPanel();
  const apiURL = import.meta.env.VITE_API_URL
  //Indicador de instalacion
  const installingApp = ref(null);
  const loadingApps = ref({}); 
  const installedApps = ref({});

  async function installApp(appName) {
    installingApp.value = appName;
    let data = {success: false, message: 'Error inesperado al instalar la aplicación', output: 'ERROR'};
    let updateData = {success: false, message: 'Error al intentar actualizar la listas de paquetes', output: 'ERROR'};
    try {
      const update = await fetch(`${apiURL}/updates/update`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });
      const response = await fetch(`${apiURL}/apps/install`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ appName }),
      });
      updateData = await update.json();
      data = await response.json();
    } catch (error) {
      data = {success: false, message: 'Error de red al instalar la aplicación', output: error.message};
    } finally {
      notificationStore.add(data.success ? 'success' : 'error', 'Instalación de aplicación',data.message)
      CommandPanel.add({
        commands: [
          {
          command: 'sudo apt update',
          title: 'Actualizar lista de paquetes',
          description: 'Con privilegios se ejecuta el gestor de paquetes \'apt\' con el parámetro \'update\' para actualizar la lista de paquetes disponibles. Recomendado antes de instalar software.',
          output: updateData.output,
          },
          {
          command: 'sudo apt install '+appName,
          title: 'Instalar aplicación ',
          description: 'Con privilegios se ejecuta el gestor de paquetes \'apt\' con el parámetro \'install\' para instalar la aplicación '+appName+'.',
          output: data.output,
          },
      ],
        state: data.success ? 'success' : 'error',
        description: 'Instalar '+appName,
      })
      installingApp.value = null;
      if(data.success){
        installedApps.value[appName] = true;
      }
    }
  }

  async function uninstallApp(appName) {

    installingApp.value = appName;
    let data = {success: false, message: 'Error inesperado al desinstalar la aplicación', output: 'ERROR'};
    try {
      const response = await fetch(`${apiURL}/apps/uninstall`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ appName }),
      });
      data = await response.json();
    } catch (error) {
      data = {success: false, message: 'Error de red al desinstalar la aplicación', output: error.message};
    } finally {
      notificationStore.add(data.success ? 'success' : 'error', 'Desinstalación de aplicación',data.message)
      CommandPanel.add({
        commands: [{
          command: 'sudo apt remove '+appName,
          title: 'Desinstalar aplicación ',
          description: 'Con privilegios se ejecuta el gestor de paquetes \'apt\' con el parámetro \'remove\' para desinstalar la aplicación '+appName+'.',
          output: data.output,
        }],
        state: data.success ? 'success' : 'error',
        description: 'Desinstalar '+appName,
      })
      installingApp.value = null;
      if(data.success){
        installedApps.value[appName] = false;
      }
    }
  }

  //Verificar instalación de una app (devuelve true/false)
  async function appIsInstalled(appName,key) {
    try {
      const response = await fetch(`${apiURL}/apps/installed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName,key }),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {      
      return false;
    }
  }

  //Cargar el estado de instalación de todas las apps
  async function checkAllInstalled() {
    for (const app of AppList.value) {
      loadingApps.value[app.appName] = true; 
      const installed = await appIsInstalled(app.appName,app.key);
      installedApps.value[app.appName] = installed;
      loadingApps.value[app.appName] = false;
    }
  }

  const AppList = ref([
    { key: 2,appName: "mysql-server", name: "MySQL", description: "Sistema de gestión de bases de datos relacionales de código abierto.", version: "8.4", image: "/images/apps/mysql-icon.png" },
    { key: 2,appName: "postgresql", name: "PostgreSQL", description: "Sistema de gestión de bases de datos relacional orientado a objetos y de código abierto.", version: "18.0", image: "/images/apps/postgres.png" },
    { key: 2,appName: "mariadb-server", name: "MariaDB", description: "MariaDB Server es una base de datos relacional de código abierto de alto rendimiento.", version: "18.0", image: "/images/apps/mariadb.png" },
    //method: 'which',{ appName: "mongodb", name: "MongoDB", description: "Sistema de gestión de bases de datos no relacional de código abierto.", version: "Latest", image: "/images/apps/mongodb.png" },
    //{ method: 'which',appName: "phpmyadmin", name: "phpMyAdmin", description: "Interfaz web para MySQL y MariaDB.", version: "Latest", image: "/images/apps/phpmyadmin-icon.png" },
    { key: 0,appName: "apache2", name: "Apache HTTP Server", description: "Servidor web HTTP de código abierto.", version: "2.4.65", image: "/images/apps/httpd.png" },
    { key: 0,appName: "nginx", name: "Nginx", description: "Servidor web/Proxy inverso ligero de alto rendimiento.", version: "Latest", image: "/images/apps/nginx.png" },
    { key: 0,appName: "neofetch", name: "Neofetch", description: "Programa de línea de comandos que muestra información del sistema.", version: "Latest", image: "/images/apps/neofetch.png" },
    { key: 0,appName: "node", name: "Node.js", description: "Entorno en tiempo de ejecución multiplataforma, de código abierto.", version: "22.21.0 LTS", image: "/images/apps/Node.js.png" },
    { key: 0,appName: "timeshift", name: "Timeshift", description: "Cree instantáneas de los archivos Linux que restauran un estado anterior del sistema.", version: "Latest", image: "/images/apps/timeshift.png" }
  ]);

  //Ejecutar al montar
  onMounted(() => {
    checkAllInstalled();
  });

</script>

<style></style>
