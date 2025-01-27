'use client'

import { type FC, useState, useCallback } from 'react'
import { useBrowseStore } from '@/stores/useBrowseStore'
import debounce from 'lodash/debounce'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
}

export const SearchBar: FC<SearchBarProps> = ({ className }) => {
  const { filters, setSearch } = useBrowseStore()
  const [localValue, setLocalValue] = useState(filters.search)

  // Debounced search to avoid excessive state updates
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 300),
    [setSearch]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalValue(value) // Update local state immediately for responsive UI
    debouncedSetSearch(value) // Debounced update to global state
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div 
      className={cn(
        'w-full max-w-2xl mx-auto mb-8',
        className
      )}
      onClick={stopPropagation}
    >
      <div className="relative isolate">
        <input
          type="search"
          role="searchbox"
          value={localValue}
          onChange={handleChange}
          onClick={stopPropagation}
          placeholder="Search events..."
          className="relative z-[100] w-full px-4 py-3 bg-background/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-foreground/50"
        />
        {filters.isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary/50 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
