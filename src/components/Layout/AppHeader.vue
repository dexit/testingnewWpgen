<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <i class="fas fa-magic me-2"></i>
          WP AI Generator
        </router-link>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/wizard" class="nav-link">Wizard</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/generator" class="nav-link">Generator</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/documentation" class="nav-link">Docs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/templates" class="nav-link">Templates</router-link>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-cog"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/settings" class="dropdown-item">
                    <i class="fas fa-cog me-2"></i>Settings
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" @click="toggleTheme">
                    <i class="fas fa-moon me-2"></i>Toggle Theme
                  </a>
                </li>
                <li>
                  <router-link to="/about" class="dropdown-item">
                    <i class="fas fa-info-circle me-2"></i>About
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('ui', ['theme'])
  },
  methods: {
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.$store.dispatch('ui/setTheme', newTheme)
    }
  }
}
</script>

<style scoped>
.app-header {
  z-index: 1030;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.25rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.8) !important;
}

.router-link-active {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
}

@media (max-width: 991px) {
  .navbar-nav {
    padding-top: 0.5rem;
  }
  
  .nav-item {
    margin-bottom: 0.25rem;
  }
}
</style>