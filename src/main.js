import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import custom styles
import './assets/css/main.css'

// Import global utilities
import { formatDate, validateEmail, sanitizeInput } from './utils/helpers'

const app = createApp(App)

// Global properties
app.config.globalProperties.$formatDate = formatDate
app.config.globalProperties.$validateEmail = validateEmail
app.config.globalProperties.$sanitizeInput = sanitizeInput

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // Send to error reporting service in production
}

app.use(store).use(router).mount('#app')