'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/lib/router'
import type { ClubEvent } from '@/lib/types'

interface EventCardProps {
  event: ClubEvent
  index?: number
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const { navigate } = useRouter()
  const isUpcoming = event.status === 'upcoming'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group pro-card overflow-hidden flex flex-col hover-lift"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
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
            {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{event.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 pt-3 border-t border-border">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('event-details', event.slug)}
            size="sm"
            variant="outline"
            className="flex-1 group/btn"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
          {isUpcoming && (
            <Button
              onClick={() => navigate('event-register', event.slug)}
              size="sm"
              className="flex-1 bg-primary text-white hover:bg-primary/90"
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return (
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: seconds },
      ].map((t) => (
        <div key={t.label} className="pro-card p-4 md:p-5 text-center">
          <div className="text-3xl md:text-4xl font-bold gradient-text tabular-nums">
            {String(t.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs text-muted-foreground mt-1.5 uppercase tracking-wider font-medium">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  )
}
