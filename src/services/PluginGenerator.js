import JSZip from 'jszip'

export class PluginGenerator {
  static async generate(pluginData) {
    const files = []
    
    try {
      // Generate main plugin file
      files.push(await this.generateMainFile(pluginData))
      
      // Generate class files
      files.push(...await this.generateClassFiles(pluginData))
      
      // Generate template files
      if (pluginData.structure.includeTemplates) {
        files.push(...await this.generateTemplateFiles(pluginData))
      }
      
      // Generate asset files
      if (pluginData.structure.includeAssets) {
        files.push(...await this.generateAssetFiles(pluginData))
      }
      
      // Generate test files
      if (pluginData.structure.includeTests) {
        files.push(...await this.generateTestFiles(pluginData))
      }
      
      // Generate documentation files
      if (pluginData.structure.includeDocs) {
        files.push(...await this.generateDocumentationFiles(pluginData))
      }
      
      // Generate configuration files
      files.push(...await this.generateConfigFiles(pluginData))
      
      return files
    } catch (error) {
      console.error('Plugin generation failed:', error)
      throw error
    }
  }
  
  static async generateMainFile(pluginData) {
    const { basic, structure, advanced } = pluginData
    const namespace = structure.namespace || this.sanitizeNamespace(basic.name)
    const mainClass = structure.mainClass || this.sanitizeClassName(basic.name)
    
    const content = `<?php
/**
 * Plugin Name: ${basic.name}
 * Plugin URI: ${basic.pluginURI || 'https://example.com'}
 * Description: ${basic.description}
 * Version: ${basic.version}
 * Author: ${basic.author}
 * Author URI: ${basic.authorURI || 'https://example.com'}
 * License: ${basic.license}
 * License URI: ${basic.licenseURI}
 * Text Domain: ${basic.textDomain}
 * Domain Path: ${basic.domainPath}
 * Requires at least: ${basic.requiresWP}
 * Tested up to: ${basic.testedUpTo}
 * Requires PHP: ${basic.requiresPHP}
 * Network: ${basic.network ? 'true' : 'false'}
 *
 * @package ${namespace}
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('${this.sanitizeConstant(basic.name)}_VERSION', '${basic.version}');
define('${this.sanitizeConstant(basic.name)}_PLUGIN_FILE', __FILE__);
define('${this.sanitizeConstant(basic.name)}_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('${this.sanitizeConstant(basic.name)}_PLUGIN_URL', plugin_dir_url(__FILE__));

// Autoloader
require_once ${this.sanitizeConstant(basic.name)}_PLUGIN_DIR . 'vendor/autoload.php';

/**
 * Main plugin class
 *
 * @since 1.0.0
 */
final class ${mainClass} {
    
    /**
     * Plugin instance
     *
     * @var ${mainClass}
     */
    private static $instance = null;
    
    /**
     * Get plugin instance
     *
     * @return ${mainClass}
     */
    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
        
        add_action('plugins_loaded', [$this, 'init']);
        add_action('init', [$this, 'load_textdomain']);
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Initialize plugin components
        ${this.generateInitCode(pluginData)}
    }
    
    /**
     * Load text domain
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            '${basic.textDomain}',
            false,
            dirname(plugin_basename(__FILE__)) . '${basic.domainPath}'
        );
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Activation code
        ${this.generateActivationCode(pluginData)}
        
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Deactivation code
        ${this.generateDeactivationCode(pluginData)}
        
        flush_rewrite_rules();
    }
}

// Initialize plugin
${mainClass}::instance();
`
    
    return {
      path: `${basic.slug}.php`,
      content,
      type: 'php'
    }
  }
  
  static async generateClassFiles(pluginData) {
    const files = []
    const { structure, features } = pluginData
    const namespace = structure.namespace || this.sanitizeNamespace(pluginData.basic.name)
    
    // Generate admin class
    if (features.adminPages && features.adminPages.length > 0) {
      files.push(await this.generateAdminClass(pluginData))
    }
    
    // Generate frontend class
    files.push(await this.generateFrontendClass(pluginData))
    
    // Generate REST API classes
    if (features.restAPI && features.restAPI.length > 0) {
      files.push(...await this.generateRestAPIClasses(pluginData))
    }
    
    // Generate custom post type classes
    if (features.customPostTypes && features.customPostTypes.length > 0) {
      files.push(...await this.generateCustomPostTypeClasses(pluginData))
    }
    
    // Generate widget classes
    if (features.widgets && features.widgets.length > 0) {
      files.push(...await this.generateWidgetClasses(pluginData))
    }
    
    // Generate block classes
    if (features.blocks && features.blocks.length > 0) {
      files.push(...await this.generateBlockClasses(pluginData))
    }
    
    return files
  }
  
