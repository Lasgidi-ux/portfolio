'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Server, Cpu, Memory, Activity } from 'lucide-react'

const nodes = [
  { name: 'worker-01', status: 'Ready', cpu: 65, memory: 78, pods: 12 },
  { name: 'worker-02', status: 'Ready', cpu: 45, memory: 62, pods: 8 },
  { name: 'worker-03', status: 'Ready', cpu: 82, memory: 91, pods: 15 },
  { name: 'master-01', status: 'Ready', cpu: 23, memory: 34, pods: 3 }
]

const pods = [
  { name: 'web-app-1', namespace: 'default', status: 'Running', cpu: '150m', memory: '256Mi' },
  { name: 'api-service-2', namespace: 'backend', status: 'Running', cpu: '200m', memory: '512Mi' },
  { name: 'db-replica-1', namespace: 'database', status: 'Running', cpu: '300m', memory: '1Gi' },
  { name: 'cache-redis-1', namespace: 'cache', status: 'Running', cpu: '100m', memory: '128Mi' }
]

export default function KubEye() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    pods: 0,
    nodes: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        pods: Math.floor(Math.random() * 50) + 20,
        nodes: 4
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Server className="text-neon-blue mr-2" size={20} />
          <span className="text-neon-blue font-cyber">Kubernetes Cluster</span>
        </div>
        <div className="flex space-x-2">
          {['overview', 'nodes', 'pods'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1 rounded text-sm ${
                selectedTab === tab
                  ? 'bg-neon-blue text-cyber-black'
                  : 'text-gray-400 hover:text-neon-blue'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Metrics */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 border border-neon-green/30 rounded-lg bg-cyber-gray/30"
          >
            <div className="flex items-center justify-between">
              <Cpu className="text-neon-green" size={24} />
              <span className="text-neon-green font-cyber text-2xl">{metrics.cpu}%</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">CPU Usage</div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="p-4 border border-neon-blue/30 rounded-lg bg-cyber-gray/30"
          >
            <div className="flex items-center justify-between">
              <Memory className="text-neon-blue" size={24} />
              <span className="text-neon-blue font-cyber text-2xl">{metrics.memory}%</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">Memory Usage</div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="p-4 border border-neon-purple/30 rounded-lg bg-cyber-gray/30"
          >
            <div className="flex items-center justify-between">
              <Activity className="text-neon-purple" size={24} />
              <span className="text-neon-purple font-cyber text-2xl">{metrics.pods}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">Active Pods</div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            className="p-4 border border-neon-pink/30 rounded-lg bg-cyber-gray/30"
          >
            <div className="flex items-center justify-between">
              <Server className="text-neon-pink" size={24} />
              <span className="text-neon-pink font-cyber text-2xl">{metrics.nodes}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">Nodes</div>
          </motion.div>
        </div>
      )}

      {/* Nodes View */}
      {selectedTab === 'nodes' && (
        <div className="space-y-4">
          {nodes.map((node, index) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-neon-blue/30 rounded-lg bg-cyber-gray/30"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Server className="text-neon-blue mr-2" size={16} />
                  <span className="font-cyber text-neon-blue">{node.name}</span>
                </div>
                <span className="text-neon-green text-sm">{node.status}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">CPU</div>
                  <div className="text-neon-green">{node.cpu}%</div>
                </div>
                <div>
                  <div className="text-gray-400">Memory</div>
                  <div className="text-neon-blue">{node.memory}%</div>
                </div>
                <div>
                  <div className="text-gray-400">Pods</div>
                  <div className="text-neon-purple">{node.pods}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pods View */}
      {selectedTab === 'pods' && (
        <div className="space-y-4">
          {pods.map((pod, index) => (
            <motion.div
              key={pod.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-neon-green/30 rounded-lg bg-cyber-gray/30"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Activity className="text-neon-green mr-2" size={16} />
                  <span className="font-cyber text-neon-green">{pod.name}</span>
                </div>
                <span className="text-neon-blue text-sm">{pod.status}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Namespace</div>
                  <div className="text-neon-purple">{pod.namespace}</div>
                </div>
                <div>
                  <div className="text-gray-400">CPU</div>
                  <div className="text-neon-green">{pod.cpu}</div>
                </div>
                <div>
                  <div className="text-gray-400">Memory</div>
                  <div className="text-neon-blue">{pod.memory}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
} 