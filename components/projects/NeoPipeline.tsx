'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, XCircle, Clock, GitBranch } from 'lucide-react'

const buildStages = [
  { id: 1, name: 'Checkout', status: 'completed', duration: '2s' },
  { id: 2, name: 'Build', status: 'running', duration: '15s' },
  { id: 3, name: 'Test', status: 'pending', duration: '8s' },
  { id: 4, name: 'Deploy', status: 'pending', duration: '12s' }
]

const yamlConfig = `name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to staging
      if: github.ref == 'refs/heads/develop'
      run: |
        echo "Deploying to staging..."
        kubectl apply -f k8s/staging/
        
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      run: |
        echo "Deploying to production..."
        kubectl apply -f k8s/production/`

export default function NeoPipeline() {
  const [currentStage, setCurrentStage] = useState(1)
  const [showYaml, setShowYaml] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < 4) return prev + 1
        return 1 // Reset to start
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStageIcon = (stageId: number, status: string) => {
    if (stageId < currentStage) return <CheckCircle className="text-neon-green" size={20} />
    if (stageId === currentStage && status === 'running') return <Clock className="text-neon-blue animate-spin" size={20} />
    return <Play className="text-gray-500" size={20} />
  }

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GitBranch className="text-neon-green mr-2" size={20} />
          <span className="text-neon-green font-cyber">main</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Build #2024.1.15</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowYaml(!showYaml)}
            className="text-neon-blue hover:text-neon-green text-sm"
          >
            {showYaml ? 'Hide YAML' : 'Show YAML'}
          </motion.button>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-4">
        {buildStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 border rounded-lg ${
              stage.id === currentStage
                ? 'border-neon-blue bg-cyber-gray/50'
                : stage.id < currentStage
                ? 'border-neon-green bg-cyber-gray/30'
                : 'border-gray-600 bg-cyber-gray/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStageIcon(stage.id, stage.status)}
                <div>
                  <div className="font-cyber text-neon-green">{stage.name}</div>
                  <div className="text-sm text-gray-400">Duration: {stage.duration}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm ${
                  stage.id === currentStage ? 'text-neon-blue' :
                  stage.id < currentStage ? 'text-neon-green' : 'text-gray-500'
                }`}>
                  {stage.id === currentStage ? 'RUNNING' :
                   stage.id < currentStage ? 'COMPLETED' : 'PENDING'}
                </div>
              </div>
            </div>
            
            {stage.id === currentStage && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 h-1 bg-neon-blue rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* YAML Configuration */}
      {showYaml && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-neon-green/30 rounded-lg p-4 bg-cyber-black"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-neon-green font-cyber">pipeline.yml</span>
            <span className="text-gray-400 text-sm">GitHub Actions</span>
          </div>
          <pre className="text-xs text-neon-green overflow-x-auto">
            <code>{yamlConfig}</code>
          </pre>
        </motion.div>
      )}

      {/* Pipeline Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 border border-neon-green/30 rounded">
          <div className="text-neon-green font-cyber">99.8%</div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
        <div className="p-3 border border-neon-blue/30 rounded">
          <div className="text-neon-blue font-cyber">2.3s</div>
          <div className="text-xs text-gray-400">Avg Build Time</div>
        </div>
        <div className="p-3 border border-neon-purple/30 rounded">
          <div className="text-neon-purple font-cyber">24/7</div>
          <div className="text-xs text-gray-400">Monitoring</div>
        </div>
      </div>
    </div>
  )
} 