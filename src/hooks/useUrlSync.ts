import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useBrowseStore } from '@/stores/useBrowseStore'

/**
 * Custom hook for synchronizing browse state with URL parameters
 */
export const useUrlSync = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { 
    filters, 
    viewMode, 
    sortOption, 
    setSearch, 
    setViewMode, 
    setSortOption,
    addTag,
    removeTag
  } = useBrowseStore()
  
  // Ref to track initial hydration
  const isHydrating = useRef(true)

  // Hydrate state from URL on mount
  useEffect(() => {
    if (!isHydrating.current) return

    try {
      // Batch all state updates
      const updates: (() => void)[] = []

      // Parse search
      const search = searchParams.get('search')
      if (search) {
        updates.push(() => setSearch(search))
      }

      // Parse tags - set all at once instead of toggling
      const tags = searchParams.get('tags')
      if (tags) {
        const parsedTags = JSON.parse(tags)
        if (Array.isArray(parsedTags)) {
          // Remove existing tags first
          filters.tags.forEach(tag => {
            updates.push(() => removeTag(tag))
          })
          // Add new tags
          parsedTags.forEach(tag => {
            updates.push(() => addTag(tag))
          })
        }
      }

      // Parse view mode
      const mode = searchParams.get('view')
      if (mode && ['grid', 'list', 'map'].includes(mode)) {
        updates.push(() => setViewMode(mode as 'grid' | 'list' | 'map'))
      }

      // Parse sort option
      const sort = searchParams.get('sort')
      if (sort && ['date', 'relevance'].includes(sort)) {
        updates.push(() => setSortOption(sort as 'date' | 'relevance'))
      }

      // Execute all updates
      updates.forEach(update => update())
    } catch (error) {
      console.error('Failed to parse URL parameters:', error)
    } finally {
      isHydrating.current = false
    }
  }, [searchParams, setSearch, addTag, removeTag, setViewMode, setSortOption, filters.tags])

  // Sync state to URL - skip during hydration
  useEffect(() => {
    if (isHydrating.current) return

    const params = new URLSearchParams()

    // Add search
    if (filters.search) {
      params.set('search', filters.search)
    }

    // Add tags
    if (filters.tags.length > 0) {
      params.set('tags', JSON.stringify(filters.tags))
    }

    // Add view mode
    if (viewMode !== 'grid') {
      params.set('view', viewMode)
    }

    // Add sort option
    if (sortOption !== 'date') {
      params.set('sort', sortOption)
    }

    // Update URL without causing a navigation
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [filters, viewMode, sortOption, pathname, router])
}
