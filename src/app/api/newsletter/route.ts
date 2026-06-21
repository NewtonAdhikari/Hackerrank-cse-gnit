import { z } from 'zod'
import { handleGasProxy } from '@/lib/server/gas-proxy'
import type { NewsletterFormPayload } from '@/lib/types'

export const runtime = 'nodejs'

const newsletterSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.').max(160),
})

export async function POST(request: Request) {
  return handleGasProxy<NewsletterFormPayload>(request, {
    path: 'newsletter',
    schema: newsletterSchema,
    successMessage: 'Subscribed to the newsletter successfully.',
  })
}
