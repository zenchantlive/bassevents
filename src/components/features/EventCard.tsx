'use client'

import { type FC } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { MotionDiv } from '@/components/ui/motion'
import { type Event } from '@/types/Event'
import { useBrowseStore } from '@/stores/useBrowseStore'
import { cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
}

export const EventCard: FC<EventCardProps> = ({ event }) => {
  const { viewMode, filters, addTag, removeTag } = useBrowseStore()
  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy')
  const formattedTime = format(new Date(event.date), 'h:mm a')

  const isListView = viewMode === 'list'

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative bg-background/50 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-colors",
        isListView && "flex"
      )}
    >
      {/* Gradient Background */}
      <div className={cn(
        "relative overflow-hidden",
        isListView ? "w-48 h-full flex-shrink-0" : "h-48 w-full"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary-light/20 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
        
        {/* Event Status Badge */}
        {event.status === 'live' && (
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            Live Now
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "p-6",
        isListView && "flex-1 flex flex-col"
      )}>
        {/* Title and Date */}
        <div className="mb-4">
          <h3 className="text-xl font-bold heading-gradient inline-block mb-2">
            {event.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-foreground/60">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={event.date}>
              {formattedDate} • {formattedTime}
            </time>
          </div>
        </div>

        {/* Description */}
        <p className={cn(
          "text-foreground/80 text-sm mb-4",
          isListView ? "line-clamp-1" : "line-clamp-2"
        )}>
          {event.description}
        </p>

        {/* Venue */}
        <div className="flex items-start space-x-2 text-sm text-foreground/60 mb-4">
          <svg
            className="w-5 h-5 text-primary/60 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="font-medium text-foreground/80">{event.venue.name}</p>
            <p>{event.venue.address}</p>
          </div>
        </div>

        {/* Tags */}
        <div className={cn(
          "flex flex-wrap gap-2 mb-4",
          isListView && "hidden md:flex"
        )}>
          {event.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const lowercaseTag = tag.toLowerCase()
                if (filters.tags.includes(lowercaseTag)) {
                  removeTag(lowercaseTag)
                } else {
                  addTag(lowercaseTag)
                }
              }}
              className={cn(
                "text-xs px-2 py-1 rounded-full transition-colors",
                filters.tags.includes(tag.toLowerCase())
                  ? "bg-primary/20 text-foreground"
                  : "bg-primary/10 text-primary-light hover:bg-primary/20"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Price and Actions */}
        <div className={cn(
          "flex items-center justify-between",
          isListView && "mt-auto"
        )}>
          <div className="text-sm">
            <span className="text-foreground/60">From </span>
            <span className="text-foreground font-bold">
              ${event.price.amount}
            </span>
            {event.price.tier && (
              <span className="text-primary-light ml-1">({event.price.tier})</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href={`/events/${event.id}`}
              className="text-primary hover:text-primary-light transition-colors text-sm font-medium"
            >
              View Details
            </Link>
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Get Tickets
            </a>
          </div>
        </div>
      </div>
    </MotionDiv>
  )
}
