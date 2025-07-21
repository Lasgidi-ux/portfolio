'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Code, Database, MessageSquare, Monitor } from 'lucide-react'
import NeoPipeline from './projects/NeoPipeline'
import KubEye from './projects/KubEye'
import TerraformX from './projects/TerraformX'
import LogFusion from './projects/LogFusion'
import ChatOps from './projects/ChatOps'

const projects = [
  {
    id: 'neopipeline',
    name: 'NeoPipeline',
    description: 'CI/CD visualizer with GitHub Actions/Jenkins integration',
    icon: Play,
    color: 'neon-green'
  },
  {
    id: 'kubeye',
    name: 'KubEye',
    description: 'Simulated Kubernetes dashboard with real-time metrics',
    icon: Monitor,
    color: 'neon-blue'
  },
  {
    id: 'terraformx',
    name: 'TerraformX',
    description: 'Drag-and-drop Terraform resource builder',
    icon: Code,
    color: 'neon-purple'
  },
  {
    id: 'logfusion',
    name: 'LogFusion',
    description: 'Real-time log viewer for microservices',
    icon: Database,
    color: 'neon-pink'
  },
  {
    id: 'chatops',
    name: 'ChatOps-2030',
    description: 'Slack-like interface for DevOps commands',
    icon: MessageSquare,
    color: 'neon-green'
  }
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const selectedProjectData = projects.find(p => p.id === selectedProject)

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-neon-green glow-text mb-4">
            LIVE_PROJECTS
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProject(project.id)}
              className={`glass-panel p-6 cursor-pointer border-2 border-${project.color}/30 hover:border-${project.color}/60 transition-all duration-300 ${
                selectedProject === project.id ? `border-${project.color} shadow-${project.color}` : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <project.icon className={`text-${project.color} mr-3`} size={24} />
                <h3 className="text-xl font-cyber text-neon-green">{project.name}</h3>
              </div>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Project Demo Area */}
        {selectedProject && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {selectedProject === 'neopipeline' && <Play className="text-neon-green mr-3" size={24} />}
                {selectedProject === 'kubeye' && <Monitor className="text-neon-blue mr-3" size={24} />}
                {selectedProject === 'terraformx' && <Code className="text-neon-purple mr-3" size={24} />}
                {selectedProject === 'logfusion' && <Database className="text-neon-pink mr-3" size={24} />}
                {selectedProject === 'chatops' && <MessageSquare className="text-neon-green mr-3" size={24} />}
                <h3 className="text-2xl font-cyber text-neon-green">{selectedProjectData.name}</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-neon-green"
              >
                ✕
              </motion.button>
            </div>
            
            <div className="border border-neon-green/30 rounded-lg p-4 bg-cyber-black">
              {selectedProject === 'neopipeline' && <NeoPipeline />}
              {selectedProject === 'kubeye' && <KubEye />}
              {selectedProject === 'terraformx' && <TerraformX />}
              {selectedProject === 'logfusion' && <LogFusion />}
              {selectedProject === 'chatops' && <ChatOps />}
            </div>
          </motion.div>
        )}

        {/* Project Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="glass-panel p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-cyber text-neon-green mb-2">5</div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </div>
              <div>
                <div className="text-3xl font-cyber text-neon-blue mb-2">100%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-cyber text-neon-purple mb-2">24/7</div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-cyber text-neon-pink mb-2">Real-time</div>
                <div className="text-sm text-gray-400">Data</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 