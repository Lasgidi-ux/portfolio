import { NextRequest, NextResponse } from 'next/server'

// Mock command handlers
const commandHandlers = {
  '/deploy': {
    description: 'Deploy application to environment',
    usage: '/deploy <environment> [version]',
    examples: ['/deploy staging', '/deploy production v2.1.0'],
    handler: (args: string[]) => {
      const environment = args[0] || 'staging'
      const version = args[1] || 'latest'
      
      return [
        {
          id: `msg-${Date.now()}-1`,
          author: 'OpsBot',
          timestamp: new Date().toISOString(),
          content: `🚀 Starting deployment to **${environment}** environment...`,
          type: 'response',
          status: 'info'
        },
        {
          id: `msg-${Date.now()}-2`,
          author: 'OpsBot',
          timestamp: new Date(Date.now() + 2000).toISOString(),
          content: `📦 Building Docker image for version **${version}**...`,
          type: 'response',
          status: 'info'
        },
        {
          id: `msg-${Date.now()}-3`,
          author: 'OpsBot',
          timestamp: new Date(Date.now() + 4000).toISOString(),
          content: `🔍 Running pre-deployment tests...`,
          type: 'response',
          status: 'info'
        },
        {
          id: `msg-${Date.now()}-4`,
          author: 'OpsBot',
          timestamp: new Date(Date.now() + 6000).toISOString(),
          content: `✅ Deployment to **${environment}** completed successfully!\n\n**Details:**\n• Version: ${version}\n• Environment: ${environment}\n• Duration: 2m 34s\n• Status: ✅ Success`,
          type: 'response',
          status: 'success'
        }
      ]
    }
  },

  '/rollback': {
    description: 'Rollback deployment to previous version',
    usage: '/rollback <environment> [version]',
    examples: ['/rollback production', '/rollback staging v2.0.9'],
    handler: (args: string[]) => {
      const environment = args[0] || 'production'
      const version = args[1] || 'v2.0.9'
      
      return [
        {
          id: `msg-${Date.now()}-1`,
          author: 'OpsBot',
          timestamp: new Date().toISOString(),
          content: `⚠️ **Rollback Warning**\n\nYou're about to rollback **${environment}** to version **${version}**.\n\nThis will affect all users. Are you sure?`,
          type: 'response',
          status: 'warning'
        },
        {
          id: `msg-${Date.now()}-2`,
          author: 'OpsBot',
          timestamp: new Date(Date.now() + 3000).toISOString(),
          content: `🔄 Initiating rollback to **${version}**...`,
          type: 'response',
          status: 'info'
        },
        {
          id: `msg-${Date.now()}-3`,
          author: 'OpsBot',
          timestamp: new Date(Date.now() + 5000).toISOString(),
          content: `✅ Rollback to **${version}** completed successfully!\n\n**Rollback Summary:**\n• Environment: ${environment}\n• Previous Version: v2.1.0\n• New Version: ${version}\n• Duration: 1m 12s`,
          type: 'response',
          status: 'success'
        }
      ]
    }
  },

  '/status': {
    description: 'Check system health and status',
    usage: '/status [service]',
    examples: ['/status', '/status auth-service'],
    handler: (args: string[]) => {
      const service = args[0]
      
      if (service) {
        return [
          {
            id: `msg-${Date.now()}-1`,
            author: 'OpsBot',
            timestamp: new Date().toISOString(),
            content: `📊 **${service} Status Report**\n\n**Health:** ✅ Healthy\n**Uptime:** 99.8%\n**Response Time:** 45ms\n**Error Rate:** 0.02%\n**CPU Usage:** 23%\n**Memory Usage:** 67%\n**Last Deploy:** 2 hours ago`,
            type: 'response',
            status: 'success'
          }
        ]
      }
      
      return [
        {
          id: `msg-${Date.now()}-1`,
          author: 'OpsBot',
          timestamp: new Date().toISOString(),
          content: `🏥 **System Health Overview**\n\n**Overall Status:** ✅ All Systems Operational\n**Uptime:** 99.9%\n**Active Services:** 12/12\n**Alerts:** 0\n\n**Service Status:**\n• API Gateway: ✅ Healthy\n• Auth Service: ✅ Healthy\n• User Service: ✅ Healthy\n• Payment Service: ✅ Healthy\n• Database: ✅ Healthy\n• Redis: ✅ Healthy`,
          type: 'response',
          status: 'success'
        }
      ]
    }
  },

  '/scale': {
    description: 'Scale service replicas',
    usage: '/scale <service> <replicas>',
    examples: ['/scale api-gateway 5', '/scale auth-service 3'],
    handler: (args: string[]) => {
      const service = args[0] || 'api-gateway'
      const replicas = args[1] || '3'
      
      return [
        {
          id: `msg-${Date.now()}-1`,
          author: 'OpsBot',
          timestamp: new Date().toISOString(),
          content: `📈 Scaling **${service}** to **${replicas}** replicas...`,
          type: 'response',
          status: 'info'
        },
        {
          id: `msg-${Date.now()}-2`,
          author: 'OpsBot',
          timestamp: new Date(Date.now() + 3000).toISOString(),
          content: `✅ **${service}** successfully scaled to **${replicas}** replicas!\n\n**Scaling Summary:**\n• Service: ${service}\n• Previous Replicas: 2\n• New Replicas: ${replicas}\n• Duration: 45s`,
          type: 'response',
          status: 'success'
        }
      ]
    }
  },

  '/logs': {
    description: 'Get recent logs for service',
    usage: '/logs <service> [lines]',
    examples: ['/logs auth-service', '/logs api-gateway 50'],
    handler: (args: string[]) => {
      const service = args[0] || 'auth-service'
      const lines = args[1] || '10'
      
      const mockLogs = [
        `[2024-01-15T10:30:15Z] INFO: Request processed successfully`,
        `[2024-01-15T10:30:14Z] INFO: User authentication successful`,
        `[2024-01-15T10:30:13Z] DEBUG: Validating JWT token`,
        `[2024-01-15T10:30:12Z] INFO: Database connection established`,
        `[2024-01-15T10:30:11Z] INFO: Health check passed`
      ]
      
      return [
        {
          id: `msg-${Date.now()}-1`,
          author: 'OpsBot',
          timestamp: new Date().toISOString(),
          content: `📋 **Recent Logs for ${service}** (last ${lines} lines)\n\n\`\`\`\n${mockLogs.slice(0, parseInt(lines)).join('\n')}\n\`\`\``,
          type: 'response',
          status: 'info'
        }
      ]
    }
  },

  '/help': {
    description: 'Show available commands',
    usage: '/help [command]',
    examples: ['/help', '/help deploy'],
    handler: (args: string[]) => {
      const command = args[0]
      
      if (command && commandHandlers[command as keyof typeof commandHandlers]) {
        const cmd = commandHandlers[command as keyof typeof commandHandlers]
        return [
          {
            id: `msg-${Date.now()}-1`,
            author: 'OpsBot',
            timestamp: new Date().toISOString(),
            content: `📖 **Help: ${command}**\n\n**Description:** ${cmd.description}\n**Usage:** \`${cmd.usage}\`\n**Examples:**\n${cmd.examples.map(ex => `• \`${ex}\``).join('\n')}`,
            type: 'response',
            status: 'info'
          }
        ]
      }
      
      const availableCommands = Object.keys(commandHandlers).map(cmd => `• \`${cmd}\` - ${commandHandlers[cmd as keyof typeof commandHandlers].description}`).join('\n')
      
      return [
        {
          id: `msg-${Date.now()}-1`,
          author: 'OpsBot',
          timestamp: new Date().toISOString(),
          content: `🤖 **Available Commands**\n\n${availableCommands}\n\nUse \`/help <command>\` for detailed information about a specific command.`,
          type: 'response',
          status: 'info'
        }
      ]
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { command, userId = 'user-123', channel = 'devops' } = body

    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      )
    }

    // Parse command
    const parts = command.trim().split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Check if command exists
    if (!commandHandlers[cmd as keyof typeof commandHandlers]) {
      return NextResponse.json({
        messages: [
          {
            id: `msg-${Date.now()}-1`,
            author: 'OpsBot',
            timestamp: new Date().toISOString(),
            content: `❌ **Unknown Command**\n\nCommand \`${cmd}\` not found. Use \`/help\` to see available commands.`,
            type: 'response',
            status: 'error'
          }
        ]
      }, { status: 200 })
    }

    // Execute command
    const handler = commandHandlers[cmd as keyof typeof commandHandlers]
    const messages = handler.handler(args)

    // Add user command message
    const userMessage = {
      id: `msg-${Date.now()}-0`,
      author: userId,
      timestamp: new Date().toISOString(),
      content: command,
      type: 'command',
      status: 'info'
    }

    const response = {
      messages: [userMessage, ...messages],
      command: cmd,
      args,
      metadata: {
        channel,
        timestamp: new Date().toISOString(),
        executionTime: Math.floor(Math.random() * 2000) + 500 // 500-2500ms
      }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to process ChatOps command',
        ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return available commands for the frontend
    const availableCommands = Object.entries(commandHandlers).map(([cmd, handler]) => ({
      command: cmd,
      description: handler.description,
      usage: handler.usage,
      examples: handler.examples
    }))

    return NextResponse.json({
      availableCommands,
      botInfo: {
        name: 'OpsBot-2030',
        version: '2.1.0',
        description: 'AI-powered DevOps assistant for infrastructure management',
        capabilities: ['Deployment', 'Monitoring', 'Scaling', 'Logs', 'Health Checks']
      },
      lastUpdated: new Date().toISOString()
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to fetch ChatOps information',
        ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    )
  }
} 