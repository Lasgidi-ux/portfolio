'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Calendar, MapPin, Code } from 'lucide-react'

const timelineData = [
  {
    year: '2023 - Present',
    title: 'Senior DevOps Engineer',
    company: 'TechCorp Solutions',
    description: 'Leading cloud-native infrastructure initiatives, implementing GitOps workflows, and optimizing CI/CD pipelines for microservices architecture.',
    technologies: ['Kubernetes', 'Terraform', 'ArgoCD', 'AWS']
  },
  {
    year: '2021 - 2023',
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    description: 'Designed and implemented automated deployment strategies, managed multi-cloud infrastructure, and reduced deployment time by 70%.',
    technologies: ['Docker', 'Jenkins', 'Azure', 'Prometheus']
  },
  {
    year: '2019 - 2021',
    title: 'Site Reliability Engineer',
    company: 'Digital Dynamics',
    description: 'Built monitoring and alerting systems, improved system reliability to 99.9% uptime, and implemented infrastructure as code practices.',
    technologies: ['Grafana', 'Ansible', 'GCP', 'ELK Stack']
  },
  {
    year: '2017 - 2019',
    title: 'Systems Administrator',
    company: 'DataFlow Systems',
    description: 'Managed Linux servers, implemented backup strategies, and automated routine maintenance tasks using shell scripting.',
    technologies: ['Linux', 'Bash', 'Python', 'MySQL']
  }
]

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-neon-green glow-text mb-4">
            ABOUT_ME
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8">
              <div className="flex items-center mb-6">
                <Code className="text-neon-green mr-3" size={24} />
                <h3 className="text-2xl font-cyber text-neon-green">PROFILE_DATA</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-neon-blue font-bold w-24">Name:</span>
                  <span className="text-gray-300">Oyefeso Ayokunbi Rachel</span>
                </div>
                <div className="flex items-center">
                  <span className="text-neon-blue font-bold w-24">Contact:</span>
                  <span className="text-gray-300">+1 (972) 903-5330</span>
                </div>
                <div className="flex items-center">
                  <span className="text-neon-blue font-bold w-24">Experience:</span>
                  <span className="text-gray-300">8+ Years</span>
                </div>
                <div className="flex items-center">
                  <span className="text-neon-blue font-bold w-24">Specialty:</span>
                  <span className="text-gray-300">Cloud Native & Automation</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-cyber text-neon-purple mb-4">CORE_EXPERTISE</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border border-neon-green/30 rounded">
                  <div className="text-3xl font-cyber text-neon-green mb-2">50+</div>
                  <div className="text-sm text-gray-400">Projects Deployed</div>
                </div>
                <div className="text-center p-4 border border-neon-blue/30 rounded">
                  <div className="text-3xl font-cyber text-neon-blue mb-2">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime Achieved</div>
                </div>
                <div className="text-center p-4 border border-neon-purple/30 rounded">
                  <div className="text-3xl font-cyber text-neon-purple mb-2">70%</div>
                  <div className="text-sm text-gray-400">Deployment Time Reduced</div>
                </div>
                <div className="text-center p-4 border border-neon-green/30 rounded">
                  <div className="text-3xl font-cyber text-neon-green mb-2">15+</div>
                  <div className="text-sm text-gray-400">Technologies Mastered</div>
                </div>
              </div>
            </div>

            <a
              href="/Rachel_DevOps_CV.pdf"
              download
              className="cyber-button w-full flex items-center justify-center"
            >
              <Download className="mr-2" size={20} />
              DOWNLOAD CV
            </a>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-green via-neon-blue to-neon-purple" />
            
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="relative mb-8 ml-12"
              >
                <div className="absolute -left-6 top-0 w-4 h-4 bg-neon-green rounded-full border-2 border-cyber-black" />
                
                <div className="glass-panel p-6">
                  <div className="flex items-center mb-3">
                    <Calendar className="text-neon-green mr-2" size={16} />
                    <span className="text-neon-green font-cyber text-sm">{item.year}</span>
                  </div>
                  
                  <h3 className="text-xl font-cyber text-neon-blue mb-2">{item.title}</h3>
                  
                  <div className="flex items-center mb-3">
                    <MapPin className="text-neon-purple mr-2" size={16} />
                    <span className="text-gray-300 text-sm">{item.company}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-cyber-gray border border-neon-green/30 text-neon-green text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 