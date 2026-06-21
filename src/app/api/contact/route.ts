import { z } from 'zod'
import { handleGasProxy } from '@/lib/server/gas-proxy'
import type { ContactFormPayload } from '@/lib/types'

export const runtime = 'nodejs'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(160),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.').max(2000),
})

export async function POST(request: Request) {
  return handleGasProxy<ContactFormPayload>(request, {
    path: 'contact',
    schema: contactSchema,
    successMessage: 'Message sent successfully. We will get back to you soon.',
  })
}
