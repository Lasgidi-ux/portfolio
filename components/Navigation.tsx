'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Code, Award, FolderOpen, MessageCircle, Sparkles } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Projects', href: '#projects', icon: FolderOpen },
  { name: 'Contact', href: '#contact', icon: MessageCircle },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // Account for fixed navigation height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      // Set navigating state for visual feedback
      setIsNavigating(true)
      
      // Close mobile menu immediately for better UX
      setIsOpen(false)
      
      // Add a small delay to ensure menu closes before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Reset navigating state after scroll completes
        setTimeout(() => {
          setIsNavigating(false)
        }, 1000)
      }, 100)
    } else {
      // If element not found, still close menu
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-glass-dark backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="text-neon-green" size={24} />
              <span className="text-lg md:text-xl lg:text-2xl font-cyber text-neon-green glow-text">
                RACHEL_DEV
              </span>
            </div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <motion.button
                    key={item.name}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 group ${
                      isActive 
                        ? 'text-neon-green bg-neon-green/10 border border-neon-green/30' 
                        : 'text-gray-300 hover:text-neon-green'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon size={16} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-neon-green/5 border border-neon-green/30 rounded-lg -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green/0 via-neon-green/5 to-neon-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 text-gray-300 hover:text-neon-green transition-colors duration-300 cursor-pointer touch-manipulation"
            >
              <div className="relative">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
                <div className="absolute inset-0 bg-neon-green/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-glass-dark backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-4 lg:py-6 space-y-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 255, 65, 0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 cursor-pointer touch-manipulation relative ${
                      isActive 
                        ? 'text-neon-green bg-neon-green/10 border border-neon-green/30' 
                        : 'text-gray-300 hover:text-neon-green hover:bg-white/5 active:bg-neon-green/5'
                    } ${isNavigating ? 'pointer-events-none opacity-75' : ''}`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className="absolute inset-0 bg-neon-green/5 border border-neon-green/30 rounded-lg -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 