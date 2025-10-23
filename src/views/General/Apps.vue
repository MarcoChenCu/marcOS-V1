<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!--Contenedor principal-->
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <!--Descripcion-->      
      <p class="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Para instalar programas en Ubuntu Server, la forma más común es usar el gestor de paquetes <strong>apt</strong>.
      </p>    
      <!--Contenedor Apss-->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 mt-6">
        <!--Tarjetas informacion de aplicaciones-->
        <AppInfoCard
        v-for="app in AppList"         
        :AppName="app.name"
        :description="app.description"
        :version="app.version"
        :image="app.image"
        />
      </div><!--Fin contenedor Apps-->
    </div><!--Fin contenedor principal-->
  </AdminLayout>
</template>

<script setup>
  import { ref } from "vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import AppInfoCard from "@/components/Apps/AppInfoCard.vue";

  const currentPageTitle = ref("Aplicaciones");

  const AppList = [
    {name: "MySQL", description: "Sistema de gestión de bases de datos relacionales de código abierto.", version: '8.4', image: '/images/apps/mysql-icon.png'},
    {name: "PostgreSQL", description: "Sistema de gestión de bases de datos relacional orientado a objetos y de código abierto.", version: '18.0', image: '/images/apps/postgres.png'},
    {name: "MariaDB", description: "MariaDB Server es una base de datos relacional de código abierto de alto rendimiento.", version: '18.0', image: '/images/apps/mariadb.png'},
    {name: "MongoDB", description: "Sistema de gestión de bases de datos no relacional de código abierto.", version: 'Latest', image: '/images/apps/mongodb.png'},
    {name: "phpMyAdmin", description: "Interfaz web para MySQL y MariaDB.", version: 'Latest', image: '/images/apps/phpmyadmin-icon.png'},
    {name: "Apache HTTP Server", description: "Servidor web HTTP de código abierto.", version: '2.4.65', image: '/images/apps/httpd.png'},
    {name: "Nginx", description: "Servidor web/Proxy inverso ligero de alto rendimiento.", version: 'Latest', image: '/images/apps/nginx.png'},
    {name: "Neofetch", description: "Programa de línea de comandos que muestra información del sistema.", version: 'Latest', image: '/images/apps/neofetch.png'},
    {name: "Node.js", description: "Entorno en tiempo de ejecución multiplataforma, de código abierto.", version: '22.20.0 LTS', image: '/images/apps/Node.js.png'},
    {name: "Timeshift", description: "Cree instantáneas de los archivos Linux que restauran un estado anterior del sistema.", version: 'Latest', image: '/images/apps/timeshift.png'},
  ]

</script>

<style></style>
