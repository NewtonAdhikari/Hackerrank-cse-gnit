'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { leaders } from '@/lib/mock-data'
import { useRouter } from '@/lib/router'

const previewPositions = ['President', 'Vice President', 'Secretary (Boys)', 'Secretary (Girls)', 'Technical Head', 'Faculty Coordinator 1', 'Faculty Coordinator 2', 'Event Head', 'Media Head', 'Design Head', 'Documentation Head', 'Student Coordinator']

export function HomeLeadership() {
  const { navigate } = useRouter()
  const preview = previewPositions
    .map((pos) => leaders.find((l) => l.position === pos))
    .filter(Boolean)

  return (
    <section className="py-20 lg:py-24 border-t border-border bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary tabular-nums">03</span>
              <span className="eyebrow">Meet the Team</span>
            </div>
            <h2 className="heading-2">
              Our <span className="gradient-text">leadership</span>
            </h2>
          </div>
          <Button
            onClick={() => navigate('leadership')}
            variant="outline"
            className="group"
          >
            View Full Team
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((leader, i) => (
            <motion.div
              key={leader!.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="pro-card overflow-hidden hover-lift group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                { }
                <img
                  src={leader!.photo}
                  alt={leader!.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="pill bg-primary text-white border-0">
                    {leader!.position}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-lg">{leader!.name}</h3>
                  <p className="text-xs text-white/80 mt-0.5">{leader!.department}</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span className="pill">{leader!.branch}</span>
                  <span className="pill">{leader!.year}</span>
                </div>
                <div className="flex gap-1.5">
                  <a href={leader!.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href={leader!.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a href={`mailto:${leader!.email}`} aria-label="Email" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
