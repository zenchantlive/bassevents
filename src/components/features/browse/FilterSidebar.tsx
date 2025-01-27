'use client'

import { type FC, useMemo } from 'react'
import { useBrowseStore } from '@/stores/useBrowseStore'
import { cn } from '@/lib/utils'
import { events } from '@/data/events'

export const FilterSidebar: FC = () => {
  const { filters, addTag, removeTag, resetFilters } = useBrowseStore()

  // Get unique tags and sort them alphabetically
  const allTags = useMemo(() => {
    const tags = Array.from(new Set(events.flatMap(event => event.tags)))
    return tags.sort((a, b) => a.localeCompare(b))
  }, [])

  // Group tags by category (if they follow a pattern like "category:value")
  const tagGroups = useMemo(() => {
    const groups: Record<string, string[]> = {
      'Genre': [],
      'Experience': [],
      'Other': []
    }

    allTags.forEach(tag => {
      if (tag.toLowerCase().startsWith('genre:')) {
        groups['Genre'].push(tag)
      } else if (tag.toLowerCase().startsWith('exp:')) {
        groups['Experience'].push(tag)
      } else {
        groups['Other'].push(tag)
      }
    })

    return groups
  }, [allTags])

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault()
    e.stopPropagation()
    const lowercaseTag = tag.toLowerCase()
    if (filters.tags.includes(lowercaseTag)) {
      removeTag(lowercaseTag)
    } else {
      addTag(lowercaseTag)
    }
  }

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resetFilters()
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="relative isolate">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg border pointer-events-none" />
      
      {/* Interactive content */}
      <div 
        className="relative z-[100] p-6 space-y-8"
        onClick={stopPropagation}
      >
      {/* Tag Groups */}
      {Object.entries(tagGroups).map(([groupName, tags]) => 
        tags.length > 0 && (
          <div key={groupName} className="space-y-3">
            <h3 className="text-sm font-medium">{groupName}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => {
                // Remove prefix for display
                const displayName = tag.includes(':') ? tag.split(':')[1] : tag

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => handleTagClick(e, tag)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full transition-colors',
                      filters.tags.includes(tag.toLowerCase())
                        ? 'bg-primary/20 text-foreground font-medium'
                        : 'bg-primary/10 text-primary-light hover:bg-primary/20'
                    )}
                  >
                    {displayName}
                  </button>
                )
              })}
            </div>
          </div>
        )
      )}

        {/* Reset Filters */}
        {filters.tags.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="w-full px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  )
}
