'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Server, Database, Globe, Play } from 'lucide-react'

const resourceTypes = [
  { id: 'aws_instance', name: 'EC2 Instance', icon: Server, color: 'neon-green' },
  { id: 'aws_db_instance', name: 'RDS Database', icon: Database, color: 'neon-blue' },
  { id: 'aws_lb', name: 'Load Balancer', icon: Globe, color: 'neon-purple' }
]

export default function TerraformX() {
  const [selectedResources, setSelectedResources] = useState<any[]>([])
  const [showCode, setShowCode] = useState(false)

  const addResource = (resourceType: any) => {
    const newResource = {
      id: `${resourceType.id}_${Date.now()}`,
      type: resourceType.id,
      name: resourceType.name,
      config: {}
    }
    setSelectedResources(prev => [...prev, newResource])
  }

  const generateHCL = () => {
    return `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

${selectedResources.map(resource => `
resource "${resource.type}" "${resource.id}" {
  # Configuration will be generated here
}`).join('\n')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Code className="text-neon-purple mr-2" size={20} />
          <span className="text-neon-purple font-cyber">Terraform Builder</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCode(!showCode)}
          className="text-neon-blue hover:text-neon-green text-sm"
        >
          {showCode ? 'Hide HCL' : 'Show HCL'}
        </motion.button>
      </div>

      {/* Resource Palette */}
      <div className="border border-neon-purple/30 rounded-lg p-4">
        <h3 className="text-neon-purple font-cyber mb-4">RESOURCE_TYPES</h3>
        <div className="grid grid-cols-3 gap-4">
          {resourceTypes.map((resource) => (
            <motion.div
              key={resource.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addResource(resource)}
              className={`p-4 border border-${resource.color}/30 rounded-lg cursor-pointer hover:border-${resource.color}/60 transition-colors`}
            >
              <div className="flex items-center justify-center mb-2">
                <resource.icon className={`text-${resource.color}`} size={24} />
              </div>
              <div className="text-center text-sm text-gray-300">{resource.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Resources */}
      {selectedResources.length > 0 && (
        <div className="border border-neon-green/30 rounded-lg p-4">
          <h3 className="text-neon-green font-cyber mb-4">SELECTED_RESOURCES</h3>
          <div className="space-y-3">
            {selectedResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border border-neon-green/30 rounded bg-cyber-gray/30"
              >
                <div className="flex items-center">
                  <Server className="text-neon-green mr-2" size={16} />
                  <span className="text-neon-green font-cyber">{resource.name}</span>
                </div>
                <span className="text-gray-400 text-sm">{resource.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* HCL Code Output */}
      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-neon-green/30 rounded-lg p-4 bg-cyber-black"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-neon-green font-cyber">main.tf</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-neon-blue hover:text-neon-green text-sm flex items-center"
            >
              <Play className="mr-1" size={16} />
              Apply Plan
            </motion.button>
          </div>
          <pre className="text-xs text-neon-green overflow-x-auto">
            <code>{generateHCL()}</code>
          </pre>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 border border-neon-green/30 rounded">
          <div className="text-neon-green font-cyber">{selectedResources.length}</div>
          <div className="text-xs text-gray-400">Resources</div>
        </div>
        <div className="p-3 border border-neon-blue/30 rounded">
          <div className="text-neon-blue font-cyber">3</div>
          <div className="text-xs text-gray-400">Resource Types</div>
        </div>
        <div className="p-3 border border-neon-purple/30 rounded">
          <div className="text-neon-purple font-cyber">Ready</div>
          <div className="text-xs text-gray-400">Status</div>
        </div>
      </div>
    </div>
  )
} 