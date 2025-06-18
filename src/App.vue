<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
    
    <!-- Global Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">{{ loadingMessage }}</p>
      </div>
    </div>
    
    <!-- Global Error Modal -->
    <ErrorModal />
    
    <!-- AI Status Indicator -->
    <AIStatusIndicator />
  </div>
</template>

<script>
import AppHeader from './components/Layout/AppHeader.vue'
import AppFooter from './components/Layout/AppFooter.vue'
import ErrorModal from './components/Common/ErrorModal.vue'
import AIStatusIndicator from './components/AI/AIStatusIndicator.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ErrorModal,
    AIStatusIndicator
  },
  computed: {
    ...mapGetters(['isLoading', 'loadingMessage'])
  },
  mounted() {
    // Initialize app
    this.$store.dispatch('initializeApp')
    
    // Load saved data from localStorage
    this.loadSavedData()
    
    // Set up auto-save
    this.setupAutoSave()
  },
  methods: {
    loadSavedData() {
      const savedData = localStorage.getItem('wp-ai-generator-data')
      if (savedData) {
        try {
          const data = JSON.parse(savedData)
          this.$store.dispatch('loadSavedData', data)
        } catch (error) {
          console.error('Error loading saved data:', error)
        }
      }
    },
    
    setupAutoSave() {
      // Auto-save every 30 seconds
      setInterval(() => {
        this.$store.dispatch('autoSave')
      }, 30000)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* Account for fixed header */
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: white;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive utilities */
@media (max-width: 768px) {
  .main-content {
    padding-top: 70px;
  }
}
</style>