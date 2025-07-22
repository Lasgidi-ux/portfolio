import { NextRequest, NextResponse } from 'next/server'

// Mock log generators
const services = [
  'auth-service', 'user-service', 'payment-service', 'notification-service',
  'api-gateway', 'database', 'redis', 'nginx', 'prometheus', 'grafana',
  'order-service', 'inventory-service', 'shipping-service', 'analytics-service'
]

const logLevels = ['INFO', 'ERROR', 'WARN', 'DEBUG', 'FATAL']

const generateLogMessage = (level: string, service: string) => {
  const messages = {
    'INFO': [
      `Request processed successfully for user ${Math.floor(Math.random() * 10000)}`,
      `Database connection established`,
      `Cache hit for key: user_profile_${Math.floor(Math.random() * 1000)}`,
      `Health check passed`,
      `Metrics collected successfully`,
      `API endpoint /api/v1/users called`,
      `User session created`,
      `Payment processed for order ${Math.floor(Math.random() * 10000)}`,
      `Email notification sent`,
      `File uploaded successfully`
    ],
    'ERROR': [
      `Database connection failed: timeout after 30s`,
      `Invalid authentication token`,
      `Payment processing failed: insufficient funds`,
      `API rate limit exceeded`,
      `File upload failed: disk space full`,
      `User session expired`,
      `Cache miss for critical data`,
      `External API call failed: 503 Service Unavailable`,
      `Database query timeout`,
      `Memory usage exceeded 90%`
    ],
    'WARN': [
      `High memory usage detected: 85%`,
      `Slow database query: 2.5s`,
      `API response time degraded: 1.2s`,
      `Cache hit rate below threshold: 60%`,
      `Disk space running low: 15% remaining`,
      `Too many failed login attempts`,
      `Rate limiting approaching threshold`,
      `Database connection pool at 80% capacity`,
      `SSL certificate expires in 30 days`,
      `Backup job running longer than expected`
    ],
    'DEBUG': [
      `Processing request ID: ${Math.floor(Math.random() * 1000000)}`,
      `SQL query executed: SELECT * FROM users WHERE id = ?`,
      `Cache key generated: user_${Math.floor(Math.random() * 1000)}`,
      `JWT token validated successfully`,
      `Request headers: Content-Type=application/json`,
      `Database transaction started`,
      `Redis key set: session_${Math.floor(Math.random() * 1000)}`,
      `API response serialized in 15ms`,
      `User permissions checked`,
      `Rate limit counter incremented`
    ],
    'FATAL': [
      `Database connection pool exhausted`,
      `Critical system failure: unable to start`,
      `Memory allocation failed: out of memory`,
      `SSL certificate validation failed`,
      `Core service dependency unavailable`
    ]
  }

  const serviceMessages = messages[level as keyof typeof messages] || messages['INFO']
  return serviceMessages[Math.floor(Math.random() * serviceMessages.length)]
}

const generateLogEntry = (id: number) => {
  const level = logLevels[Math.floor(Math.random() * logLevels.length)]
  const service = services[Math.floor(Math.random() * services.length)]
  const message = generateLogMessage(level, service)
  
  // Generate realistic timestamps (within last 10 minutes)
  const timestamp = new Date(Date.now() - Math.random() * 600000)
  
  return {
    id: `log-${id}`,
    timestamp: timestamp.toISOString(),
    service,
    level,
    message,
    traceId: `trace-${Math.floor(Math.random() * 1000000)}`,
    spanId: `span-${Math.floor(Math.random() * 100000)}`,
    userId: level === 'INFO' ? `user-${Math.floor(Math.random() * 10000)}` : null,
    requestId: `req-${Math.floor(Math.random() * 1000000)}`,
    duration: level === 'INFO' ? Math.floor(Math.random() * 1000) + 50 : null,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const service = searchParams.get('service')
    const limit = parseInt(searchParams.get('limit') || '20')
    const since = searchParams.get('since')

    // Generate logs
    let logs = Array.from({ length: Math.min(limit, 50) }, (_, i) => generateLogEntry(i + 1))

    // Apply filters
    if (level) {
      logs = logs.filter(log => log.level.toLowerCase() === level.toLowerCase())
    }

    if (service) {
      logs = logs.filter(log => log.service.toLowerCase().includes(service.toLowerCase()))
    }

    if (since) {
      const sinceDate = new Date(since)
      logs = logs.filter(log => new Date(log.timestamp) >= sinceDate)
    }

    // Sort by timestamp (newest first)
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Calculate log statistics
    const stats = {
      total: logs.length,
      byLevel: {
        INFO: logs.filter(log => log.level === 'INFO').length,
        ERROR: logs.filter(log => log.level === 'ERROR').length,
        WARN: logs.filter(log => log.level === 'WARN').length,
        DEBUG: logs.filter(log => log.level === 'DEBUG').length,
        FATAL: logs.filter(log => log.level === 'FATAL').length
      },
      byService: services.reduce((acc, service) => {
        acc[service] = logs.filter(log => log.service === service).length
        return acc
      }, {} as Record<string, number>),
      timeRange: {
        start: logs[logs.length - 1]?.timestamp,
        end: logs[0]?.timestamp
      }
    }

    const response = {
      logs,
      stats,
      filters: {
        level: level || 'all',
        service: service || 'all',
        limit,
        since: since || 'last 10 minutes'
      },
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to fetch log stream',
        ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, filters } = body

    let response: any = { success: true }

    switch (action) {
      case 'clear':
        response = {
          success: true,
          message: 'Log buffer cleared successfully',
          timestamp: new Date().toISOString()
        }
        break
      
      case 'export':
        response = {
          success: true,
          message: 'Logs exported successfully',
          downloadUrl: '/api/logs/export/logs-2024-01-15.json',
          timestamp: new Date().toISOString()
        }
        break
      
      case 'search':
        // Simulate log search
        const searchResults = Array.from({ length: 5 }, (_, i) => generateLogEntry(i + 1))
        response = {
          success: true,
          results: searchResults,
          query: filters?.query || '',
          count: searchResults.length
        }
        break
      
      default:
        response = { success: false, message: 'Invalid action' }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to process log action',
        ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    )
  }
} 