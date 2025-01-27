import { type Metadata } from 'next'
import { getEvents } from '@/data/events'
import { BrowsePageClient } from '@/components/features/BrowsePageClient'

export const metadata: Metadata = {
  title: 'Browse Events | Bass Events',
  description: 'Discover and filter bass music events by genre, price, and more.',
}

export default function BrowsePage() {
  const events = getEvents()
  return <BrowsePageClient events={events} />
}
