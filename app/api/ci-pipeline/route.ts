import { NextRequest, NextResponse } from 'next/server'

// Mock data generators
const generatePipelineRun = (id: number) => {
  const stages = ['build', 'test', 'deploy', 'security-scan', 'notify']
  const statuses = ['queued', 'running', 'success', 'failed', 'cancelled']
  const names = [
    'feature/user-auth',
    'bugfix/login-validation',
    'hotfix/security-patch',
    'release/v2.1.0',
    'feature/payment-integration',
    'bugfix/api-timeout',
    'hotfix/memory-leak',
    'release/v2.2.0'
  ]

  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  const stage = stages[Math.floor(Math.random() * stages.length)]
  
  const startTime = new Date(Date.now() - Math.random() * 3600000) // Random time in last hour
  const duration = Math.floor(Math.random() * 300) + 30 // 30-330 seconds
  const endTime = status === 'running' ? null : new Date(startTime.getTime() + duration * 1000)

  const logs = generateLogs(status, stage)
  const yamlConfig = generateYamlConfig(name)

  return {
    id: `pipeline-${id}`,
    name,
    status,
    stage,
    duration,
    startTime: startTime.toISOString(),
    endTime: endTime?.toISOString() || null,
    logs,
    yamlConfig,
    branch: `feature/${name.split('/')[1]}`,
    commit: generateCommitHash(),
    triggeredBy: ['github-webhook', 'manual', 'scheduled'][Math.floor(Math.random() * 3)]
  }
}

const generateLogs = (status: string, stage: string) => {
  const baseLogs = [
    `[${new Date().toISOString()}] INFO: Starting ${stage} stage...`,
    `[${new Date().toISOString()}] INFO: Checking prerequisites...`,
    `[${new Date().toISOString()}] INFO: Running ${stage} commands...`
  ]

  if (status === 'running') {
    baseLogs.push(`[${new Date().toISOString()}] INFO: ${stage} in progress...`)
    baseLogs.push(`[${new Date().toISOString()}] DEBUG: Processing step 3/5...`)
  } else if (status === 'success') {
    baseLogs.push(`[${new Date().toISOString()}] INFO: ${stage} completed successfully`)
    baseLogs.push(`[${new Date().toISOString()}] INFO: Moving to next stage...`)
  } else if (status === 'failed') {
    baseLogs.push(`[${new Date().toISOString()}] ERROR: ${stage} failed at step 3`)
    baseLogs.push(`[${new Date().toISOString()}] ERROR: Exit code: 1`)
    baseLogs.push(`[${new Date().toISOString()}] ERROR: Check logs for details`)
  }

  return baseLogs
}

const generateYamlConfig = (pipelineName: string) => {
  return `# CI/CD Pipeline Configuration
name: ${pipelineName}
version: 2.1

stages:
  - build
  - test
  - security-scan
  - deploy
  - notify

build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
    - npm run test:unit
  artifacts:
    paths:
      - dist/
      - coverage/

test:
  stage: test
  image: node:18-alpine
  script:
    - npm run test:integration
    - npm run test:e2e
  dependencies:
    - build

security-scan:
  stage: security-scan
  image: owasp/zap2docker-stable
  script:
    - zap-baseline.py -t http://localhost:3000
  allow_failure: true

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying to production..."
    - kubectl apply -f k8s/
  environment:
    name: production
  only:
    - main

notify:
  stage: notify
  script:
    - echo "Pipeline completed"
  when: always`
}

const generateCommitHash = () => {
  return Math.random().toString(16).substring(2, 10)
}

export async function GET() {
  try {
    // Generate 5-8 pipeline runs
    const pipelineCount = Math.floor(Math.random() * 4) + 5
    const pipelines = Array.from({ length: pipelineCount }, (_, i) => generatePipelineRun(i + 1))

    // Add some running pipelines for realism
    if (!pipelines.some(p => p.status === 'running')) {
      pipelines[0].status = 'running'
      pipelines[0].endTime = null
    }

    const response = {
      pipelines,
      summary: {
        total: pipelines.length,
        running: pipelines.filter(p => p.status === 'running').length,
        success: pipelines.filter(p => p.status === 'success').length,
        failed: pipelines.filter(p => p.status === 'failed').length,
        queued: pipelines.filter(p => p.status === 'queued').length
      },
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pipeline data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, pipelineId } = body

    let response: any = { success: true }

    switch (action) {
      case 'trigger':
        response = {
          success: true,
          message: `Pipeline ${pipelineId} triggered successfully`,
          newPipeline: generatePipelineRun(Date.now())
        }
        break
      
      case 'cancel':
        response = {
          success: true,
          message: `Pipeline ${pipelineId} cancelled`,
          status: 'cancelled'
        }
        break
      
      case 'retry':
        response = {
          success: true,
          message: `Pipeline ${pipelineId} retrying...`,
          newPipeline: generatePipelineRun(Date.now())
        }
        break
      
      default:
        response = { success: false, message: 'Invalid action' }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process pipeline action' },
      { status: 500 }
    )
  }
} 