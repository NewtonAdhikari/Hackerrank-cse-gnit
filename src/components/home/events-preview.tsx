'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { events, sponsors } from '@/lib/mock-data'
import { useRouter } from '@/lib/router'

export function HomeEvents() {
  const { navigate } = useRouter()
  const featured = events
  .filter((event) => event.status === 'upcoming')
  .sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  )
  .slice(0, 5)

  return (
    <section className="py-20 lg:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary tabular-nums">04</span>
              <span className="eyebrow">What's Next</span>
            </div>
            <h2 className="heading-2">
              Upcoming <span className="gradient-text">events</span>
            </h2>
          </div>
          <Button
            onClick={() => navigate('events')}
            variant="outline"
            className="group"
          >
            View All Events
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((event, i) => {
            const isUpcoming = event.status === 'upcoming'
            return (
              <motion.button
                key={event.id}
                onClick={() => navigate('event-details', event.slug)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-left pro-card overflow-hidden hover-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  { }
                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className={`pill border-0 ${isUpcoming ? 'bg-primary text-white' : 'bg-red text-white'}`}>
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                    <span className="pill bg-black/60 text-white border-0 backdrop-blur">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="line-clamp-1 max-w-[150px]">{event.venue}</span>
                    </span>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function HomeFeaturedSlider() {
  const featured = events.slice(0, 5)

  return (
    <section className="py-20 lg:py-24 border-t border-border bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-primary tabular-nums">05</span>
          <span className="eyebrow">Highlights</span>
        </div>
        <h2 className="heading-2">
          Featured <span className="gradient-text">events</span>
        </h2>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-5 px-4 lg:px-8 pb-4">
          {featured.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-[300px] md:w-[450px] group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border group-hover:border-primary transition-colors">
                { }
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 pill bg-black/60 text-white border-0 backdrop-blur">
                  Event {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs mb-1 text-white/80">
                    <Calendar className="w-3 h-3" />
                    {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">{event.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeSponsors() {
  return (
    <section className="py-16 lg:py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-primary tabular-nums">06</span>
          <span className="eyebrow">Partners & Supporters</span>
        </div>
      </div>

      <div className="overflow-hidden border-y border-border py-8 bg-card/30">
        <div className="flex animate-marquee">
          {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center gap-3 px-8 py-4 border-r border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                {s.logo}
              </div>
              <span className="text-xl md:text-2xl font-semibold text-foreground/70">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
