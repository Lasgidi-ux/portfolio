'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const certifications = [
  {
    name: 'AWS Certified DevOps Engineer - Professional',
    issuer: 'Amazon Web Services',
    year: '2023',
    credential: 'AWS-DEVOPS-PRO',
    color: 'neon-green',
    icon: '☁️'
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    year: '2023',
    credential: 'CKA-2023-001234',
    color: 'neon-blue',
    icon: '☸️'
  },
  {
    name: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'Cloud Native Computing Foundation',
    year: '2023',
    credential: 'CKAD-2023-005678',
    color: 'neon-purple',
    icon: '⚡'
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    year: '2023',
    credential: 'HCTA-2023-009876',
    color: 'neon-pink',
    icon: '🏗️'
  },
  {
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc',
    year: '2022',
    credential: 'DCA-2022-003456',
    color: 'neon-green',
    icon: '🐳'
  },
  {
    name: 'Google Cloud Professional DevOps Engineer',
    issuer: 'Google Cloud',
    year: '2022',
    credential: 'GCP-DEVOPS-2022-007890',
    color: 'neon-blue',
    icon: '🔶'
  }
]

type Certification = typeof certifications[number];

export default function CertificationsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [modalCert, setModalCert] = useState<Certification|null>(null);

  const openModal = (cert: Certification) => setModalCert(cert)
  const closeModal = () => setModalCert(null)

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-neon-green glow-text mb-4">
            CERTIFICATIONS
          </h2>
          <div className="w-24 h-1 bg-neon-green mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group perspective-1000"
            >
              <div className="relative h-64 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front of card */}
                <div className={`absolute inset-0 glass-panel p-6 border-2 border-${cert.color} shadow-${cert.color} backface-hidden`}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{cert.icon}</div>
                      <h3 className="text-lg font-cyber text-neon-green mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                      <div className="flex items-center justify-center">
                        <Award className="text-neon-blue mr-2" size={16} />
                        <span className="text-neon-blue text-sm">{cert.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`absolute inset-0 glass-panel p-6 border-2 border-${cert.color} shadow-${cert.color} backface-hidden rotate-y-180`}>
                  <div className="flex flex-col justify-center h-full">
                    <div className="text-center mb-4">
                      <h4 className="text-neon-green font-cyber mb-2">CREDENTIAL_ID</h4>
                      <p className="terminal-text text-sm">{cert.credential}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Issuer:</span>
                        <span className="text-neon-blue">{cert.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Year:</span>
                        <span className="text-neon-purple">{cert.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-neon-green">ACTIVE</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 cyber-button w-full flex items-center justify-center"
                      onClick={() => openModal(cert)}
                    >
                      <ExternalLink className="mr-2" size={16} />
                      VERIFY
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for mock certificate */}
        {modalCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={closeModal}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-cyber-black border-4 border-neon-green rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-neon-green text-xl font-bold">×</button>
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">{modalCert.icon}</div>
                <h3 className="text-2xl font-cyber text-neon-green mb-2 text-center">{modalCert.name}</h3>
                <div className="text-gray-400 text-sm mb-2">{modalCert.issuer}</div>
                <div className="flex items-center mb-4">
                  <Award className="text-neon-blue mr-2" size={20} />
                  <span className="text-neon-blue text-lg">{modalCert.year}</span>
                </div>
                <div className="w-full border-t border-neon-green/30 my-4" />
                <div className="text-center mb-2">
                  <span className="text-neon-green font-cyber">CREDENTIAL ID:</span>
                  <span className="text-neon-blue ml-2 font-mono">{modalCert.credential}</span>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <span className="bg-neon-green text-cyber-black px-4 py-2 rounded-full font-bold text-lg flex items-center">
                    <Award className="mr-2" size={18} />
                    VERIFIED
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Certification Stats */}
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
                <div className="text-3xl font-cyber text-neon-green mb-2">6</div>
                <div className="text-sm text-gray-400">Active Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-cyber text-neon-blue mb-2">3</div>
                <div className="text-sm text-gray-400">Cloud Providers</div>
              </div>
              <div>
                <div className="text-3xl font-cyber text-neon-purple mb-2">2</div>
                <div className="text-sm text-gray-400">Kubernetes Certs</div>
              </div>
              <div>
                <div className="text-3xl font-cyber text-neon-pink mb-2">100%</div>
                <div className="text-sm text-gray-400">Pass Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 