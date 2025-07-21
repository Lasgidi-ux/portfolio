'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Tilt } from 'react-tilt'

const skillsData = [
  {
    category: 'Containerization',
    tools: [
      { name: 'Docker', proficiency: 95, icon: '🐳' },
      { name: 'Kubernetes', proficiency: 90, icon: '☸️' },
      { name: 'Helm', proficiency: 85, icon: '⚓' },
    ]
  },
  {
    category: 'Infrastructure as Code',
    tools: [
      { name: 'Terraform', proficiency: 92, icon: '🏗️' },
      { name: 'Ansible', proficiency: 88, icon: '⚙️' },
      { name: 'CloudFormation', proficiency: 80, icon: '☁️' },
    ]
  },
  {
    category: 'CI/CD',
    tools: [
      { name: 'Jenkins', proficiency: 90, icon: '🤖' },
      { name: 'GitHub Actions', proficiency: 88, icon: '⚡' },
      { name: 'GitLab CI', proficiency: 85, icon: '🔧' },
    ]
  },
  {
    category: 'Cloud Platforms',
    tools: [
      { name: 'AWS', proficiency: 92, icon: '☁️' },
      { name: 'Azure', proficiency: 85, icon: '🔷' },
      { name: 'GCP', proficiency: 80, icon: '🔶' },
    ]
  },
  {
    category: 'Monitoring & Logging',
    tools: [
      { name: 'Prometheus', proficiency: 88, icon: '📊' },
      { name: 'Grafana', proficiency: 85, icon: '📈' },
      { name: 'ELK Stack', proficiency: 82, icon: '🔍' },
    ]
  },
  {
    category: 'Scripting & Languages',
    tools: [
      { name: 'Bash', proficiency: 90, icon: '💻' },
      { name: 'Python', proficiency: 85, icon: '🐍' },
      { name: 'Go', proficiency: 75, icon: '🐹' },
    ]
  }
]

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-neon-green glow-text mb-4">
            SKILLS_&_TOOLS
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-panel p-6"
            >
              <h3 className="text-xl font-cyber text-neon-blue mb-6 text-center">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.tools.map((tool, toolIndex) => (
                  <Tilt key={toolIndex} options={{ max: 25, scale: 1.05, speed: 1000 }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-neon-green/30 rounded-lg hover:border-neon-green/60 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{tool.icon}</span>
                          <span className="font-cyber text-neon-green">{tool.name}</span>
                        </div>
                        <span className="text-neon-blue font-bold">{tool.proficiency}%</span>
                      </div>
                      
                      <div className="w-full bg-cyber-gray rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${tool.proficiency}%` } : {}}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + toolIndex * 0.1 }}
                          className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full shadow-neon"
                        />
                      </div>
                    </motion.div>
                  </Tilt>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Radar */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="glass-panel p-8">
            <h3 className="text-2xl font-cyber text-neon-purple text-center mb-8">
              SKILL_PROFICIENCY_MATRIX
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Expert', 'Advanced', 'Intermediate', 'Proficient'].map((level, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-cyber mb-2 ${
                    index === 0 ? 'text-neon-green' :
                    index === 1 ? 'text-neon-blue' :
                    index === 2 ? 'text-neon-purple' : 'text-neon-pink'
                  }`}>
                    {level}
                  </div>
                  <div className="text-sm text-gray-400">
                    {index === 0 ? '90-100%' :
                     index === 1 ? '80-89%' :
                     index === 2 ? '70-79%' : '60-69%'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 