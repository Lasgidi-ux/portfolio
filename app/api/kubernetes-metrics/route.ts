import { NextRequest, NextResponse } from 'next/server'

// Mock data generators
const generateNode = (id: number) => {
  const nodeTypes = ['worker', 'master', 'edge']
  const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)]
  const cpuUsage = Math.floor(Math.random() * 80) + 10 // 10-90%
  const memoryUsage = Math.floor(Math.random() * 85) + 15 // 15-100%
  const podCount = Math.floor(Math.random() * 20) + 1 // 1-20 pods

  return {
    id: `node-${id}`,
    name: `${nodeType}-node-${id}`,
    type: nodeType,
    status: Math.random() > 0.1 ? 'Ready' : 'NotReady',
    cpu: {
      usage: cpuUsage,
      capacity: 100,
      unit: '%'
    },
    memory: {
      usage: memoryUsage,
      capacity: 100,
      unit: '%'
    },
    pods: {
      running: podCount,
      total: podCount + Math.floor(Math.random() * 3)
    },
    ip: `10.0.${id}.${Math.floor(Math.random() * 255)}`,
    version: 'v1.28.0',
    os: 'Ubuntu 22.04.3 LTS',
    kernel: '5.15.0-88-generic'
  }
}

const generatePod = (id: number) => {
  const namespaces = ['default', 'kube-system', 'monitoring', 'ingress-nginx', 'cert-manager']
  const statuses = ['Running', 'Pending', 'CrashLoopBackOff', 'Error', 'Completed']
  const services = [
    'auth-service', 'user-service', 'payment-service', 'notification-service',
    'api-gateway', 'database', 'redis', 'nginx', 'prometheus', 'grafana'
  ]

  const namespace = namespaces[Math.floor(Math.random() * namespaces.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const service = services[Math.floor(Math.random() * services.length)]
  const cpuUsage = Math.floor(Math.random() * 50) + 1 // 1-50%
  const memoryUsage = Math.floor(Math.random() * 200) + 10 // 10-210 MB

  return {
    id: `pod-${id}`,
    name: `${service}-${Math.floor(Math.random() * 1000)}`,
    namespace,
    status,
    service,
    cpu: {
      usage: cpuUsage,
      limit: 100,
      unit: '%'
    },
    memory: {
      usage: memoryUsage,
      limit: 512,
      unit: 'MB'
    },
    restarts: Math.floor(Math.random() * 5),
    age: `${Math.floor(Math.random() * 24)}h${Math.floor(Math.random() * 60)}m`,
    ip: `172.16.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    node: `node-${Math.floor(Math.random() * 5) + 1}`
  }
}

const generateEvent = (id: number) => {
  const eventTypes = [
    'PodScheduled', 'Started', 'FailedScheduling', 'BackOff', 'Unhealthy',
    'NodeReady', 'NodeNotReady', 'ScalingReplicaSet', 'Created', 'Killing'
  ]
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
  const severity = ['Normal', 'Warning'][Math.floor(Math.random() * 2)]
  
  const messages = {
    'PodScheduled': 'Successfully assigned pod to node',
    'Started': 'Started container',
    'FailedScheduling': '0/5 nodes are available: 5 node(s) didn\'t match node selector',
    'BackOff': 'Back-off restarting failed container',
    'Unhealthy': 'Readiness probe failed',
    'NodeReady': 'Node is ready',
    'NodeNotReady': 'Node is not ready',
    'ScalingReplicaSet': 'Scaled up replica set',
    'Created': 'Created pod',
    'Killing': 'Killing pod'
  }

  return {
    id: `event-${id}`,
    type: eventType,
    severity,
    message: messages[eventType as keyof typeof messages],
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    involvedObject: {
      kind: ['Pod', 'Node', 'ReplicaSet'][Math.floor(Math.random() * 3)],
      name: `obj-${Math.floor(Math.random() * 1000)}`,
      namespace: ['default', 'kube-system'][Math.floor(Math.random() * 2)]
    },
    count: Math.floor(Math.random() * 5) + 1
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace')
    const nodeFilter = searchParams.get('node')

    // Generate cluster data
    const nodeCount = 5
    const podCount = 25
    const eventCount = 15

    let nodes = Array.from({ length: nodeCount }, (_, i) => generateNode(i + 1))
    let pods = Array.from({ length: podCount }, (_, i) => generatePod(i + 1))
    let events = Array.from({ length: eventCount }, (_, i) => generateEvent(i + 1))

    // Apply filters
    if (namespace) {
      pods = pods.filter(pod => pod.namespace === namespace)
    }

    if (nodeFilter) {
      pods = pods.filter(pod => pod.node === nodeFilter)
    }

    // Calculate cluster health
    const totalNodes = nodes.length
    const readyNodes = nodes.filter(node => node.status === 'Ready').length
    const totalPods = pods.length
    const runningPods = pods.filter(pod => pod.status === 'Running').length

    const clusterHealth = {
      nodes: {
        total: totalNodes,
        ready: readyNodes,
        notReady: totalNodes - readyNodes,
        healthPercentage: Math.round((readyNodes / totalNodes) * 100)
      },
      pods: {
        total: totalPods,
        running: runningPods,
        pending: pods.filter(p => p.status === 'Pending').length,
        failed: pods.filter(p => p.status === 'CrashLoopBackOff' || p.status === 'Error').length,
        healthPercentage: Math.round((runningPods / totalPods) * 100)
      },
      overall: Math.round(((readyNodes / totalNodes) + (runningPods / totalPods)) / 2 * 100)
    }

    const response = {
      cluster: {
        name: 'production-cluster',
        version: 'v1.28.0',
        provider: 'AWS EKS',
        region: 'us-west-2'
      },
      nodes,
      pods,
      events: events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      health: clusterHealth,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Kubernetes metrics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, resource, name } = body

    let response: any = { success: true }

    switch (action) {
      case 'scale':
        response = {
          success: true,
          message: `Scaled ${resource} ${name} to 3 replicas`,
          replicas: 3
        }
        break
      
      case 'restart':
        response = {
          success: true,
          message: `Restarted ${resource} ${name}`,
          timestamp: new Date().toISOString()
        }
        break
      
      case 'delete':
        response = {
          success: true,
          message: `Deleted ${resource} ${name}`,
          timestamp: new Date().toISOString()
        }
        break
      
      default:
        response = { success: false, message: 'Invalid action' }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process Kubernetes action' },
      { status: 500 }
    )
  }
} 