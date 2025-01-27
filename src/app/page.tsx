'use client'

import { MotionDiv, MotionH2 } from '@/components/ui/motion'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary-light/20 animate-gradient-xy" />
        
        {/* Content */}
        <div className="container-custom relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 heading-gradient">
              Experience Bass Music
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your premier destination for experimental bass music events. 
              Feel the vibrations, join the movement.
            </p>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/events"
                className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-full transition-colors duration-300"
              >
                Explore Events
              </Link>
              <Link
                href="/about"
                className="border border-primary hover:border-primary-light text-white px-8 py-3 rounded-full transition-colors duration-300"
              >
                Learn More
              </Link>
            </MotionDiv>
          </MotionDiv>
        </div>

        {/* Decorative Elements */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
        </MotionDiv>
      </section>

      {/* Featured Events Preview */}
      <section className="py-20 bg-black/50">
        <div className="container-custom">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center heading-gradient"
          >
            Upcoming Events
          </MotionH2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card Placeholder */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 animate-gradient-x" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                <p className="text-gray-400">Stay tuned for upcoming events...</p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>
    </>
  )
}
