'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy load the particles component
const ParticlesBackground = dynamic(() => import('./ParticlesBackground'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-br from-cyber-black via-cyber-gray to-cyber-black" />
  ),
})

export default function LazyParticlesBackground() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Load particles after initial render and when idle
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 100)

    // Also load when user becomes idle
    const handleIdle = () => {
      if (!shouldLoad) {
        setShouldLoad(true)
      }
    }

    let idleTimer: NodeJS.Timeout
    const resetIdleTimer = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(handleIdle, 2000) // 2 seconds of inactivity
    }

    // Reset timer on user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, { passive: true })
    })

    resetIdleTimer()

    return () => {
      clearTimeout(timer)
      clearTimeout(idleTimer)
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer)
      })
    }
  }, [shouldLoad])

  if (!shouldLoad) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-cyber-black via-cyber-gray to-cyber-black" />
    )
  }

  return <ParticlesBackground />
} 