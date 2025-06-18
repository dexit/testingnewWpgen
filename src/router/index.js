import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'WP AI Content Generator - Home',
      description: 'AI-powered WordPress plugin generator'
    }
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: () => import('../views/Wizard.vue'),
    meta: {
      title: 'Setup Wizard - WP AI Content Generator',
      description: 'AI-guided plugin setup wizard'
    }
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('../views/Generator.vue'),
    meta: {
      title: 'Plugin Generator - WP AI Content Generator',
      description: 'Generate WordPress plugins with AI assistance'
    }
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () => import('../views/Documentation.vue'),
    meta: {
      title: 'Documentation Generator - WP AI Content Generator',
      description: 'AI-powered documentation generation'
    }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('../views/Templates.vue'),
    meta: {
      title: 'Plugin Templates - WP AI Content Generator',
      description: 'Pre-built plugin templates and patterns'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      title: 'Settings - WP AI Content Generator',
      description: 'Configure AI settings and preferences'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About - WP AI Content Generator',
      description: 'Learn about WP AI Content Generator'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue'),
    meta: {
      title: 'Privacy Policy - WP AI Content Generator',
      description: 'Privacy policy and data handling'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - WP AI Content Generator'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'WP AI Content Generator'
  
  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  // Check if AI services are required and available
  if (to.meta.requiresAI && !store.getters.isAIAvailable) {
    next('/settings')
  } else {
    next()
  }
})

export default router