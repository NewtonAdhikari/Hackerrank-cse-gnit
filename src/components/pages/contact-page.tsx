'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, Instagram, Linkedin, Github, Youtube } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/section-header'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import type { FormStatus } from '@/lib/types'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

const Coordinators = [
  { name: 'Dr. B Santhosh Kumar', role: 'Coordinator & HOD - CSE', email: 'bsanthosh.csegnit@gniindia.org' },
  
]

const facultyContacts = [
  { name: 'Dr. Ranjitha Bandi', role: 'Faculty Coordinator 1 · CSE', email: 'ranjithab.csegnit@gniindia.org'},
  { name: 'Mr. K Vigneshwar', role: 'Faculty Coordinator 2 · CSE', email: 'kvigneshwar.gnit@gniindia.org' },
]
const studentContacts = [
  { name: 'Newton Adhikari', role: 'President · CSE', email: '23831a05e5@gniindia.org', phone: '+91 9398 350151' },
  { name: 'Kishore Voodi', role: 'Vice President · CSE', email: '23831a05k0@gniindia.org', phone: '+91 82470 51922' },
]

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setStatus(null)
    try {
      const result = await api.contact(data)
      const message = result.message || 'Message sent! We will get back to you soon.'
      setStatus({ type: 'success', message })
      toast.success(message)
      reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      setStatus({ type: 'error', message })
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary/30 text-primary bg-primary/5">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Contact</span> Us
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Have questions, ideas, or want to collaborate? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - contact info */}
            <div className="space-y-6">
              <div>
                <SectionHeader eyebrow="Coordinators" title="Coordinators" center={false} />
                <div className="grid sm:grid-cols-2 gap-4">
                  {Coordinators.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="glass-card h-full">
                        <CardContent className="p-5">
                          <h3 className="font-semibold">{c.name}</h3>
                          <p className="text-xs text-primary uppercase tracking-wider mt-0.5">{c.role}</p>
                          <div className="mt-3 space-y-1.5 text-sm">
                            <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                              <Mail className="w-3.5 h-3.5" /> {c.email}
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader eyebrow="Faculty" title="Faculty Coordinators" center={false} />
                <div className="grid sm:grid-cols-2 gap-4">
                  {facultyContacts.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="glass-card h-full">
                        <CardContent className="p-5">
                          <h3 className="font-semibold">{c.name}</h3>
                          <p className="text-xs text-primary uppercase tracking-wider mt-0.5">{c.role}</p>
                          <div className="mt-3 space-y-1.5 text-sm">
                            <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                              <Mail className="w-3.5 h-3.5" /> {c.email}
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader eyebrow="Students" title="Student Coordinators" center={false} />
                <div className="grid sm:grid-cols-2 gap-4">
                  {studentContacts.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="glass-card h-full">
                        <CardContent className="p-5">
                          <h3 className="font-semibold">{c.name}</h3>
                          <p className="text-xs text-primary uppercase tracking-wider mt-0.5">{c.role}</p>
                          <div className="mt-3 space-y-1.5 text-sm">
                            <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                              <Mail className="w-3.5 h-3.5" /> {c.email}
                            </a>
                            <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                              <Phone className="w-3.5 h-3.5" /> {c.phone}
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Card className="glass-card">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-3">Address</h3>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    HackerRank Club CSE, Department of Computer Science & Engineering, GNIT Campus, Ibrahimpatnam, Hyderabad, Telangana 501506, India
                  </p>
                  <div className="flex gap-2 mt-4">
                    {[
                      { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/hackerrank.cse' },
                      { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/hackerrank-club-cse-gnit' },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:gradient-bg-green-red hover:border-transparent transition-all">
                        <s.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="glass-card">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-1">Send a Message</h2>
                  <p className="text-sm text-muted-foreground mb-6">We typically respond within 24 hours.</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <Label className="mb-1.5 block">Name</Label>
                      <Input {...register('name')} placeholder="Your name" className="bg-background" />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Email</Label>
                      <Input type="email" {...register('email')} placeholder="your.email@example.com" className="bg-background" />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Message</Label>
                      <Textarea rows={5} {...register('message')} placeholder="Your message..." className="bg-background resize-none" />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                    </div>
                    {status && (
                      <p
                        role={status.type === 'error' ? 'alert' : 'status'}
                        className={status.type === 'error' ? 'text-sm text-red-500' : 'text-sm text-primary'}
                      >
                        {status.message}
                      </p>
                    )}
                    <Button type="submit" disabled={submitting} className="w-full gradient-bg-green-red border-0 text-white">
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                      ) : (
                        <>Send Message <Send className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl overflow-hidden border border-border min-h-[400px]"
          >
            <iframe
              title="GNIT Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.2550552278194!2d78.65646537788858!3d17.161531645534843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb09dabc04d5b9%3A0x333765a35bb449cd!2sGurunanak%20Institute%20of%20Technology%20-%20Ibrahimpatnam!5e1!3m2!1sen!2sin!4v1781993976048!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
