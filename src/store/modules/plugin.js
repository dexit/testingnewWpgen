const state = {
  basic: {
    name: '',
    slug: '',
    version: '1.0.0',
    description: '',
    author: '',
    authorURI: '',
    pluginURI: '',
    textDomain: '',
    domainPath: '/languages',
    license: 'GPL v2 or later',
    licenseURI: 'https://www.gnu.org/licenses/gpl-2.0.html',
    requiresWP: '5.0',
    testedUpTo: '6.4',
    requiresPHP: '7.4',
    network: false,
    tags: []
  },
  
  features: {
    primary: [],
    secondary: [],
    dependencies: [],
    hooks: [],
    shortcodes: [],
    widgets: [],
    customPostTypes: [],
    taxonomies: [],
    adminPages: [],
    restAPI: [],
    blocks: []
  },
  
  structure: {
    namespace: '',
    mainClass: '',
    fileStructure: 'standard',
    includeTests: true,
    includeAssets: true,
    includeTemplates: true,
    includeDocs: true
  },
  
  advanced: {
    security: {
      nonceVerification: true,
      sanitization: true,
      validation: true,
      escaping: true,
      capabilities: true
    },
    performance: {
      caching: false,
      optimization: true,
      lazyLoading: false,
      minification: false
    },
    compatibility: {
      multisite: false,
      gutenberg: true,
      woocommerce: false,
      bbpress: false,
      buddypress: false
    }
  },
  
  generated: {
    files: [],
    documentation: null,
    readme: null,
    marketing: null,
    timestamp: null
  }
}

const getters = {
  pluginData: state => state,
  basicInfo: state => state.basic,
  features: state => state.features,
  structure: state => state.structure,
  advanced: state => state.advanced,
  generated: state => state.generated,
  isValid: state => {
    return state.basic.name && 
           state.basic.slug && 
           state.basic.description &&
           state.basic.author
  },
  pluginSlug: state => state.basic.slug || state.basic.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  namespace: state => state.structure.namespace || state.basic.name.replace(/[^a-zA-Z0-9]/g, ''),
  mainClass: state => state.structure.mainClass || state.basic.name.replace(/[^a-zA-Z0-9]/g, '_')
}

const mutations = {
  SET_BASIC_INFO(state, data) {
    state.basic = { ...state.basic, ...data }
    
    // Auto-generate slug if not provided
    if (data.name && !data.slug) {
      state.basic.slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }
    
    // Auto-generate text domain
    if (data.name && !data.textDomain) {
      state.basic.textDomain = state.basic.slug
    }
  },
  
  SET_FEATURES(state, data) {
    state.features = { ...state.features, ...data }
  },
  
  ADD_FEATURE(state, { type, feature }) {
    if (state.features[type] && !state.features[type].includes(feature)) {
      state.features[type].push(feature)
    }
  },
  
  REMOVE_FEATURE(state, { type, index }) {
    if (state.features[type] && state.features[type][index]) {
      state.features[type].splice(index, 1)
    }
  },
  
  SET_STRUCTURE(state, data) {
    state.structure = { ...state.structure, ...data }
  },
  
  SET_ADVANCED(state, data) {
    state.advanced = { ...state.advanced, ...data }
  },
  
  SET_GENERATED_FILES(state, files) {
    state.generated.files = files
    state.generated.timestamp = new Date().toISOString()
  },
  
  SET_GENERATED_CONTENT(state, { type, content }) {
    state.generated[type] = content
  },
  
  RESET_PLUGIN(state) {
    // Reset to initial state
    Object.assign(state, {
      basic: {
        name: '',
        slug: '',
        version: '1.0.0',
        description: '',
        author: '',
        authorURI: '',
        pluginURI: '',
        textDomain: '',
        domainPath: '/languages',
        license: 'GPL v2 or later',
        licenseURI: 'https://www.gnu.org/licenses/gpl-2.0.html',
        requiresWP: '5.0',
        testedUpTo: '6.4',
        requiresPHP: '7.4',
        network: false,
        tags: []
      },
      features: {
        primary: [],
        secondary: [],
        dependencies: [],
        hooks: [],
        shortcodes: [],
        widgets: [],
        customPostTypes: [],
        taxonomies: [],
        adminPages: [],
        restAPI: [],
        blocks: []
      },
      structure: {
        namespace: '',
        mainClass: '',
        fileStructure: 'standard',
        includeTests: true,
        includeAssets: true,
        includeTemplates: true,
        includeDocs: true
      },
      advanced: {
        security: {
          nonceVerification: true,
          sanitization: true,
          validation: true,
          escaping: true,
          capabilities: true
        },
        performance: {
          caching: false,
          optimization: true,
          lazyLoading: false,
          minification: false
        },
        compatibility: {
          multisite: false,
          gutenberg: true,
          woocommerce: false,
          bbpress: false,
          buddypress: false
        }
      },
      generated: {
        files: [],
        documentation: null,
        readme: null,
        marketing: null,
        timestamp: null
      }
    })
  }
}

