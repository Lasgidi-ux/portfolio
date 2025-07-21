'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, Filter, AlertCircle, Info, XCircle } from 'lucide-react'

const logLevels = ['INFO', 'WARN', 'ERROR', 'DEBUG']
const services = ['web-app', 'api-service', 'database', 'cache']

const generateLogs = () => {
  const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG']
  const services = ['web-app', 'api-service', 'database', 'cache']
  const messages = [
    'Request processed successfully',
    'Database connection established',
    'Cache miss, fetching from database',
    'User authentication successful',
    'API rate limit exceeded',
    'Database query timeout',
    'Service health check passed',
    'Memory usage at 85%'
  ]
  
  return {
    timestamp: new Date().toISOString(),
    level: levels[Math.floor(Math.random() * levels.length)],
    service: services[Math.floor(Math.random() * services.length)],
    message: messages[Math.floor(Math.random() * messages.length)]
  }
}

export default function LogFusion() {
  const [logs, setLogs] = useState<any[]>([])
  const [selectedLevel, setSelectedLevel] = useState('ALL')
  const [selectedService, setSelectedService] = useState('ALL')
  const [isTailing, setIsTailing] = useState(true)

  useEffect(() => {
    if (!isTailing) return

    const interval = setInterval(() => {
      const newLog = generateLogs()
      setLogs(prev => [...prev.slice(-50), newLog]) // Keep last 50 logs
    }, 1000)

    return () => clearInterval(interval)
  }, [isTailing])

  const filteredLogs = logs.filter(log => {
    if (selectedLevel !== 'ALL' && log.level !== selectedLevel) return false
    if (selectedService !== 'ALL' && log.service !== selectedService) return false
    return true
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-400'
      case 'WARN': return 'text-yellow-400'
      case 'INFO': return 'text-neon-green'
      case 'DEBUG': return 'text-neon-blue'
      default: return 'text-gray-400'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return <XCircle size={14} />
      case 'WARN': return <AlertCircle size={14} />
      case 'INFO': return <Info size={14} />
      case 'DEBUG': return <Database size={14} />
      default: return <Info size={14} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Database className="text-neon-pink mr-2" size={20} />
          <span className="text-neon-pink font-cyber">Log Fusion</span>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTailing(!isTailing)}
            className={`text-sm ${isTailing ? 'text-neon-green' : 'text-gray-400'}`}
          >
            {isTailing ? 'TAILING' : 'PAUSED'}
          </motion.button>
          <span className="text-sm text-gray-400">{filteredLogs.length} logs</span>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-neon-green text-sm font-cyber mb-2">LOG_LEVEL</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full bg-cyber-gray border border-neon-green/30 text-white p-2 rounded focus:border-neon-green focus:outline-none"
          >
            <option value="ALL">ALL LEVELS</option>
            {logLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-neon-blue text-sm font-cyber mb-2">SERVICE</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full bg-cyber-gray border border-neon-blue/30 text-white p-2 rounded focus:border-neon-blue focus:outline-none"
          >
            <option value="ALL">ALL SERVICES</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Log Output */}
      <div className="border border-neon-pink/30 rounded-lg p-4 bg-cyber-black h-64 overflow-y-auto">
        <div className="space-y-1">
          {filteredLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.01 }}
              className="flex items-start space-x-3 text-xs font-terminal"
            >
              <span className="text-gray-500 min-w-[180px]">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <div className={`flex items-center space-x-1 min-w-[60px] ${getLevelColor(log.level)}`}>
                {getLevelIcon(log.level)}
                <span>{log.level}</span>
              </div>
              <span className="text-neon-blue min-w-[100px]">{log.service}</span>
              <span className="text-gray-300 flex-1">{log.message}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="p-3 border border-neon-green/30 rounded">
          <div className="text-neon-green font-cyber">
            {filteredLogs.filter(log => log.level === 'INFO').length}
          </div>
          <div className="text-xs text-gray-400">INFO</div>
        </div>
        <div className="p-3 border border-yellow-400/30 rounded">
          <div className="text-yellow-400 font-cyber">
            {filteredLogs.filter(log => log.level === 'WARN').length}
          </div>
          <div className="text-xs text-gray-400">WARN</div>
        </div>
        <div className="p-3 border border-red-400/30 rounded">
          <div className="text-red-400 font-cyber">
            {filteredLogs.filter(log => log.level === 'ERROR').length}
          </div>
          <div className="text-xs text-gray-400">ERROR</div>
        </div>
        <div className="p-3 border border-neon-blue/30 rounded">
          <div className="text-neon-blue font-cyber">
            {filteredLogs.filter(log => log.level === 'DEBUG').length}
          </div>
          <div className="text-xs text-gray-400">DEBUG</div>
        </div>
      </div>
    </div>
  )
} 