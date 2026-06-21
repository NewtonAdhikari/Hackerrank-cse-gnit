'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { events } from '@/lib/mock-data'
import { useRouter } from '@/lib/router'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import type { FormStatus } from '@/lib/types'

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  roll: z.string().min(5, 'Enter a valid roll number'),
  department: z.string().min(2, 'Department required'),
  year: z.string().min(1, 'Year required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  gender: z.enum(['male', 'female', 'other'], { message: 'Select gender' }),
  event: z.string().min(1, 'Select an event'),
})

type FormData = z.infer<typeof schema>

const departments = ['CSE']
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export function EventRegisterPage({ slug }: { slug: string }) {
  const { navigate } = useRouter()
  const preselectedEvent = events.find((e) => e.slug === slug)
  const upcomingEvents = events.filter((e) => e.status === 'upcoming')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<{ id: string } | null>(null)
  const [status, setStatus] = useState<FormStatus>(null)

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      event: preselectedEvent?.slug || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setStatus(null)
    try {
      const result = await api.register(data)
      setSuccess({ id: result.id })
      const message = result.message || 'Registration successful!'
      setStatus({ type: 'success', message })
      toast.success(message)
      reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.'
      setStatus({ type: 'error', message })
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto glass-card rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg-green-red flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
            <p className="text-muted-foreground mb-4">A confirmation email has been sent to your registered email address.</p>
            <div className="glass-card rounded-xl p-4 mb-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Your Registration ID</p>
              <p className="text-xl font-bold gradient-text font-mono mt-1">{success.id}</p>
            </div>
            <Button onClick={() => navigate('events')} className="gradient-bg-green-red border-0 text-white w-full">
              Back to Events
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 relative">
          <Button variant="ghost" onClick={() => navigate('events')} className="mb-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary/30 text-primary bg-primary/5">
              Event Registration
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Register for <span className="gradient-text">Event</span>
            </h1>
            <p className="text-muted-foreground">Fill out the form below to secure your spot. A confirmation email will be sent after submission.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card rounded-2xl p-6 md:p-8 space-y-5"
            >
              <Field label="Full Name" error={errors.fullName?.message}>
                <Input {...register('fullName')} placeholder="John Doe" className="bg-background" />
              </Field>

              <Field label="Roll Number" error={errors.roll?.message}>
                <Input {...register('roll')} placeholder="22GNCSE001" className="bg-background" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Department" error={errors.department?.message}>
                  <Select onValueChange={(v) => setValue('department', v)}>
                    <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Year" error={errors.year?.message}>
                  <Select onValueChange={(v) => setValue('year', v)}>
                    <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="Email" error={errors.email?.message}>
                <Input type="email" {...register('email')} placeholder="you@gnit.ac.in" className="bg-background" />
              </Field>

              <Field label="Phone Number" error={errors.phone?.message}>
                <Input {...register('phone')} placeholder="+91 98765 43210" className="bg-background" />
              </Field>

              <Field label="Gender" error={errors.gender?.message}>
                <RadioGroup
                  value={watch('gender')}
                  onValueChange={(v) => setValue('gender', v as 'male' | 'female' | 'other')}
                  className="flex gap-4"
                >
                  {['male', 'female', 'other'].map((g) => (
                    <div key={g} className="flex items-center gap-2">
                      <RadioGroupItem value={g} id={g} />
                      <Label htmlFor={g} className="capitalize cursor-pointer">{g}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </Field>

              <Field label="Select Event" error={errors.event?.message}>
                <Select value={watch('event')} onValueChange={(v) => setValue('event', v)}>
                  <SelectTrigger className="bg-background"><SelectValue placeholder="Choose an event" /></SelectTrigger>
                  <SelectContent>
                    {upcomingEvents.map((e) => <SelectItem key={e.id} value={e.slug}>{e.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              {status && (
                <p
                  role={status.type === 'error' ? 'alert' : 'status'}
                  className={status.type === 'error' ? 'text-sm text-red-500' : 'text-sm text-primary'}
                >
                  {status.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full gradient-bg-green-red border-0 text-white"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
