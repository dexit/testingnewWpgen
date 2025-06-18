import axios from 'axios'

class AIService {
  constructor() {
    this.baseURLs = {
      gemini: 'https://generativelanguage.googleapis.com/v1beta',
      openrouter: 'https://openrouter.ai/api/v1',
      v0dev: 'https://api.v0.dev/v1'
    }
    
    this.models = {
      gemini: 'gemini-pro',
      openrouter: 'anthropic/claude-3-sonnet',
      v0dev: 'v0-default'
    }
  }
  
  async testConnection(provider, apiKey) {
    try {
      switch (provider) {
        case 'gemini':
          return await this.testGemini(apiKey)
        case 'openrouter':
          return await this.testOpenRouter(apiKey)
        case 'v0dev':
          return await this.testV0Dev(apiKey)
        default:
          throw new Error(`Unknown provider: ${provider}`)
      }
    } catch (error) {
      console.error(`Connection test failed for ${provider}:`, error)
      return false
    }
  }
  
  async testGemini(apiKey) {
    const response = await axios.post(
      `${this.baseURLs.gemini}/models/${this.models.gemini}:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{ text: 'Test connection' }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.status === 200
  }
  
  async testOpenRouter(apiKey) {
    const response = await axios.post(
      `${this.baseURLs.openrouter}/chat/completions`,
      {
        model: this.models.openrouter,
        messages: [{ role: 'user', content: 'Test connection' }],
        max_tokens: 10
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.status === 200
  }
  
  async testV0Dev(apiKey) {
    // Placeholder for v0.dev API test
    // Replace with actual v0.dev API endpoint when available
    return true
  }
  
  async generateContent(provider, options) {
    const { type, prompt, apiKey, settings, pluginData } = options
    
    try {
      switch (provider) {
        case 'gemini':
          return await this.generateWithGemini(prompt, apiKey, settings, type, pluginData)
        case 'openrouter':
          return await this.generateWithOpenRouter(prompt, apiKey, settings, type, pluginData)
        case 'v0dev':
          return await this.generateWithV0Dev(prompt, apiKey, settings, type, pluginData)
        default:
          throw new Error(`Unknown provider: ${provider}`)
      }
    } catch (error) {
      console.error(`Content generation failed with ${provider}:`, error)
      throw error
    }
  }
  
  async generateWithGemini(prompt, apiKey, settings, type, pluginData) {
    const enhancedPrompt = this.buildPrompt(prompt, settings, type, pluginData)
    
    const response = await axios.post(
      `${this.baseURLs.gemini}/models/${this.models.gemini}:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{ text: enhancedPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    const content = response.data.candidates[0].content.parts[0].text
    
    return {
      content,
      provider: 'gemini',
      model: this.models.gemini,
      usage: response.data.usageMetadata
    }
  }
  
  async generateWithOpenRouter(prompt, apiKey, settings, type, pluginData) {
    const enhancedPrompt = this.buildPrompt(prompt, settings, type, pluginData)
    
    const response = await axios.post(
      `${this.baseURLs.openrouter}/chat/completions`,
      {
        model: this.models.openrouter,
        messages: [
          {
            role: 'system',
            content: 'You are an expert WordPress plugin developer and technical writer.'
          },
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 8192
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const content = response.data.choices[0].message.content
    
    return {
      content,
      provider: 'openrouter',
      model: this.models.openrouter,
      usage: response.data.usage
    }
  }
  
  async generateWithV0Dev(prompt, apiKey, settings, type, pluginData) {
    // Placeholder for v0.dev implementation
    // This would be used for generating visual components and UI elements
    
    return {
      content: `Generated content for ${type} using v0.dev (placeholder)`,
      provider: 'v0dev',
      model: this.models.v0dev
    }
  }
  
  buildPrompt(basePrompt, settings, type, pluginData) {
    let prompt = basePrompt
    
    // Add context based on type
    switch (type) {
      case 'documentation':
        prompt = this.buildDocumentationPrompt(basePrompt, settings, pluginData)
        break
      case 'readme':
        prompt = this.buildReadmePrompt(basePrompt, settings, pluginData)
        break
      case 'marketing':
        prompt = this.buildMarketingPrompt(basePrompt, settings, pluginData)
        break
      case 'code':
        prompt = this.buildCodePrompt(basePrompt, settings, pluginData)
        break
    }
    
    // Add language and tone settings
    prompt += `\n\nLanguage: ${settings.language}`
    prompt += `\nTone: ${settings.tone}`
    prompt += `\nComplexity: ${settings.complexity}`
    
    if (settings.includeExamples) {
      prompt += '\nInclude practical examples and code snippets where appropriate.'
    }
    
    if (settings.seoOptimized) {
      prompt += '\nOptimize content for SEO with relevant keywords and structure.'
    }
    
    return prompt
  }
  
  buildDocumentationPrompt(basePrompt, settings, pluginData) {
    return `${basePrompt}

Plugin Details:
- Name: ${pluginData.basic?.name || 'Unknown'}
- Description: ${pluginData.basic?.description || 'No description'}
- Version: ${pluginData.basic?.version || '1.0.0'}
- Author: ${pluginData.basic?.author || 'Unknown'}

Features:
${pluginData.features?.primary?.map(f => `- ${f}`).join('\n') || 'No features specified'}

Please generate comprehensive documentation including:
1. Installation instructions
2. Configuration guide
3. Feature documentation
4. API reference (if applicable)
5. Troubleshooting section
6. FAQ section
7. Developer notes

Format the documentation in Markdown with proper headings, code blocks, and examples.`
  }
  
  buildReadmePrompt(basePrompt, settings, pluginData) {
    return `${basePrompt}

Generate a WordPress-compliant readme.txt file for the plugin with the following details:

Plugin Details:
- Name: ${pluginData.basic?.name || 'Unknown'}
- Description: ${pluginData.basic?.description || 'No description'}
- Version: ${pluginData.basic?.version || '1.0.0'}
- Author: ${pluginData.basic?.author || 'Unknown'}
- Requires WordPress: ${pluginData.basic?.requiresWP || '5.0'}
- Tested up to: ${pluginData.basic?.testedUpTo || '6.4'}
- Requires PHP: ${pluginData.basic?.requiresPHP || '7.4'}
- License: ${pluginData.basic?.license || 'GPL v2 or later'}

Features:
${pluginData.features?.primary?.map(f => `- ${f}`).join('\n') || 'No features specified'}

The readme.txt must follow WordPress.org plugin directory standards and include:
- Plugin header with all required fields
- Description section
- Installation instructions
- Frequently Asked Questions
- Screenshots section (placeholder)
- Changelog
- Upgrade Notice (if applicable)

Use proper WordPress readme.txt formatting with === for main headings and == for subheadings.`
  }
  
  buildMarketingPrompt(basePrompt, settings, pluginData) {
    return `${basePrompt}

Create compelling marketing copy for the WordPress plugin:

Plugin Details:
- Name: ${pluginData.basic?.name || 'Unknown'}
- Description: ${pluginData.basic?.description || 'No description'}
- Target Audience: ${pluginData.basic?.targetAudience || 'WordPress users'}

Features:
${pluginData.features?.primary?.map(f => `- ${f}`).join('\n') || 'No features specified'}

Generate marketing materials including:
1. Compelling plugin description (150-200 words)
2. Feature highlights with benefits
3. Call-to-action text
4. Social media posts (Twitter, Facebook, LinkedIn)
5. Email marketing content
6. Press release template
7. Product taglines and slogans

Focus on benefits over features and use persuasive language that resonates with WordPress users.`
  }
  
  buildCodePrompt(basePrompt, settings, pluginData) {
    return `${basePrompt}

Generate WordPress plugin code following these specifications:

Plugin Details:
- Name: ${pluginData.basic?.name || 'Unknown'}
- Namespace: ${pluginData.structure?.namespace || 'PluginNamespace'}
- Main Class: ${pluginData.structure?.mainClass || 'MainClass'}

Requirements:
- Follow WordPress coding standards
- Include proper PHPDoc comments
- Implement security best practices (nonces, sanitization, validation)
- Use object-oriented programming
- Include error handling
- Follow PSR-4 autoloading standards

Generate clean, well-documented, and secure WordPress plugin code.`
  }
}

export default new AIService()

export { AIService }