import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getEventById } from '@/data/events'
import { MotionDiv } from '@/components/ui/motion'

interface EventPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params)
  const event = await getEventById(slug)

  if (!event) {
    return {
      title: 'Event Not Found | Bass Events',
      description: 'The requested event could not be found.',
    }
  }

  return {
    title: `${event.title} | Bass Events`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'website',
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await Promise.resolve(params)
  const event = await getEventById(slug)

  if (!event) {
    notFound()
  }

  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy')
  const formattedTime = format(new Date(event.date), 'h:mm a')
  const formattedDoorTime = event.doorTime 
    ? format(new Date(event.doorTime), 'h:mm a')
    : null

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endTime,
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.address
      }
    },
    offers: {
      '@type': 'Offer',
      price: event.price.amount,
      priceCurrency: event.price.currency,
      url: event.ticketUrl
    },
    performer: event.artists.map(artist => ({
      '@type': 'PerformingGroup',
      name: artist.name
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary-light/20 animate-gradient-xy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 container-custom py-8">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-foreground/60">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  {event.venue.name}
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>

        {/* Content Section */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Description */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-foreground/80 whitespace-pre-wrap">
                    {event.description}
                  </p>
                </section>

                {/* Artists */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Artists</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {event.artists.map((artist) => (
                      <div
                        key={artist.name}
                        className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10"
                      >
                        <div className="relative h-24 mb-4 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary-light/10" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
                        {artist.socialLinks && (
                          <div className="flex gap-4">
                            {artist.socialLinks.instagram && (
                              <a
                                href={artist.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-primary transition-colors"
                              >
                                Instagram
                              </a>
                            )}
                            {artist.socialLinks.soundcloud && (
                              <a
                                href={artist.socialLinks.soundcloud}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-primary transition-colors"
                              >
                                SoundCloud
                              </a>
                            )}
                            {artist.socialLinks.spotify && (
                              <a
                                href={artist.socialLinks.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-primary transition-colors"
                              >
                                Spotify
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </MotionDiv>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="sticky top-24 space-y-6"
              >
                {/* Event Details */}
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                  <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-foreground/60">Date and Time</h3>
                      <p className="font-medium">{formattedDate}</p>
                      <p className="text-sm">
                        {formattedDoorTime && (
                          <span>Doors: {formattedDoorTime}<br /></span>
                        )}
                        Show: {formattedTime}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm text-foreground/60">Venue</h3>
                      <p className="font-medium">{event.venue.name}</p>
                      <p className="text-sm">{event.venue.address}</p>
                      <a
                        href={event.venue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-light text-sm mt-1 inline-block"
                      >
                        View on Map
                      </a>
                    </div>

                    <div>
                      <h3 className="text-sm text-foreground/60">Price</h3>
                      <p className="font-medium">
                        ${event.price.amount} {event.price.tier && `(${event.price.tier})`}
                      </p>
                    </div>

                    {event.minimumAge && (
                      <div>
                        <h3 className="text-sm text-foreground/60">Age Restriction</h3>
                        <p className="font-medium">{event.minimumAge}+</p>
                      </div>
                    )}

                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-md font-medium transition-colors"
                    >
                      Get Tickets
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
