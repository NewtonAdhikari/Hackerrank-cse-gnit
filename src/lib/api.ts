import { leaders, members, events, galleryItems } from './mock-data'
import { achievements } from './types'
import type {
  ApiResponse,
  ApiSuccessResponse,
  ContactFormPayload,
  EventRegistrationPayload,
  NewsletterFormPayload,
} from './types'

type FormEndpoint = 'contact' | 'newsletter' | 'register'

async function fetchJSON<T>(endpoint: string): Promise<T> {
  await new Promise((r) => setTimeout(r, 300))
  return mockResponse(endpoint) as T
}

async function postJSON<T extends object>(
  endpoint: FormEndpoint,
  body: unknown
): Promise<ApiSuccessResponse<T>> {
  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  let payload: ApiResponse<T>

  try {
    payload = await res.json()
  } catch {
    throw new Error('The server returned an unexpected response.')
  }

  if (!res.ok || !payload.success) {
    throw new Error(payload.success ? 'Request failed. Please try again.' : payload.error)
  }

  return payload
}

function mockResponse(endpoint: string): unknown {
  switch (endpoint) {
    case '/leadership': return leaders
    case '/members': return members
    case '/events': return events
    case '/gallery': return galleryItems
    case '/achievements': return achievements
    default: return []
  }
}

export const api = {
  getLeaders: () => fetchJSON<typeof leaders>('/leadership'),
  getMembers: () => fetchJSON<typeof members>('/members'),
  getEvents: () => fetchJSON<typeof events>('/events'),
  getGallery: () => fetchJSON<typeof galleryItems>('/gallery'),
  getAchievements: () => fetchJSON<typeof achievements>('/achievements'),
  register: (data: EventRegistrationPayload) => postJSON<{ id: string }>('register', data),
  contact: (data: ContactFormPayload) => postJSON('contact', data),
  newsletter: (data: NewsletterFormPayload) => postJSON('newsletter', data),
}
