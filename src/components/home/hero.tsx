'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, ShieldCheck, Users, Award, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/lib/router'

export function HomeHero() {
  const { navigate } = useRouter()

  return (
    <section className="relative overflow-hidden">
      {/* Background — radial gradient + subtle grid */}
      <div className="absolute inset-0 hero-radial" />
      <div className="absolute inset-0 subtle-grid" />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left — content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="official-badge">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official Club · Department of CSE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-1 mb-6"
            >
              HackerRank Club
              <br />
              <span className="gradient-text">CSE, GNIT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
            >
              The official Computer Science & Engineering technical club of Guru Nanak Institute of Technology. We empower future innovators through technology — fostering a culture of coding excellence, innovation, and collaborative learning in 2026.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button
                onClick={() => navigate('events')}
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 h-12 px-7 group"
              >
                Join the Club
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('events')}
                size="lg"
                variant="outline"
                className="h-12 px-7 group"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming Events
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 max-w-md"
            >
              {[
                { icon: Users, label: 'Active Members', value: '30+' },
                { icon: Award, label: 'Awards Won', value: '2+' },
                { icon: Sparkles, label: 'Months Active', value: '6+' },
              ].map((t, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <t.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs">{t.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{t.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative gradient orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-red-500/20 blur-3xl" />

              {/* Logo card */}
              <div className="relative pro-card p-8 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <span className="pill pill-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                    Active
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">EST. 2026</span>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 gradient-bg-green-red blur-2xl opacity-30 rounded-full" />
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                      <img src="/logo.png" alt="HackerRank Club CSE GNIT Logo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="font-bold text-lg text-foreground">HackerRank Club</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">CSE · Guru Nanak Institute of Technology</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">2+</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Successful Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red">1+</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Workshops</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 lg:-left-8 pro-card px-4 py-3 shadow-card flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold">Best Tech Club</div>
                  <div className="text-[10px] text-muted-foreground">GNIT 2025-26</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
