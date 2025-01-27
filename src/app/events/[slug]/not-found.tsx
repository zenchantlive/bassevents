import Link from 'next/link'
import { MotionDiv } from '@/components/ui/motion'

export default function EventNotFound() {
  return (
    <main className="container-custom min-h-[70vh] flex items-center justify-center py-24">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-6">
          Event Not Found
        </h1>
        <p className="text-foreground/60 mb-8 max-w-md mx-auto">
          The event you&apos;re looking for doesn&apos;t exist or has been removed.
          Check out our other upcoming events instead.
        </p>
        <Link
          href="/events"
          className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          View All Events
        </Link>
      </MotionDiv>
    </main>
  )
}
