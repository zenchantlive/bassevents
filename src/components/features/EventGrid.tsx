import { type FC } from 'react'
import { type Event } from '@/types/Event'
import { EventCard } from './EventCard'
import { cn } from '@/lib/utils'

interface EventGridProps {
  events: Event[]
  className?: string
}

export const EventGrid: FC<EventGridProps> = ({ events, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      className
    )}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  )
}
