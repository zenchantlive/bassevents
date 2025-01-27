import { type Event } from '@/types/Event'

export const events: Event[] = [
  {
    id: "bass-sanctuary-2025",
    title: "Bass Sanctuary 2025",
    date: "2025-02-15T20:00:00Z",
    description: "Experience the deepest frequencies and most experimental sound design in bass music. Featuring cutting-edge artists pushing the boundaries of electronic music, immersive visuals, and a state-of-the-art sound system.",
    imageUrl: "",
    ticketUrl: "https://example.com/tickets/bass-sanctuary-2025",
    venue: {
      name: "The Underground Chamber",
      address: "123 Deep Bass Ave, Los Angeles, CA 90014",
      googleMapsUrl: "https://maps.google.com/?q=123+Deep+Bass+Ave+Los+Angeles+CA+90014",
      capacity: 500
    },
    artists: [
      {
        name: "SubFrequency",
        imageUrl: "",
        socialLinks: {
          instagram: "https://instagram.com/subfrequency",
          soundcloud: "https://soundcloud.com/subfrequency"
        }
      },
      {
        name: "WaveShaper",
        imageUrl: "",
        socialLinks: {
          instagram: "https://instagram.com/waveshaper",
          spotify: "https://spotify.com/artist/waveshaper"
        }
      }
    ],
    price: {
      currency: "USD",
      amount: 35,
      tier: "Early Bird"
    },
    tags: ["experimental bass", "dubstep", "sound design"],
    status: "upcoming",
    minimumAge: 18,
    doorTime: "2025-02-15T19:00:00Z",
    endTime: "2025-02-16T02:00:00Z"
  },
  {
    id: "neural-frequencies",
    title: "Neural Frequencies",
    date: "2025-03-01T21:00:00Z",
    description: "A night of neuro bass and experimental rhythms. Featuring live visual mapping, interactive art installations, and the latest in neurofunk and experimental drum & bass.",
    imageUrl: "",
    ticketUrl: "https://example.com/tickets/neural-frequencies",
    venue: {
      name: "Digital Dreams Arena",
      address: "456 Synth Street, Los Angeles, CA 90015",
      googleMapsUrl: "https://maps.google.com/?q=456+Synth+Street+Los+Angeles+CA+90015",
      capacity: 800
    },
    artists: [
      {
        name: "NeuralNet",
        imageUrl: "",
        socialLinks: {
          instagram: "https://instagram.com/neuralnet",
          soundcloud: "https://soundcloud.com/neuralnet",
          spotify: "https://spotify.com/artist/neuralnet"
        }
      },
      {
        name: "Synaptic",
        imageUrl: "",
        socialLinks: {
          instagram: "https://instagram.com/synaptic",
          soundcloud: "https://soundcloud.com/synaptic"
        }
      }
    ],
    price: {
      currency: "USD",
      amount: 45,
      tier: "General Admission"
    },
    tags: ["neurofunk", "drum and bass", "experimental"],
    status: "upcoming",
    minimumAge: 21,
    doorTime: "2025-03-01T20:00:00Z",
    endTime: "2025-03-02T04:00:00Z"
  },
  {
    id: "space-bass-odyssey",
    title: "Space Bass Odyssey",
    date: "2025-03-15T20:00:00Z",
    description: "Journey through space and sound with this cosmic bass music experience. Featuring space-themed visuals, ambient rooms, and the most forward-thinking artists in bass music.",
    imageUrl: "",
    ticketUrl: "https://example.com/tickets/space-bass-odyssey",
    venue: {
      name: "Cosmic Gateway",
      address: "789 Stellar Way, Los Angeles, CA 90016",
      googleMapsUrl: "https://maps.google.com/?q=789+Stellar+Way+Los+Angeles+CA+90016",
      capacity: 600
    },
    artists: [
      {
        name: "Astral Projector",
        imageUrl: "",
        socialLinks: {
          instagram: "https://instagram.com/astralprojector",
          soundcloud: "https://soundcloud.com/astralprojector",
          spotify: "https://spotify.com/artist/astralprojector"
        }
      },
      {
        name: "Cosmic Frequency",
        imageUrl: "",
        socialLinks: {
          instagram: "https://instagram.com/cosmicfrequency",
          soundcloud: "https://soundcloud.com/cosmicfrequency"
        }
      }
    ],
    price: {
      currency: "USD",
      amount: 40,
      tier: "Pre-sale"
    },
    tags: ["space bass", "ambient", "experimental"],
    status: "upcoming",
    minimumAge: 18,
    doorTime: "2025-03-15T19:00:00Z",
    endTime: "2025-03-16T03:00:00Z"
  }
]

export const getEvents = () => events

export const getEventById = (id: string) => events.find(event => event.id === id)

export const getUpcomingEvents = () => events.filter(event => event.status === 'upcoming')

export const getEventsByTag = (tag: string) => events.filter(event => event.tags.includes(tag))
