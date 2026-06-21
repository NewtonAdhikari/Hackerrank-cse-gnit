'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { EventCard, CountdownTimer } from '@/components/event-card'
import { events } from '@/lib/mock-data'
import { SectionHeader } from '@/components/section-header'
import { cn } from '@/lib/utils'

export function EventsPage() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const upcoming = events.filter((e) => e.status === 'upcoming')
  const completed = events.filter((e) => e.status === 'completed')
  const list = tab === 'upcoming' ? upcoming : completed
  console.log(events)
  console.log(upcoming)
  console.log(completed)

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
              What's Happening
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Club <span className="gradient-text">Events</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              From hackathons to workshops, coding competitions to industry talks — there's always something exciting happening at HackerRank Club GNIT.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next-up countdown for the soonest upcoming event */}
      {upcoming.length > 0 && (
        <section className="py-10 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Next Event Countdown</span>
              <h3 className="text-xl md:text-2xl font-bold mt-1 mb-4">{upcoming[0].title}</h3>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(upcoming[0].date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{upcoming[0].venue}</span>
              </div>
              <div className="flex justify-center">
                <CountdownTimer targetDate={upcoming[0].date} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-xl glass-card">
              {(['upcoming', 'completed'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all relative',
                    tab === t ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="events-tab"
                      className="absolute inset-0 rounded-lg gradient-bg-green-red -z-10"
                    />
                  )}
                  {t} Events ({t === 'upcoming' ? upcoming.length : completed.length})
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {list.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-2xl">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No {tab} events at the moment. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((e, i) => (
                    <EventCard key={e.id} event={e} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
