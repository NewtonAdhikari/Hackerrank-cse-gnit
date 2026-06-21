'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, BookOpen, Rocket, ScrollText, Globe } from 'lucide-react'
import { achievements } from '@/lib/types'
import { cn } from '@/lib/utils'

const categories = [
  { key: 'all', label: 'All', icon: Award },
  { key: 'competition', label: 'Competitions', icon: Trophy },
  { key: 'hackathon', label: 'Hackathons', icon: Rocket },
  { key: 'research', label: 'Research', icon: BookOpen },
  { key: 'award', label: 'Awards', icon: Award },
  { key: 'certificate', label: 'Certificates', icon: ScrollText },
  { key: 'national', label: 'National', icon: Globe },
]

export function AchievementsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? achievements : achievements.filter((a) => a.category === filter)

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
              Our Wins
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Club <span className="gradient-text">Achievements</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              A timeline of victories, recognitions, and milestones that define our journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2',
                  filter === c.key
                    ? 'gradient-bg-green-red text-white'
                    : 'glass-card text-muted-foreground hover:text-foreground'
                )}
              >
                <c.icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 gradient-bg-green-red md:-translate-x-1/2" />

            {filtered.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'relative flex gap-6 md:gap-0 mb-10',
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Marker */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full gradient-bg-green-red ring-4 ring-background md:-translate-x-1/2 mt-6 z-10" />

                {/* Card */}
                <div className={cn('ml-12 md:ml-0 md:w-1/2', i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12')}>
                  <div className="glass-card rounded-2xl overflow-hidden group">
                    { }
                    <img src={a.image} alt={a.title} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-5">
                      <div className={cn('flex items-center gap-2 mb-2', i % 2 === 0 && 'md:justify-end')}>
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full gradient-bg-green-red text-white">
                          {a.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{a.year}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 leading-tight">{a.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
