/**
 * Format date to human readable string
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  const formatOptions = { ...defaultOptions, ...options }
  
  try {
    return new Intl.DateTimeFormat('en-US', formatOptions).format(new Date(date))
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'Invalid Date'
  }
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize input string
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

/**
 * Generate slug from string
 * @param {string} text - Text to convert to slug
 * @param {string} separator - Separator character (default: '-')
 * @returns {string} Slug string
 */
export function generateSlug(text, separator = '-') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, separator) // Replace spaces and underscores with separator
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '') // Remove leading/trailing separators
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Convert string to camelCase
 * @param {string} str - String to convert
 * @returns {string} CamelCase string
 */
export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * Convert string to PascalCase
 * @param {string} str - String to convert
 * @returns {string} PascalCase string
 */
export function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '')
}

/**
 * Convert string to snake_case
 * @param {string} str - String to convert
 * @returns {string} snake_case string
 */
export function toSnakeCase(str) {
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_')
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Deep clone object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export function isEmpty(obj) {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  return Object.keys(obj).length === 0
}

/**
 * Generate random ID
 * @param {number} length - Length of ID (default: 8)
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (error) {
    console.error('Failed to copy text:', error)
    return false
  }
}

/**
 * Download file from blob
 * @param {Blob} blob - File blob
 * @param {string} filename - File name
 */
export function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Validate WordPress plugin name
 * @param {string} name - Plugin name to validate
 * @returns {Object} Validation result
 */
export function validatePluginName(name) {
  const errors = []
  
  if (!name || name.trim().length === 0) {
    errors.push('Plugin name is required')
  }
  
  if (name.length < 3) {
    errors.push('Plugin name must be at least 3 characters long')
  }
  
  if (name.length > 50) {
    errors.push('Plugin name must be less than 50 characters')
  }
  
  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
    errors.push('Plugin name can only contain letters, numbers, spaces, hyphens, and underscores')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate WordPress version
 * @param {string} version - Version to validate
 * @returns {boolean} True if valid
 */
export function validateWordPressVersion(version) {
  const versionRegex = /^\d+\.\d+(\.\d+)?$/
  return versionRegex.test(version)
}

/**
 * Compare WordPress versions
 * @param {string} version1 - First version
 * @param {string} version2 - Second version
 * @returns {number} -1, 0, or 1
 */
export function compareVersions(version1, version2) {
  const v1parts = version1.split('.').map(Number)
  const v2parts = version2.split('.').map(Number)
  
  const maxLength = Math.max(v1parts.length, v2parts.length)
  
  for (let i = 0; i < maxLength; i++) {
    const v1part = v1parts[i] || 0
    const v2part = v2parts[i] || 0
    
    if (v1part < v2part) return -1
    if (v1part > v2part) return 1
  }
  
  return 0
}