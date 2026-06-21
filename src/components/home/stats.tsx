'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Code2, Trophy, Award } from 'lucide-react'
import { CountUp } from '@/components/count-up'
import { clubStats } from '@/lib/mock-data'

const icons = [Users, Calendar, Code2, Trophy, Award]

export function HomeStats() {
  return (
    <section className="py-20 lg:py-24 border-t border-border bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary tabular-nums">01</span>
              <span className="eyebrow">By the Numbers</span>
            </div>
            <h2 className="heading-2">
              Our <span className="gradient-text">impact</span> in numbers
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Over six months, the HackerRank Club CSE has grown from a small group of passionate students into one of the most respected technical communities at GNIT. The numbers tell the story of our growth, our impact, and our commitment to excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clubStats.map((stat, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="pro-card p-5 lg:p-6 text-center hover-lift"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1.5">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
