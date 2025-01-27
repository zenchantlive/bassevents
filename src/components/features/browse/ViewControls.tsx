import { type FC } from 'react'
import { MotionDiv } from '@/components/ui/motion'
import { useBrowseStore, type ViewMode, type SortOption } from '@/stores/useBrowseStore'
import { cn } from '@/lib/utils'

interface ViewControlsProps {
  className?: string
}

export const ViewControls: FC<ViewControlsProps> = ({ className }) => {
  const { viewMode, sortOption, setViewMode, setSortOption } = useBrowseStore()

  const handleViewChange = (mode: ViewMode) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setViewMode(mode)
  }

  const handleSortChange = (sort: SortOption) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setSortOption(sort)
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-center gap-6 relative z-0', className)}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className="relative z-0 pointer-events-auto">
        {/* Sort Controls */}
        <div className="flex items-center gap-2">
        <span className="text-sm text-foreground/60">Sort by:</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleSortChange('date')}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg transition-colors',
              sortOption === 'date'
                ? 'bg-primary/20 text-foreground font-medium'
                : 'bg-primary/10 text-primary-light hover:bg-primary/20'
            )}
          >
            Date
          </button>
          <button
            type="button"
            onClick={handleSortChange('relevance')}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg transition-colors',
              sortOption === 'relevance'
                ? 'bg-primary/20 text-foreground font-medium'
                : 'bg-primary/10 text-primary-light hover:bg-primary/20'
            )}
          >
            Relevance
          </button>
        </div>
      </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
        <span className="text-sm text-foreground/60">View:</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleViewChange('grid')}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg transition-colors',
              viewMode === 'grid'
                ? 'bg-primary/20 text-foreground font-medium'
                : 'bg-primary/10 text-primary-light hover:bg-primary/20'
            )}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={handleViewChange('list')}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg transition-colors',
              viewMode === 'list'
                ? 'bg-primary/20 text-foreground font-medium'
                : 'bg-primary/10 text-primary-light hover:bg-primary/20'
            )}
          >
            List
          </button>
        </div>
      </div>
      </div>
    </MotionDiv>
  )
}
