import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

// Optimized font loading
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'Rachel DevOps Portfolio 2030',
  description: 'Senior DevOps Engineer Portfolio - Cloud Native, Kubernetes, CI/CD, Infrastructure as Code',
  keywords: 'DevOps, Kubernetes, Docker, Terraform, CI/CD, Cloud Native, AWS, Azure, GCP',
  authors: [{ name: 'Rachel DevOps' }],
  creator: 'Rachel DevOps',
  publisher: 'Rachel DevOps',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rachel-devops-portfolio.vercel.app'),
  openGraph: {
    title: 'Rachel DevOps Portfolio 2030',
    description: 'Senior DevOps Engineer Portfolio - Cloud Native, Kubernetes, CI/CD, Infrastructure as Code',
    url: 'https://rachel-devops-portfolio.vercel.app',
    siteName: 'Rachel DevOps Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rachel DevOps Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rachel DevOps Portfolio 2030',
    description: 'Senior DevOps Engineer Portfolio - Cloud Native, Kubernetes, CI/CD, Infrastructure as Code',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={orbitron.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#00ff41" />
        <meta name="msapplication-TileColor" content="#00ff41" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rachel DevOps",
              "jobTitle": "Senior DevOps Engineer",
              "description": "Cloud Native, Kubernetes, CI/CD, Infrastructure as Code",
              "url": "https://rachel-devops-portfolio.vercel.app",
              "sameAs": [
                "https://github.com/rachel-devops",
                "https://linkedin.com/in/rachel-devops"
              ],
              "knowsAbout": [
                "DevOps",
                "Kubernetes",
                "Docker",
                "Terraform",
                "CI/CD",
                "Cloud Native",
                "AWS",
                "Azure",
                "GCP"
              ]
            })
          }}
        />
      </head>
      <body className="bg-cyber-black text-white antialiased">
        {children}
      </body>
    </html>
  )
} 