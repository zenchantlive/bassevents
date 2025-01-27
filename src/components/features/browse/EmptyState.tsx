import { type FC } from 'react'
import { MotionDiv } from '@/components/ui/motion'

interface EmptyStateProps {
  onReset: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export const EmptyState: FC<EmptyStateProps> = ({ onReset, className = '' }) => {
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onReset(e)
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      <h2 className="text-2xl font-bold mb-4">No events found</h2>
      <p className="text-gray-600 mb-6">
        Try adjusting your filters or search criteria
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Reset Filters
      </button>
    </MotionDiv>
  )
}
