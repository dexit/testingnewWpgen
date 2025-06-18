<template>
  <footer class="app-footer bg-light py-4 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5>WP AI Content Generator</h5>
          <p class="text-muted">
            Intelligent WordPress plugin generation with AI-powered content creation.
          </p>
        </div>
        <div class="col-md-3">
          <h6>Quick Links</h6>
          <ul class="list-unstyled">
            <li><router-link to="/wizard" class="text-decoration-none">Setup Wizard</router-link></li>
            <li><router-link to="/templates" class="text-decoration-none">Templates</router-link></li>
            <li><router-link to="/documentation" class="text-decoration-none">Documentation</router-link></li>
            <li><router-link to="/settings" class="text-decoration-none">Settings</router-link></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h6>Support</h6>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="text-decoration-none">About</router-link></li>
            <li><router-link to="/privacy" class="text-decoration-none">Privacy Policy</router-link></li>
            <li><a href="https://github.com/wp-ai-generator" class="text-decoration-none" target="_blank">GitHub</a></li>
            <li><a href="mailto:support@wp-ai-generator.com" class="text-decoration-none">Contact</a></li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <p class="text-muted mb-0">
            &copy; {{ currentYear }} WP AI Content Generator. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="text-muted mb-0">
            Last saved: {{ lastSaved ? formatDate(lastSaved) : 'Never' }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  computed: {
    ...mapGetters(['lastSaved']),
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>

<style scoped>
.app-footer {
  margin-top: auto;
}

.app-footer h5,
.app-footer h6 {
  color: #495057;
  margin-bottom: 1rem;
}

.app-footer ul li {
  margin-bottom: 0.5rem;
}

.app-footer a {
  color: #6c757d;
  transition: color 0.2s ease;
}

.app-footer a:hover {
  color: #495057;
}
</style>