'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, Share2, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CountdownTimer } from '@/components/event-card'
import { events } from '@/lib/mock-data'
import { useRouter } from '@/lib/router'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

export function EventDetailsPage({ slug }: { slug: string }) {
  const { navigate } = useRouter()
  const event = events.find((e) => e.slug === slug)

  if (!event) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-3">Event Not Found</h1>
        <p className="text-muted-foreground mb-6">The event you are looking for does not exist.</p>
        <Button onClick={() => navigate('events')} className="gradient-bg-green-red border-0 text-white">
          Back to Events
        </Button>
      </div>
    )
  }

  const isUpcoming = event.status === 'upcoming'

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text: event.description, url: window.location.href })
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="pt-20">
      {/* Hero with banner */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          { }
          <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-10">
              <Button
                variant="ghost"
                onClick={() => navigate('events')}
                className="mb-4 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Badge className={`mb-3 ${isUpcoming ? 'bg-emerald-500' : 'bg-red-500'} text-white border-0`}>
                  {isUpcoming ? 'Upcoming' : 'Completed'}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 max-w-3xl">{event.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{event.venue}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold mb-3">About this Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              <Separator />

              {/* Schedule */}
              {event.schedule && event.schedule.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" /> Schedule
                  </h2>
                  <div className="space-y-3">
                    {event.schedule.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-4 glass-card rounded-xl p-3"
                      >
                        <div className="w-28 shrink-0 text-sm font-medium text-primary">{s.time}</div>
                        <div className="text-sm text-muted-foreground">{s.activity}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" /> Speakers
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {event.speakers.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-xl p-4"
                      >
                        <h3 className="font-semibold">{s.name}</h3>
                        <p className="text-xs text-primary uppercase tracking-wider mt-1">{s.role}</p>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.bio}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Coordinators */}
              {event.coordinators && event.coordinators.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Event Coordinators</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {event.coordinators.map((c, i) => (
                      <div key={i} className="glass-card rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.contact}</div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors */}
              {event.sponsors && event.sponsors.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" /> Sponsors
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {event.sponsors.map((s, i) => (
                        <div key={i} className="glass-card rounded-xl px-4 py-3 text-sm font-semibold">{s}</div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {isUpcoming && (
                <div className="glass-card rounded-2xl p-5 sticky top-24">
                  <h3 className="font-bold mb-3">Countdown</h3>
                  <CountdownTimer targetDate={event.date} />
                  <Separator className="my-4" />
                  <Button
                    onClick={() => navigate('event-register', event.slug)}
                    className="w-full gradient-bg-green-red border-0 text-white mb-2"
                  >
                    Register Now
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" /> Share Event
                  </Button>
                </div>
              )}

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold mb-3">Event Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Venue</span>
                    <span className="font-medium text-right">{event.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className={`font-medium ${isUpcoming ? 'text-emerald-500' : 'text-red-500'}`}>
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
