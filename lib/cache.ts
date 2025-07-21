// In-memory cache for API responses
class APICache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttl: number = 60000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

// Global cache instance
export const apiCache = new APICache()

// Cache keys
export const CACHE_KEYS = {
  PIPELINE_DATA: 'pipeline_data',
  KUBERNETES_METRICS: 'kubernetes_metrics',
  LOG_STREAM: 'log_stream',
  TERRAFORM_RESOURCES: 'terraform_resources',
  CHATOPS_COMMANDS: 'chatops_commands',
} as const

// Cache TTLs (in milliseconds)
export const CACHE_TTL = {
  PIPELINE: 30000, // 30 seconds
  KUBERNETES: 15000, // 15 seconds
  LOGS: 5000, // 5 seconds
  TERRAFORM: 300000, // 5 minutes
  CHATOPS: 600000, // 10 minutes
} as const

// Helper function to generate cache keys with parameters
export function generateCacheKey(baseKey: string, params?: Record<string, any>): string {
  if (!params) return baseKey
  
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  
  return `${baseKey}?${sortedParams}`
}

// Helper function to check if cache is valid
export function isCacheValid(timestamp: number, ttl: number): boolean {
  return Date.now() - timestamp < ttl
} 