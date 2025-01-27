import { useMemo } from 'react'
import { type Event } from '@/types/Event'
import { type FilterState, type SortOption } from '@/stores/useBrowseStore'

interface UseFilteredEventsProps {
  events: Event[]
  filters: FilterState
  sortOption: SortOption
}

/**
 * Custom hook for filtering and sorting events based on the current state
 * @param props.events Array of events to filter
 * @param props.filters Current filter state
 * @param props.sortOption Current sort option
 * @returns Filtered and sorted array of events
 */
export const useFilteredEvents = ({ events, filters, sortOption }: UseFilteredEventsProps) => {
  return useMemo(() => {
    let filtered = [...events] // Create a copy to avoid mutating original array

    try {
      // Search filter (case-insensitive)
      if (filters.search) {
        const search = filters.search.toLowerCase()
        filtered = filtered.filter(event =>
          event.title.toLowerCase().includes(search) ||
          event.description.toLowerCase().includes(search)
        )
      }

      // Tag filter (case-insensitive)
      if (filters.tags.length > 0) {
        filtered = filtered.filter(event =>
          filters.tags.every(tag => 
            event.tags.some(eventTag => 
              eventTag.toLowerCase() === tag.toLowerCase()
            )
          )
        )
      }

      // Sort events
      filtered.sort((a, b) => {
        if (sortOption === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        // For 'relevance', prioritize title matches with search term
        if (sortOption === 'relevance' && filters.search) {
          const search = filters.search.toLowerCase()
          const aTitle = a.title.toLowerCase()
          const bTitle = b.title.toLowerCase()
          if (aTitle.includes(search) && !bTitle.includes(search)) return -1
          if (!aTitle.includes(search) && bTitle.includes(search)) return 1
        }
        return 0
      })

      return filtered
    } catch (error) {
      console.error('Error filtering events:', error)
      return events // Return unfiltered events on error
    }
  }, [events, filters, sortOption])
}
