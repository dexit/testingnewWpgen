import { AIService } from '../../services/AIService'

const state = {
  providers: {
    gemini: {
      name: 'Gemini AI',
      apiKey: '',
      enabled: false,
      status: 'disconnected'
    },
    openrouter: {
      name: 'OpenRouter',
      apiKey: '',
      enabled: false,
      status: 'disconnected'
    },
    v0dev: {
      name: 'v0.dev',
      apiKey: '',
      enabled: false,
      status: 'disconnected'
    }
  },
  currentProvider: 'gemini',
  generationHistory: [],
  settings: {
    language: 'en',
    tone: 'professional',
    complexity: 'intermediate',
    includeExamples: true,
    seoOptimized: true
  }
}

const getters = {
  aiProviders: state => state.providers,
  currentProvider: state => state.currentProvider,
  isAIAvailable: state => {
    return Object.values(state.providers).some(provider => 
      provider.enabled && provider.status === 'connected'
    )
  },
  aiSettings: state => state.settings,
  generationHistory: state => state.generationHistory,
  activeProvider: state => state.providers[state.currentProvider]
}

const mutations = {
  SET_PROVIDER_CONFIG(state, { provider, config }) {
    state.providers[provider] = { ...state.providers[provider], ...config }
  },
  
  SET_CURRENT_PROVIDER(state, provider) {
    state.currentProvider = provider
  },
  
  SET_AI_SETTINGS(state, settings) {
    state.settings = { ...state.settings, ...settings }
  },
  
  ADD_GENERATION_HISTORY(state, entry) {
    state.generationHistory.unshift({
      ...entry,
      id: Date.now(),
      timestamp: new Date().toISOString()
    })
    
    // Keep only last 50 entries
    if (state.generationHistory.length > 50) {
      state.generationHistory = state.generationHistory.slice(0, 50)
    }
  },
  
  CLEAR_GENERATION_HISTORY(state) {
    state.generationHistory = []
  }
}

const actions = {
  async initializeAI({ commit, dispatch }) {
    try {
      // Load saved API keys from secure storage
      const savedKeys = await dispatch('loadAPIKeys')
      
      for (const [provider, config] of Object.entries(savedKeys)) {
        if (config.apiKey) {
          commit('SET_PROVIDER_CONFIG', { provider, config })
          await dispatch('testConnection', provider)
        }
      }
    } catch (error) {
      console.error('Failed to initialize AI:', error)
    }
  },
  
  async setAPIKey({ commit, dispatch }, { provider, apiKey }) {
    try {
      commit('SET_PROVIDER_CONFIG', { 
        provider, 
        config: { apiKey, enabled: true } 
      })
      
      // Test connection
      const isConnected = await dispatch('testConnection', provider)
      
      if (isConnected) {
        // Save to secure storage
        await dispatch('saveAPIKey', { provider, apiKey })
        dispatch('ui/showSuccess', `${provider} connected successfully`, { root: true })
      }
      
      return isConnected
    } catch (error) {
      console.error(`Failed to set API key for ${provider}:`, error)
      dispatch('ui/showError', `Failed to connect to ${provider}`, { root: true })
      return false
    }
  },
  
  async testConnection({ commit, state }, provider) {
    try {
      commit('SET_PROVIDER_CONFIG', { 
        provider, 
        config: { status: 'testing' } 
      })
      
      const config = state.providers[provider]
      const isConnected = await AIService.testConnection(provider, config.apiKey)
      
      commit('SET_PROVIDER_CONFIG', { 
        provider, 
        config: { status: isConnected ? 'connected' : 'error' } 
      })
      
      return isConnected
    } catch (error) {
      commit('SET_PROVIDER_CONFIG', { 
        provider, 
        config: { status: 'error' } 
      })
      return false
    }
  },
  
  async generateContent({ commit, state, dispatch }, { type, prompt, options = {} }) {
    try {
      dispatch('ui/setLoading', { 
        status: true, 
        message: 'Generating content with AI...' 
      }, { root: true })
      
      const provider = state.currentProvider
      const config = state.providers[provider]
      
      if (!config.enabled || config.status !== 'connected') {
        throw new Error(`${provider} is not available`)
      }
      
      const result = await AIService.generateContent(provider, {
        type,
        prompt,
        apiKey: config.apiKey,
        settings: state.settings,
        ...options
      })
      
      // Add to history
      commit('ADD_GENERATION_HISTORY', {
        type,
        prompt,
        result: result.content,
        provider,
        success: true
      })
      
      dispatch('ui/setLoading', { status: false }, { root: true })
      
      return result
    } catch (error) {
      console.error('Content generation failed:', error)
      
      commit('ADD_GENERATION_HISTORY', {
        type,
        prompt,
        error: error.message,
        provider: state.currentProvider,
        success: false
      })
      
      dispatch('ui/setLoading', { status: false }, { root: true })
      dispatch('ui/showError', `Content generation failed: ${error.message}`, { root: true })
      
      throw error
    }
  },
  
  async generateDocumentation({ dispatch }, pluginData) {
    return await dispatch('generateContent', {
      type: 'documentation',
      prompt: `Generate comprehensive WordPress plugin documentation for: ${pluginData.name}`,
      options: { pluginData }
    })
  },
  
  async generateReadme({ dispatch }, pluginData) {
    return await dispatch('generateContent', {
      type: 'readme',
      prompt: `Generate WordPress-compliant readme.txt for plugin: ${pluginData.name}`,
      options: { pluginData }
    })
  },
  
  async generateMarketing({ dispatch }, pluginData) {
    return await dispatch('generateContent', {
      type: 'marketing',
      prompt: `Generate marketing copy for WordPress plugin: ${pluginData.name}`,
      options: { pluginData }
    })
  },
  
  async saveAPIKey({ commit }, { provider, apiKey }) {
    // In a real app, this would use secure storage
    const encryptedKey = btoa(apiKey) // Simple encoding, use proper encryption in production
    localStorage.setItem(`ai_key_${provider}`, encryptedKey)
  },
  
  async loadAPIKeys({ commit }) {
    const keys = {}
    const providers = ['gemini', 'openrouter', 'v0dev']
    
    for (const provider of providers) {
      const encryptedKey = localStorage.getItem(`ai_key_${provider}`)
      if (encryptedKey) {
        try {
          const apiKey = atob(encryptedKey) // Simple decoding
          keys[provider] = { apiKey, enabled: true }
        } catch (error) {
          console.error(`Failed to load API key for ${provider}:`, error)
        }
      }
    }
    
    return keys
  },
  
  loadAISettings({ commit }, settings) {
    commit('SET_AI_SETTINGS', settings)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}