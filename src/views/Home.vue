<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">
              Build WordPress Plugins with AI
            </h1>
            <p class="lead mb-4">
              Generate professional WordPress plugins with intelligent content creation, 
              comprehensive documentation, and AI-powered code generation.
            </p>
            <div class="d-flex gap-3">
              <router-link to="/wizard" class="btn btn-light btn-lg">
                <i class="fas fa-magic me-2"></i>Start Wizard
              </router-link>
              <router-link to="/generator" class="btn btn-outline-light btn-lg">
                <i class="fas fa-code me-2"></i>Advanced Generator
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <div class="card bg-white text-dark shadow-lg">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-robot text-primary me-2"></i>
                    AI-Powered Generation
                  </h5>
                  <p class="card-text">
                    Leverage advanced AI models to generate plugin code, documentation, 
                    and marketing materials automatically.
                  </p>
                  <div class="ai-status-demo">
                    <span class="badge bg-success">
                      <i class="fas fa-check-circle me-1"></i>Gemini AI Connected
                    </span>
                    <span class="badge bg-info ms-2">
                      <i class="fas fa-sync-alt me-1"></i>Generating...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="display-5 fw-bold">Powerful Features</h2>
            <p class="lead text-muted">
              Everything you need to create professional WordPress plugins
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="fas fa-brain fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">AI-Powered Content</h5>
                <p class="card-text">
                  Generate comprehensive documentation, readme files, and marketing 
                  materials using advanced AI models like Gemini and OpenRouter.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="fas fa-code fa-3x text-success"></i>
                </div>
                <h5 class="card-title">Smart Code Generation</h5>
                <p class="card-text">
                  Generate WordPress-compliant code following best practices, 
                  security standards, and coding conventions automatically.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="fas fa-shield-alt fa-3x text-warning"></i>
                </div>
                <h5 class="card-title">Security & Compliance</h5>
                <p class="card-text">
                  Built-in security features including nonce verification, 
                  input sanitization, and WordPress coding standards compliance.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="fas fa-file-alt fa-3x text-info"></i>
                </div>
                <h5 class="card-title">Complete Documentation</h5>
                <p class="card-text">
                  Automatically generate user guides, API documentation, 
                  installation instructions, and developer notes.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="fas fa-palette fa-3x text-danger"></i>
                </div>
                <h5 class="card-title">Template System</h5>
                <p class="card-text">
                  Choose from pre-built templates or create custom templates 
                  for different types of WordPress plugins.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="fas fa-globe fa-3x text-secondary"></i>
                </div>
                <h5 class="card-title">Multi-Language Support</h5>
                <p class="card-text">
                  Generate content in multiple languages (EN, ES, FR) with 
                  proper internationalization and localization support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Providers Section -->
    <section class="ai-providers-section py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="display-5 fw-bold">Powered by Leading AI</h2>
            <p class="lead text-muted">
              Integrated with the most advanced AI platforms
            </p>
          </div>
        </div>
        
        <div class="row g-4 justify-content-center">
          <div class="col-md-4">
            <div class="ai-provider-card card border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="provider-logo mb-3">
                  <i class="fab fa-google fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">Gemini AI</h5>
                <p class="card-text">
                  Google's most advanced AI model for intelligent content generation 
                  and code analysis.
                </p>
                <div class="provider-status">
                  <span class="badge bg-success" v-if="aiProviders.gemini.status === 'connected'">
                    <i class="fas fa-check-circle me-1"></i>Connected
                  </span>
                  <span class="badge bg-secondary" v-else>
                    <i class="fas fa-times-circle me-1"></i>Not Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="ai-provider-card card border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="provider-logo mb-3">
                  <i class="fas fa-route fa-3x text-success"></i>
                </div>
                <h5 class="card-title">OpenRouter</h5>
                <p class="card-text">
                  Access to multiple AI models including Claude, GPT-4, and more 
                  through a unified API.
                </p>
                <div class="provider-status">
                  <span class="badge bg-success" v-if="aiProviders.openrouter.status === 'connected'">
                    <i class="fas fa-check-circle me-1"></i>Connected
                  </span>
                  <span class="badge bg-secondary" v-else>
                    <i class="fas fa-times-circle me-1"></i>Not Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="ai-provider-card card border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="provider-logo mb-3">
                  <i class="fas fa-cube fa-3x text-info"></i>
                </div>
                <h5 class="card-title">v0.dev</h5>
                <p class="card-text">
                  Specialized AI for generating visual components and user 
                  interface elements.
                </p>
                <div class="provider-status">
                  <span class="badge bg-success" v-if="aiProviders.v0dev.status === 'connected'">
                    <i class="fas fa-check-circle me-1"></i>Connected
                  </span>
                  <span class="badge bg-secondary" v-else>
                    <i class="fas fa-times-circle me-1"></i>Not Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row mt-4">
          <div class="col-lg-12 text-center">
            <router-link to="/settings" class="btn btn-primary btn-lg">
              <i class="fas fa-cog me-2"></i>Configure AI Providers
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Getting Started Section -->
    <section class="getting-started-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="display-5 fw-bold">Get Started in Minutes</h2>
            <p class="lead text-muted">
              Follow these simple steps to create your first AI-powered WordPress plugin
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-3">
            <div class="step-card text-center">
              <div class="step-number mb-3">
                <span class="badge bg-primary rounded-circle p-3">1</span>
              </div>
              <h5>Configure AI</h5>
              <p class="text-muted">
                Set up your AI provider API keys in the settings panel.
              </p>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="step-card text-center">
              <div class="step-number mb-3">
                <span class="badge bg-primary rounded-circle p-3">2</span>
              </div>
              <h5>Use the Wizard</h5>
              <p class="text-muted">
                Follow the guided setup wizard to define your plugin requirements.
              </p>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="step-card text-center">
              <div class="step-number mb-3">
                <span class="badge bg-primary rounded-circle p-3">3</span>
              </div>
              <h5>Generate Content</h5>
              <p class="text-muted">
                Let AI generate your plugin code, documentation, and materials.
              </p>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="step-card text-center">
              <div class="step-number mb-3">
                <span class="badge bg-primary rounded-circle p-3">4</span>
              </div>
              <h5>Download & Deploy</h5>
              <p class="text-muted">
                Download your complete plugin package and deploy to WordPress.
              </p>
            </div>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-12 text-center">
            <router-link to="/wizard" class="btn btn-primary btn-lg me-3">
              <i class="fas fa-magic me-2"></i>Start Building Now
            </router-link>
            <router-link to="/templates" class="btn btn-outline-primary btn-lg">
              <i class="fas fa-eye me-2"></i>View Templates
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters('ai', ['aiProviders'])
  },
  mounted() {
    // Initialize AI status check
    this.$store.dispatch('ai/initializeAI')
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero-image {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.feature-icon {
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.ai-provider-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ai-provider-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.step-card {
  padding: 2rem 1rem;
}

.step-number .badge {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.ai-status-demo {
  margin-top: 1rem;
}

.provider-status {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 50vh;
    text-align: center;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
  
  .step-card {
    padding: 1rem;
    margin-bottom: 2rem;
  }
}
</style>