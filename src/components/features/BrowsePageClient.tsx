'use client'

import { type FC } from 'react'
import { type Event } from '@/types/Event'
import { MotionDiv } from '@/components/ui/motion'
import { useBrowseStore } from '@/stores/useBrowseStore'
import { FilterSidebar } from './browse/FilterSidebar'
import { SearchBar } from './browse/SearchBar'
import { ViewControls } from './browse/ViewControls'
import { EventGrid } from './EventGrid'
import { EmptyState } from './browse/EmptyState'
import { useFilteredEvents } from '@/hooks/useFilteredEvents'
import { useUrlSync } from '@/hooks/useUrlSync'

interface BrowsePageClientProps {
  events: Event[]
}

export const BrowsePageClient: FC<BrowsePageClientProps> = ({ events }) => {
  const { viewMode, sortOption, filters, resetFilters } = useBrowseStore()
  const filteredEvents = useFilteredEvents({ events, filters, sortOption })
  
  // Sync state with URL
  useUrlSync()

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    resetFilters()
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <main className="container mx-auto px-4 py-8 relative z-0" onClick={stopPropagation}>
      <div className="relative z-0 pointer-events-auto">
        {/* Search Bar */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <SearchBar />
        </MotionDiv>

        {/* View Controls and Results Count */}
        <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-foreground/60">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </div>
        <ViewControls />
      </div>

        <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80 lg:sticky lg:top-20 isolate"
          onClick={stopPropagation}
        >
          <FilterSidebar />
        </MotionDiv>

        {/* Main Content */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          {/* Events Grid/List */}
          {filteredEvents.length > 0 ? (
            <EventGrid 
              events={filteredEvents}
              className={viewMode === 'list' ? 'grid-cols-1 gap-4' : undefined}
            />
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </MotionDiv>
        </div>
      </div>
    </main>
  )
}
