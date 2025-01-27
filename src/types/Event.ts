/**
 * Represents a music event in the system
 * @property id - Unique identifier for the event
 * @property title - Name of the event
 * @property date - ISO string of event date and time
 * @property description - Full description of the event
 * @property imageUrl - URL to the event's cover image (WebP format)
 * @property ticketUrl - External URL to purchase tickets
 * @property venue - Information about the event venue
 * @property artists - List of performing artists
 * @property price - Ticket price information
 * @property tags - Categories or genres for the event
 */
export interface Event {
  id: string
  title: string
  date: string
  description: string
  imageUrl: string
  ticketUrl: string
  venue: {
    name: string
    address: string
    googleMapsUrl: string
    capacity?: number
  }
  artists: Array<{
    name: string
    imageUrl?: string
    socialLinks?: {
      instagram?: string
      soundcloud?: string
      spotify?: string
    }
  }>
  price: {
    currency: 'USD'
    amount: number
    tier?: string
  }
  tags: string[]
  status: 'upcoming' | 'live' | 'ended' | 'cancelled'
  minimumAge?: number
  doorTime?: string // ISO string for when doors open
  endTime?: string // ISO string for when event ends
}

/**
 * Represents a filtered subset of events
 * @property events - Array of events matching filter criteria
 * @property total - Total number of events matching criteria
 * @property page - Current page number
 * @property limit - Number of events per page
 */
export interface EventsResponse {
  events: Event[]
  total: number
  page: number
  limit: number
}

/**
 * Available sort options for events
 */
export type EventSortOption = 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc'

/**
 * Filter criteria for events
 */
export interface EventFilters {
  startDate?: string
  endDate?: string
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  status?: Event['status']
  minimumAge?: number
}
