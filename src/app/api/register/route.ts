import { z } from 'zod'
import { handleGasProxy } from '@/lib/server/gas-proxy'
import type { EventRegistrationPayload } from '@/lib/types'

export const runtime = 'nodejs'

const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters.').max(120),
  roll: z.string().trim().min(5, 'Enter a valid roll number.').max(40),
  department: z.string().trim().min(2, 'Department is required.').max(80),
  year: z.string().trim().min(1, 'Year is required.').max(40),
  email: z.string().trim().email('Enter a valid email address.').max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{7,19}$/, 'Enter a valid phone number.'),
  gender: z.enum(['male', 'female', 'other']),
  event: z.string().trim().min(1, 'Event is required.').max(160),
})

export async function POST(request: Request) {
  return handleGasProxy<EventRegistrationPayload, { id: string }>(request, {
    path: 'register',
    schema: registerSchema,
    successMessage: 'Registration submitted successfully.',
    pickResponse: (response) => ({
      id: typeof response.id === 'string' ? response.id : String(response.id ?? ''),
    }),
  })
}
