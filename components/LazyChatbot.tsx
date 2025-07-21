'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

export default function LazyChatbot() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Only load chatbot after user has been on page for 5 seconds
    const loadTimer = setTimeout(() => {
      setShouldLoad(true)
    }, 5000)

    // Show chatbot after user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 500 && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(loadTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  if (!shouldLoad || !isVisible) {
    return null
  }

  return <ChatbotInterfaceComponent />
}

// Placeholder component - you can implement the actual chatbot interface
function ChatbotInterfaceComponent() {
  return (
    <div className="fixed bottom-4 right-4 w-12 h-12 bg-neon-green rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
      <MessageCircle className="text-cyber-black" size={20} />
    </div>
  )
} 