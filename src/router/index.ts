import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard', // Redirige condicionalmente al dashboard
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Iniciar sesión',
        guestOnly: true,
      },
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
      },
    },

    {
      path: '/network_config',
      name: 'Network',
      component: () => import('../views/Network/NetworkConf.vue'),
      meta: {
        title: 'Configuración de Red',
        requiresAuth: true,
      },
    },

    {
      path: '/firewall',
      name: 'Firewall1',
      component: () => import('../views/Network/Firewall.vue'),
      meta: {
        title: 'Firewall',
        requiresAuth: true,
      },
    },

    {
      path: '/terminal',
      name: 'Terminal',
      component: () => import('../views/General/Terminal.vue'),
      meta: {
        title: 'Terminal',
        requriesAuth: true,
      },
    },
    /*Explorador de archivos para la version 2 XD      
    {
      path: '/file_explorer',
      name: 'File Explorer',
      component: () => import('../views/General/FileExplorer.vue'),
      meta: {
        title: 'Explorador de archivos',
        requiresAuth: true,
      },
    },
    */

    {
      path: '/updates',
      name: 'Updates',
      component: () => import('../views/General/Updates.vue'),
      meta: {
        title: 'Actualizaciones',
        requiresAuth: true,
      },
    },

    {
      path: '/apps',
      name: 'Apps',
      component: () => import('../views/General/Apps.vue'),
      meta: {
        title: 'Aplicaciones',
        requiresAuth: true,
      },
    },

    {
      path: '/processes',
      name: 'Procesos',
      component: () => import('../views/General/Processes.vue'),
      meta: {
        title: 'Procesos',
        requiresAuth: true,
      },
    },

    {
      path: '/logs',
      name: 'Logs',
      component: () => import('../views/General/Logs.vue'),
      meta: {
        title: 'Registros',
        requiresAuth: true,
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
    
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/General/Users.vue'),
      meta: {
        title: 'usuarios',
        requiresAuth: true,
      },
    },

    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },    
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },
    /*
    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },    
        
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
    */
  ],
})

//Guard de navegacion global

router.beforeEach((to, from, next) => {
  //Actualizar titulo del documento
  document.title = `marcOS | ${to.meta.title}`

  // Obtener estado de sesión (de localStorage)
  const isAuthenticated = localStorage.getItem('token') !== null
  //const token = localStorage.getItem("token")

   // 🔹 Controlar la ruta raíz
  if (to.path === '/') {
    if (isAuthenticated) {
      return next('/dashboard')
    } else {
      return next('/signin')
    }
  }

  
  // 🔹 Rutas que requieren autenticación
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/signin')
  }

  // 🔹 Rutas solo para invitados (signin, signup)
  if (to.meta.guestOnly && isAuthenticated) {
    return next('/dashboard')
  }

  // Continuar normalmente
  next()
})

export default router