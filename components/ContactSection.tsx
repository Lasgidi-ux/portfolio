'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, MessageCircle, Phone, Mail, MapPin, Bot, User, Sparkles, Zap } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', message: '🤖 Welcome to OpsBot-2030! I\'m your AI DevOps assistant. How can I help you today?' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission with enhanced animation
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      // Enhanced success notification
      const successDiv = document.createElement('div')
      successDiv.className = 'fixed top-4 right-4 bg-neon-green text-cyber-black px-6 py-4 rounded-lg shadow-neon z-50'
      successDiv.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon.'
      document.body.appendChild(successDiv)
      setTimeout(() => successDiv.remove(), 3000)
    }, 2000)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { id: Date.now(), sender: 'user', message: chatInput }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    // Enhanced bot responses with more variety
    setTimeout(() => {
      const botResponses = [
        '🚀 I can help you with CI/CD pipelines, Kubernetes deployments, and cloud infrastructure automation.',
        '☁️ For immediate assistance, you can reach Rachel at +1 (972) 903-5330 or schedule a consultation.',
        '⚡ I\'m here to answer questions about cloud-native technologies, Docker, Terraform, and monitoring.',
        '🔧 Would you like to know more about my GitOps workflows, infrastructure as code, or DevOps best practices?',
        '📊 I can help with performance optimization, security best practices, and scaling strategies.',
        '🛠️ Need help with AWS, Azure, or GCP? I can guide you through cloud-native solutions.'
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage = { id: Date.now() + 1, sender: 'bot', message: randomResponse }
      setChatMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 relative border-4 border-red-500 z-[9999] bg-cyber-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-neon-green glow-text mb-4">
            CONTACT_ME
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel p-6 md:p-8 relative overflow-hidden group">
              {/* Enhanced glassmorphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-4 md:mb-6">
                  <Sparkles className="text-neon-blue mr-3" size={20} />
                  <h3 className="text-xl md:text-2xl font-cyber text-neon-blue">SEND_MESSAGE</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" autoComplete="on" aria-label="Contact form">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-neon-green text-sm font-cyber mb-2 flex items-center">
                      <Zap className="mr-2" size={16} />
                      NAME
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cyber-gray/80 backdrop-blur-sm border border-neon-green/30 text-white p-3 md:p-4 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300"
                      placeholder="Enter your name"
                      required
                      autoComplete="name"
                      aria-label="Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-neon-green text-sm font-cyber mb-2 flex items-center">
                      <Mail className="mr-2" size={16} />
                      EMAIL
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cyber-gray/80 backdrop-blur-sm border border-neon-green/30 text-white p-3 md:p-4 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                      autoComplete="email"
                      aria-label="Email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="block text-neon-green text-sm font-cyber mb-2 flex items-center">
                      <MessageCircle className="mr-2" size={16} />
                      SUBJECT
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-cyber-gray/80 backdrop-blur-sm border border-neon-green/30 text-white p-3 md:p-4 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300"
                      placeholder="What's this about?"
                      required
                      autoComplete="off"
                      aria-label="Subject"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-neon-green text-sm font-cyber mb-2 flex items-center">
                      <Send className="mr-2" size={16} />
                      MESSAGE
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-cyber-gray/80 backdrop-blur-sm border border-neon-green/30 text-white p-3 md:p-4 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or question..."
                      required
                      aria-label="Message"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 30px #00ff41, 0 0 60px #00ff41"
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="cyber-button w-full flex items-center justify-center py-4 text-lg font-bold relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-neon-green/40"
                    aria-label="Send message"
                    type="submit"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2">
                            <Send size={20} />
                          </div>
                          <span className="loading-dots">SENDING</span>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={20} />
                          SEND MESSAGE
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 md:p-8 relative overflow-hidden group">
              {/* Enhanced glassmorphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-4 md:mb-6">
                  <Sparkles className="text-neon-purple mr-3" size={20} />
                  <h3 className="text-xl md:text-2xl font-cyber text-neon-purple">CONTACT_INFO</h3>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <motion.div 
                    className="flex items-center p-4 bg-cyber-gray/50 rounded-lg border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-3 bg-neon-green/20 rounded-full mr-4">
                      <Phone className="text-neon-green" size={20} />
                    </div>
                    <div>
                      <div className="text-neon-blue font-cyber text-sm">PHONE</div>
                      <div className="text-gray-300 font-medium">+1 (972) 903-5330</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center p-4 bg-cyber-gray/50 rounded-lg border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-3 bg-neon-blue/20 rounded-full mr-4">
                      <Mail className="text-neon-blue" size={20} />
                    </div>
                    <div>
                      <div className="text-neon-blue font-cyber text-sm">EMAIL</div>
                      <div className="text-gray-300 font-medium">rachel.devops@techcorp.com</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center p-4 bg-cyber-gray/50 rounded-lg border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-3 bg-neon-purple/20 rounded-full mr-4">
                      <MapPin className="text-neon-purple" size={20} />
                    </div>
                    <div>
                      <div className="text-neon-blue font-cyber text-sm">LOCATION</div>
                      <div className="text-gray-300 font-medium">Dallas, TX, United States</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Enhanced AI Assistant */}
            <div className="glass-panel p-6 md:p-8 relative overflow-hidden group">
              {/* Enhanced glassmorphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center">
                    <Bot className="text-neon-green mr-3" size={20} />
                    <h3 className="text-xl md:text-2xl font-cyber text-neon-green">OPSBOT_AI</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChatOpen(!chatOpen)}
                    className="text-neon-green hover:text-neon-blue transition-colors duration-300"
                  >
                    <MessageCircle size={24} />
                  </motion.button>
                </div>
                
                {chatOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-neon-green/30 rounded-lg p-4 bg-cyber-black/80 backdrop-blur-sm max-h-80 overflow-y-auto"
                  >
                    <div className="space-y-4 mb-4">
                      {chatMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-xs ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`p-2 rounded-full ${msg.sender === 'user' ? 'bg-neon-green text-cyber-black' : 'bg-cyber-gray text-neon-green'}`}>
                              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div
                              className={`p-3 rounded-lg ${
                                msg.sender === 'user'
                                  ? 'bg-neon-green text-cyber-black'
                                  : 'bg-cyber-gray text-neon-green'
                              }`}
                            >
                              <div className="text-sm whitespace-pre-line">{msg.message}</div>
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
                              <Bot size={14} />
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
                    
                    <form onSubmit={handleChatSubmit} className="flex space-x-2" aria-label="Chat with OpsBot AI">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me about DevOps, cloud, or automation..."
                        className="flex-1 bg-cyber-gray/80 backdrop-blur-sm border border-neon-green/30 text-white p-3 rounded-l-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300"
                        aria-label="Chat input"
                        onKeyDown={(e) => { if (e.key === 'Escape') setChatOpen(false) }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-neon-green text-cyber-black px-4 py-3 rounded-r-lg hover:bg-neon-blue transition-colors duration-300 font-bold focus:outline-none focus:ring-2 focus:ring-neon-green/40"
                        aria-label="Send chat message"
                      >
                        Send
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* 1. Add aria-live region for notifications */}
      <div aria-live="polite" id="contact-success-region" className="sr-only"></div>
      {/* 2. Add floating contact button for mobile */}
      <div className="fixed bottom-6 right-6 z-50 block lg:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          className="bg-neon-green text-cyber-black p-4 rounded-full shadow-lg hover:bg-neon-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-green/40"
          aria-label="Scroll to contact form"
        >
          <Mail size={24} />
        </motion.button>
      </div>
    </section>
  )
} 