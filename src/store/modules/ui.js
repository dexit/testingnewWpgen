const state = {
  loading: false,
  loadingMessage: '',
  errors: [],
  notifications: [],
  modals: {
    error: false,
    success: false,
    confirm: false
  },
  theme: 'light',
  sidebarCollapsed: false
}

const getters = {
  isLoading: state => state.loading,
  loadingMessage: state => state.loadingMessage,
  errors: state => state.errors,
  notifications: state => state.notifications,
  modals: state => state.modals,
  theme: state => state.theme,
  sidebarCollapsed: state => state.sidebarCollapsed
}

const mutations = {
  SET_LOADING(state, { status, message = '' }) {
    state.loading = status
    state.loadingMessage = message
  },
  
  ADD_ERROR(state, error) {
    state.errors.push({
      id: Date.now(),
      message: error,
      timestamp: new Date().toISOString()
    })
  },
  
  REMOVE_ERROR(state, id) {
    state.errors = state.errors.filter(error => error.id !== id)
  },
  
  CLEAR_ERRORS(state) {
    state.errors = []
  },
  
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push({
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString()
    })
  },
  
  REMOVE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter(notification => notification.id !== id)
  },
  
  SET_MODAL(state, { modal, status }) {
    state.modals[modal] = status
  },
  
  SET_THEME(state, theme) {
    state.theme = theme
    document.documentElement.setAttribute('data-theme', theme)
  },
  
  SET_SIDEBAR_COLLAPSED(state, collapsed) {
    state.sidebarCollapsed = collapsed
  }
}

const actions = {
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  
  showError({ commit }, message) {
    commit('ADD_ERROR', message)
    commit('SET_MODAL', { modal: 'error', status: true })
  },
  
  hideError({ commit }, id) {
    if (id) {
      commit('REMOVE_ERROR', id)
    } else {
      commit('CLEAR_ERRORS')
    }
    commit('SET_MODAL', { modal: 'error', status: false })
  },
  
  showSuccess({ commit }, message) {
    commit('ADD_NOTIFICATION', {
      type: 'success',
      message,
      duration: 5000
    })
  },
  
  showWarning({ commit }, message) {
    commit('ADD_NOTIFICATION', {
      type: 'warning',
      message,
      duration: 7000
    })
  },
  
  showInfo({ commit }, message) {
    commit('ADD_NOTIFICATION', {
      type: 'info',
      message,
      duration: 4000
    })
  },
  
  removeNotification({ commit }, id) {
    commit('REMOVE_NOTIFICATION', id)
  },
  
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
    localStorage.setItem('wp-ai-generator-theme', theme)
  },
  
  toggleSidebar({ commit, state }) {
    commit('SET_SIDEBAR_COLLAPSED', !state.sidebarCollapsed)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}