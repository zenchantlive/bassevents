import { create } from 'zustand'

export type ViewMode = 'grid' | 'list' | 'map'
export type SortOption = 'date' | 'relevance'

export interface FilterState {
  search: string
  tags: string[] // All tags stored in lowercase for consistency
  isLoading: boolean
  error: string | null
}

interface BrowseState {
  viewMode: ViewMode
  sortOption: SortOption
  filters: FilterState
  // View controls
  setViewMode: (mode: ViewMode) => void
  setSortOption: (option: SortOption) => void
  // Filter controls with proper event handling
  setSearch: (search: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  toggleTag: (tag: string) => void
  // State management
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  resetFilters: () => void
}

const initialFilters: FilterState = {
  search: '',
  tags: [],
  isLoading: false,
  error: null
}

export const useBrowseStore = create<BrowseState>((set) => ({
  viewMode: 'grid',
  sortOption: 'date',
  filters: initialFilters,

  // View controls
  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),
  setSortOption: (option: SortOption) => set({ sortOption: option }),

  // Filter controls
  setSearch: (search: string) => 
    set((state) => ({ 
      filters: { 
        ...state.filters, 
        search: search.toLowerCase() // Store search in lowercase
      } 
    })),

  addTag: (tag: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tags: [...state.filters.tags, tag.toLowerCase()] // Store tags in lowercase
      }
    })),

  removeTag: (tag: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tags: state.filters.tags.filter(t => t !== tag.toLowerCase())
      }
    })),

  toggleTag: (tag: string) =>
    set((state) => {
      const lowercaseTag = tag.toLowerCase()
      const tagExists = state.filters.tags.includes(lowercaseTag)
      return {
        filters: {
          ...state.filters,
          tags: tagExists
            ? state.filters.tags.filter(t => t !== lowercaseTag)
            : [...state.filters.tags, lowercaseTag]
        }
      }
    }),

  // State management
  setLoading: (isLoading: boolean) =>
    set((state) => ({
      filters: { ...state.filters, isLoading }
    })),

  setError: (error: string | null) =>
    set((state) => ({
      filters: { ...state.filters, error }
    })),

  resetFilters: () => set({ filters: initialFilters })
}))
