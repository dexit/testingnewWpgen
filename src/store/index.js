import { createStore } from 'vuex'
import aiModule from './modules/ai'
import pluginModule from './modules/plugin'
import templatesModule from './modules/templates'
import documentationModule from './modules/documentation'
import uiModule from './modules/ui'

export default createStore({
  state: {
    version: '1.0.0',
    initialized: false,
    lastSaved: null
  },
  
  getters: {
    appVersion: state => state.version,
    isInitialized: state => state.initialized,
    lastSaved: state => state.lastSaved
  },
  
  mutations: {
    SET_INITIALIZED(state, value) {
      state.initialized = value
    },
    
    SET_LAST_SAVED(state, timestamp) {
      state.lastSaved = timestamp
    }
  },
  
  actions: {
    async initializeApp({ commit, dispatch }) {
      try {
        commit('SET_INITIALIZED', false)
        
        // Initialize modules
        await dispatch('ai/initializeAI')
        await dispatch('plugin/initializePlugin')
        await dispatch('templates/loadTemplates')
        
        commit('SET_INITIALIZED', true)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        dispatch('ui/showError', 'Failed to initialize application')
      }
    },
    
    async autoSave({ commit, state, getters }) {
      try {
        const dataToSave = {
          plugin: getters['plugin/pluginData'],
          ai: getters['ai/aiSettings'],
          templates: getters['templates/customTemplates'],
          timestamp: Date.now()
        }
        
        localStorage.setItem('wp-ai-generator-data', JSON.stringify(dataToSave))
        commit('SET_LAST_SAVED', Date.now())
      } catch (error) {
        console.error('Auto-save failed:', error)
      }
    },
    
    async loadSavedData({ dispatch }, data) {
      try {
        if (data.plugin) {
          await dispatch('plugin/loadPluginData', data.plugin)
        }
        if (data.ai) {
          await dispatch('ai/loadAISettings', data.ai)
        }
        if (data.templates) {
          await dispatch('templates/loadCustomTemplates', data.templates)
        }
      } catch (error) {
        console.error('Failed to load saved data:', error)
      }
    }
  },
  
  modules: {
    ai: aiModule,
    plugin: pluginModule,
    templates: templatesModule,
    documentation: documentationModule,
    ui: uiModule
  }
})