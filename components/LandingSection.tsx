'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown, Terminal } from 'lucide-react'

export default function LandingSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      const offset = 80 // Account for fixed navigation height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber font-semibold text-white mb-6">
            <span className="text-neon-green">OYEFESO</span>
            <br />
            <span className="text-neon-purple">AYOKUNBI</span>
          </h1>
        </motion.div>

        {/* Job Titles Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-6"
        >
          <div className="text-2xl md:text-3xl font-cyber text-neon-green mb-4">
            <TypeAnimation
              sequence={[
                'DevOps Engineer',
                2000,
                'Cloud Native Specialist',
                2000,
                'Automation Architect',
                2000,
                'Infrastructure as Code Expert',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="glow-text"
            />
          </div>
        </motion.div>

        {/* AI Generated Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8"
        >
          <div className="glass-panel p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Terminal className="text-neon-green mr-2" size={20} />
              <span className="terminal-text text-sm">AI_ANALYSIS.exe</span>
            </div>
            <TypeAnimation
              sequence={[
                'Senior DevOps Engineer with 8+ years of experience in cloud-native architectures, CI/CD automation, and infrastructure as code. Specialized in Kubernetes orchestration, multi-cloud deployments, and building scalable, resilient systems that power the future of digital infrastructure.',
              ]}
              wrapper="p"
              speed={30}
              className="text-gray-300 leading-relaxed"
            />
          </div>
        </motion.div>

        {/* Enter Portfolio Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px #00ff41, 0 0 60px #00ff41"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="cyber-button text-xl px-12 py-6 relative overflow-hidden group"
          >
            <span className="relative z-10">ENTER PORTFOLIO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neon-green cursor-pointer"
            onClick={scrollToAbout}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-20 w-32 h-32 border border-neon-green/30 rounded-full opacity-50"
      />
      
      <motion.div
        animate={{ 
          rotate: -360,
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 left-20 w-24 h-24 border border-neon-blue/30 rounded-full opacity-50"
      />
    </section>
  )
} 