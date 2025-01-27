import { type Metadata } from 'next'
import { getEvents } from '@/data/events'
import { EventGrid } from '@/components/features/EventGrid'

export const metadata: Metadata = {
  title: 'Events | Bass Events',
  description: 'Discover the latest experimental bass music events in your area. From dubstep to neurofunk, find your next underground electronic music experience.',
  openGraph: {
    title: 'Events | Bass Events',
    description: 'Discover the latest experimental bass music events in your area. From dubstep to neurofunk, find your next underground electronic music experience.',
    images: [
      {
        url: '/og-events.jpg',
        width: 1200,
        height: 630,
        alt: 'Bass Events - Upcoming Events'
      }
    ]
  }
}

export default function EventsPage() {
  const events = getEvents()

  return (
    <main className="container-custom py-24 min-h-screen">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-4">
          Upcoming Events
        </h1>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Experience the cutting edge of bass music with our curated selection of events.
          From intimate underground shows to massive warehouse events, find your next
          sonic adventure.
        </p>
      </div>

      {/* Events Grid */}
      <div className="mb-12">
        <EventGrid events={events} />
      </div>

      {/* No Events State (if needed) */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No Events Found</h2>
          <p className="text-foreground/60">
            Check back soon for upcoming events in your area.
          </p>
        </div>
      )}
    </main>
  )
}
