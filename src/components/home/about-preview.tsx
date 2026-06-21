'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2, Trophy, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/lib/router'

const features = [
  { icon: Code2, title: 'Coding Culture', desc: 'Daily practice, weekly contests, and peer-driven mentorship across all four CSE years.' },
  { icon: Trophy, title: 'Winning Legacy', desc: '2+ successful event victories and 5+ competition wins in 6 months of active competition.' },
  { icon: Zap, title: 'Innovation First', desc: 'From AI to Web3, we explore the bleeding edge of technology with hands-on projects.' },
  { icon: Users, title: 'Strong Community', desc: 'A 30+ member network of passionate CSE students, alumni, and industry mentors.' },
]

export function HomeAbout() {
  const { navigate } = useRouter()

  return (
    <section className="py-20 lg:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — sticky text */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary tabular-nums">02</span>
              <span className="eyebrow">About the Club</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 mb-6"
            >
              Where code meets <span className="gradient-text">community</span>
            </motion.h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The HackerRank Club at the Department of Computer Science & Engineering, Guru Nanak Institute of Technology, is the official student-driven technical community of CSE. We bridge the gap between academic curriculum and industry expectations through hands-on projects, competitions, and mentorship.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              From competitive programming and hackathons to AI workshops and industry talks, our club provides CSE students with platforms to learn, build, and showcase their skills at the highest level.
            </p>
            <Button
              onClick={() => navigate('about-club')}
              className="bg-foreground text-background hover:bg-primary hover:text-white group"
            >
              Read More About Us
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Right — features */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="pro-card p-6 hover-lift"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