const actions = {
  initializePlugin({ commit }) {
    // Initialize with default values if needed
  },
  
  updateBasicInfo({ commit }, data) {
    commit('SET_BASIC_INFO', data)
  },
  
  updateFeatures({ commit }, data) {
    commit('SET_FEATURES', data)
  },
  
  addFeature({ commit }, payload) {
    commit('ADD_FEATURE', payload)
  },
  
  removeFeature({ commit }, payload) {
    commit('REMOVE_FEATURE', payload)
  },
  
  updateStructure({ commit }, data) {
    commit('SET_STRUCTURE', data)
  },
  
  updateAdvanced({ commit }, data) {
    commit('SET_ADVANCED', data)
  },
  
  async generatePlugin({ commit, state, dispatch }) {
    try {
      dispatch('ui/setLoading', { 
        status: true, 
        message: 'Generating plugin files...' 
      }, { root: true })
      
      // Generate plugin files using the plugin generator service
      const { PluginGenerator } = await import('../../services/PluginGenerator')
      const files = await PluginGenerator.generate(state)
      
      commit('SET_GENERATED_FILES', files)
      
      dispatch('ui/setLoading', { status: false }, { root: true })
      dispatch('ui/showSuccess', 'Plugin generated successfully!', { root: true })
      
      return files
    } catch (error) {
      console.error('Plugin generation failed:', error)
      dispatch('ui/setLoading', { status: false }, { root: true })
      dispatch('ui/showError', `Plugin generation failed: ${error.message}`, { root: true })
      throw error
    }
  },
  
  async generateDocumentation({ commit, state, dispatch }) {
    try {
      const result = await dispatch('ai/generateDocumentation', state, { root: true })
      commit('SET_GENERATED_CONTENT', { type: 'documentation', content: result.content })
      return result
    } catch (error) {
      console.error('Documentation generation failed:', error)
      throw error
    }
  },
  
  async generateReadme({ commit, state, dispatch }) {
    try {
      const result = await dispatch('ai/generateReadme', state, { root: true })
      commit('SET_GENERATED_CONTENT', { type: 'readme', content: result.content })
      return result
    } catch (error) {
      console.error('Readme generation failed:', error)
      throw error
    }
  },
  
  async generateMarketing({ commit, state, dispatch }) {
    try {
      const result = await dispatch('ai/generateMarketing', state, { root: true })
      commit('SET_GENERATED_CONTENT', { type: 'marketing', content: result.content })
      return result
    } catch (error) {
      console.error('Marketing generation failed:', error)
      throw error
    }
  },
  
  resetPlugin({ commit }) {
    commit('RESET_PLUGIN')
  },
  
  loadPluginData({ commit }, data) {
    if (data.basic) commit('SET_BASIC_INFO', data.basic)
    if (data.features) commit('SET_FEATURES', data.features)
    if (data.structure) commit('SET_STRUCTURE', data.structure)
    if (data.advanced) commit('SET_ADVANCED', data.advanced)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}