  static async generateAdminClass(pluginData) {
    const { basic, structure, features } = pluginData
    const namespace = structure.namespace || this.sanitizeNamespace(basic.name)
    
    const content = `<?php
/**
 * Admin functionality
 *
 * @package ${namespace}
 */

namespace ${namespace};

/**
 * Admin class
 */
class Admin {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_action('admin_init', [$this, 'init_settings']);
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        ${this.generateAdminMenuCode(features.adminPages)}
    }
    
    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        // Enqueue admin scripts and styles
        wp_enqueue_style(
            '${basic.textDomain}-admin',
            ${this.sanitizeConstant(basic.name)}_PLUGIN_URL . 'assets/css/admin.css',
            [],
            ${this.sanitizeConstant(basic.name)}_VERSION
        );
        
        wp_enqueue_script(
            '${basic.textDomain}-admin',
            ${this.sanitizeConstant(basic.name)}_PLUGIN_URL . 'assets/js/admin.js',
            ['jquery'],
            ${this.sanitizeConstant(basic.name)}_VERSION,
            true
        );
    }
    
    /**
     * Initialize settings
     */
    public function init_settings() {
        // Register settings
        ${this.generateSettingsCode(pluginData)}
    }
}
`
    
    return {
      path: 'includes/Admin.php',
      content,
      type: 'php'
    }
  }
  
  static async generateFrontendClass(pluginData) {
    const { basic, structure, features } = pluginData
    const namespace = structure.namespace || this.sanitizeNamespace(basic.name)
    
    const content = `<?php
/**
 * Frontend functionality
 *
 * @package ${namespace}
 */

namespace ${namespace};

/**
 * Frontend class
 */
class Frontend {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('init', [$this, 'init_shortcodes']);
    }
    
    /**
     * Enqueue frontend scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_style(
            '${basic.textDomain}-frontend',
            ${this.sanitizeConstant(basic.name)}_PLUGIN_URL . 'assets/css/frontend.css',
            [],
            ${this.sanitizeConstant(basic.name)}_VERSION
        );
        
        wp_enqueue_script(
            '${basic.textDomain}-frontend',
            ${this.sanitizeConstant(basic.name)}_PLUGIN_URL . 'assets/js/frontend.js',
            ['jquery'],
            ${this.sanitizeConstant(basic.name)}_VERSION,
            true
        );
    }
    
    /**
     * Initialize shortcodes
     */
    public function init_shortcodes() {
        ${this.generateShortcodeCode(features.shortcodes)}
    }
}
`
    
    return {
      path: 'includes/Frontend.php',
      content,
      type: 'php'
    }
  }
  
  static async generateConfigFiles(pluginData) {
    const files = []
    
    // Generate composer.json
    files.push(await this.generateComposerJson(pluginData))
    
    // Generate package.json
    files.push(await this.generatePackageJson(pluginData))
    
    // Generate webpack config
    files.push(await this.generateWebpackConfig(pluginData))
    
    // Generate .gitignore
    files.push(await this.generateGitignore(pluginData))
    
    // Generate README.md
    files.push(await this.generateReadmeMd(pluginData))
    
    return files
  }
  
  static async generateComposerJson(pluginData) {
    const { basic, structure } = pluginData
    const namespace = structure.namespace || this.sanitizeNamespace(basic.name)
    
    const content = JSON.stringify({
      name: `${basic.author.toLowerCase().replace(/\s+/g, '')}/${basic.slug}`,
      description: basic.description,
      type: 'wordpress-plugin',
      license: basic.license,
      authors: [
        {
          name: basic.author,
          email: basic.authorEmail || 'author@example.com'
        }
      ],
      require: {
        php: `>=${basic.requiresPHP}`
      },
      'require-dev': {
        'phpunit/phpunit': '^9.0',
        'wp-coding-standards/wpcs': '^2.3',
        'dealerdirect/phpcodesniffer-composer-installer': '^0.7'
      },
      autoload: {
        'psr-4': {
          [`${namespace}\\`]: 'includes/'
        }
      },
      scripts: {
        test: 'phpunit',
        'cs-check': 'phpcs',
        'cs-fix': 'phpcbf'
      }
    }, null, 2)
    
    return {
      path: 'composer.json',
      content,
      type: 'json'
    }
  }
  
  static async generatePackageJson(pluginData) {
    const { basic } = pluginData
    
    const content = JSON.stringify({
      name: basic.slug,
      version: basic.version,
      description: basic.description,
      scripts: {
        build: 'webpack --mode=production',
        dev: 'webpack --mode=development --watch',
        lint: 'eslint assets/js/**/*.js'
      },
      devDependencies: {
        '@babel/core': '^7.0.0',
        '@babel/preset-env': '^7.0.0',
        'babel-loader': '^8.0.0',
        'css-loader': '^6.0.0',
        'eslint': '^8.0.0',
        'mini-css-extract-plugin': '^2.0.0',
        'sass': '^1.0.0',
        'sass-loader': '^12.0.0',
        'webpack': '^5.0.0',
        'webpack-cli': '^4.0.0'
      }
    }, null, 2)
    
    return {
      path: 'package.json',
      content,
      type: 'json'
    }
  }
  
