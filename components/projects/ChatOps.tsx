'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, Bot, User } from 'lucide-react'

const commands = [
  '/deploy web-app to production',
  '/scale api-service to 5 replicas',
  '/restart database-service',
  '/check cluster health',
  '/show logs web-app --tail=50'
]

const botResponses = {
  '/deploy': '🚀 Deploying web-app to production...\n✅ Deployment successful!\n📊 New version: v2.1.0\n⏱️ Deployment time: 2m 34s',
  '/scale': '📈 Scaling api-service to 5 replicas...\n✅ Scaling completed!\n🔍 Current replicas: 5/5\n💾 Resource usage: 78%',
  '/restart': '🔄 Restarting database-service...\n✅ Service restarted successfully!\n📊 Uptime: 99.9%\n🔗 Connections: 1,234',
  '/check': '🏥 Running cluster health check...\n✅ All nodes healthy\n📊 CPU: 45% | Memory: 62%\n🟢 Status: OPERATIONAL',
  '/show': '📋 Fetching logs for web-app...\n📄 Last 50 log entries:\n[INFO] Request processed\n[INFO] Cache hit\n[WARN] High memory usage'
}

export default function ChatOps() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: '🤖 Welcome to ChatOps-2030! I\'m your DevOps assistant. Try commands like /deploy, /scale, /restart, /check, or /show', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleCommand = (command: string) => {
    const userMessage = { id: Date.now(), type: 'user', content: command, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[command as keyof typeof botResponses] || '❌ Unknown command. Try /help for available commands.'
      const botMessage = { id: Date.now() + 1, type: 'bot', content: response, timestamp: new Date() }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (input.startsWith('/')) {
      handleCommand(input)
    } else {
      const userMessage = { id: Date.now(), type: 'user', content: input, timestamp: new Date() }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      
      // Bot response for regular messages
      setTimeout(() => {
        const botMessage = { id: Date.now() + 1, type: 'bot', content: '💬 I can help you with DevOps commands. Try starting with / to see available commands.', timestamp: new Date() }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="text-neon-green mr-2" size={20} />
          <span className="text-neon-green font-cyber">ChatOps-2030</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Online</span>
          <div className="w-2 h-2 bg-neon-green rounded-full"></div>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="border border-neon-green/30 rounded-lg p-4">
        <h3 className="text-neon-green font-cyber mb-3">QUICK_COMMANDS</h3>
        <div className="flex flex-wrap gap-2">
          {commands.map((command, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCommand(command)}
              className="px-3 py-1 bg-cyber-gray border border-neon-green/30 text-neon-green text-xs rounded hover:border-neon-green/60 transition-colors"
            >
              {command}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="border border-neon-green/30 rounded-lg p-4 bg-cyber-black h-64 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-neon-green text-cyber-black' : 'bg-cyber-gray text-neon-green'}`}>
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-neon-green text-cyber-black'
                    : 'bg-cyber-gray text-neon-green'
                }`}>
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-cyber-gray text-neon-green">
                  <Bot size={16} />
                </div>
                <div className="p-3 rounded-lg bg-cyber-gray text-neon-green">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command or message..."
          className="flex-1 bg-cyber-gray border border-neon-green/30 text-white p-3 rounded focus:border-neon-green focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-neon-green text-cyber-black px-4 py-3 rounded hover:bg-neon-blue transition-colors"
        >
          <Send size={16} />
        </motion.button>
      </form>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 border border-neon-green/30 rounded">
          <div className="text-neon-green font-cyber">{messages.length}</div>
          <div className="text-xs text-gray-400">Messages</div>
        </div>
        <div className="p-3 border border-neon-blue/30 rounded">
          <div className="text-neon-blue font-cyber">5</div>
          <div className="text-xs text-gray-400">Commands</div>
        </div>
        <div className="p-3 border border-neon-purple/30 rounded">
          <div className="text-neon-purple font-cyber">Real-time</div>
          <div className="text-xs text-gray-400">Status</div>
        </div>
      </div>
    </div>
  )
} 