  static async generateWebpackConfig(pluginData) {
    const content = `const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        admin: './assets/src/js/admin.js',
        frontend: './assets/src/js/frontend.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets/dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
};
`
    
    return {
      path: 'webpack.config.js',
      content,
      type: 'js'
    }
  }
  
  static async generateGitignore(pluginData) {
    const content = `# Dependencies
node_modules/
vendor/

# Build files
assets/dist/
*.min.js
*.min.css

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Environment files
.env
.env.local

# WordPress
wp-config.php
wp-content/uploads/

# Composer
composer.lock

# Package lock files
package-lock.json
yarn.lock
`
    
    return {
      path: '.gitignore',
      content,
      type: 'text'
    }
  }
  
  static async generateReadmeMd(pluginData) {
    const { basic, features } = pluginData
    
    const content = `# ${basic.name}

${basic.description}

## Features

${features.primary?.map(feature => `- ${feature}`).join('\n') || 'No features specified'}

## Installation

1. Upload the plugin files to the \`/wp-content/plugins/${basic.slug}\` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Configure the plugin settings as needed

## Requirements

- WordPress ${basic.requiresWP} or higher
- PHP ${basic.requiresPHP} or higher

## Development

### Setup

\`\`\`bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Build assets
npm run build
\`\`\`

### Testing

\`\`\`bash
# Run PHP tests
composer test

# Run code standards check
composer cs-check
\`\`\`

## License

This plugin is licensed under the ${basic.license}.

## Author

${basic.author}
${basic.authorURI ? `- Website: ${basic.authorURI}` : ''}
`
    
    return {
      path: 'README.md',
      content,
      type: 'markdown'
    }
  }
  
  // Helper methods
  static sanitizeNamespace(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '').replace(/^\d/, 'N')
  }
  
  static sanitizeClassName(name) {
    return name.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^\d/, 'N_')
  }
  
  static sanitizeConstant(name) {
    return name.toUpperCase().replace(/[^A-Z0-9]/g, '_')
  }
  
  static generateInitCode(pluginData) {
    const { features } = pluginData
    let code = ''
    
    if (features.adminPages && features.adminPages.length > 0) {
      code += '        new Admin();\n'
    }
    
    code += '        new Frontend();\n'
    
    if (features.restAPI && features.restAPI.length > 0) {
      code += '        new RestAPI();\n'
    }
    
    return code
  }
  
  static generateActivationCode(pluginData) {
    const { features, advanced } = pluginData
    let code = ''
    
    if (features.customPostTypes && features.customPostTypes.length > 0) {
      code += '        // Register custom post types\n'
      code += '        $this->register_post_types();\n'
    }
    
    if (advanced.performance.caching) {
      code += '        // Clear cache\n'
      code += '        wp_cache_flush();\n'
    }
    
    return code
  }
  
  static generateDeactivationCode(pluginData) {
    const { advanced } = pluginData
    let code = ''
    
    if (advanced.performance.caching) {
      code += '        // Clear cache\n'
      code += '        wp_cache_flush();\n'
    }
    
    return code
  }
  
  static generateAdminMenuCode(adminPages) {
    if (!adminPages || adminPages.length === 0) {
      return '        // No admin pages configured'
    }
    
    let code = ''
    adminPages.forEach(page => {
      code += `        add_menu_page(
            '${page.title}',
            '${page.menuTitle}',
            '${page.capability || 'manage_options'}',
            '${page.slug}',
            [$this, '${page.callback || 'render_page'}']
        );\n`
    })
    
    return code
  }
  
  static generateSettingsCode(pluginData) {
    return '        // Settings registration code will be generated here'
  }
  
  static generateShortcodeCode(shortcodes) {
    if (!shortcodes || shortcodes.length === 0) {
      return '        // No shortcodes configured'
    }
    
    let code = ''
    shortcodes.forEach(shortcode => {
      code += `        add_shortcode('${shortcode.tag}', [$this, '${shortcode.callback}']);\n`
    })
    
    return code
  }
  
  // Additional generator methods would be implemented here...
  static async generateTemplateFiles(pluginData) {
    return []
  }
  
  static async generateAssetFiles(pluginData) {
    return []
  }
  
  static async generateTestFiles(pluginData) {
    return []
  }
  
  static async generateDocumentationFiles(pluginData) {
    return []
  }
  
  static async generateRestAPIClasses(pluginData) {
    return []
  }
  
  static async generateCustomPostTypeClasses(pluginData) {
    return []
  }
  
  static async generateWidgetClasses(pluginData) {
    return []
  }
  
  static async generateBlockClasses(pluginData) {
    return []
  }
}