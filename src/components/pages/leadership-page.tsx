'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/tilt-card'
import { leaders } from '@/lib/mock-data'
import type { Leader } from '@/lib/types'

const hierarchy: { tier: string; positions: string[] }[] = [
  { tier: 'Coordinators', positions: ['Coordinator'] },
  { tier: 'Faculty Coordinators', positions: ['Faculty Coordinator 1', 'Faculty Coordinator 2'] },
  { tier: 'Executive Committee', positions: ['President', 'Treasurer'] },
  { tier: 'Secretaries', positions: ['Secretary (Boys)', 'Secretary (Girls)'] },
  { tier: 'Technical & Event Heads', positions: ['Technical Head', 'Event Head'] },
  { tier: 'Media & Design', positions: ['Media Head', 'Design Head'] },
  { tier: 'Documentation', positions: ['Documentation Head'] },
]

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  return (
    <TiltCard intensity={10} className="glass-card rounded-2xl overflow-hidden h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 }}
        className="relative group h-full"
      >
        <div className="aspect-square overflow-hidden relative">
          { }
          <img
            src={leader.photo}
            alt={leader.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute top-3 left-3" style={{ transform: 'translateZ(40px)' }}>
            <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full gradient-bg-green-red text-white">
              {leader.position}
            </span>
          </div>
        </div>
        <div className="p-4" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="font-bold text-lg leading-tight">{leader.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{leader.department}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 rounded bg-muted">{leader.branch}</span>
            <span className="px-2 py-0.5 rounded bg-muted">{leader.year}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <a href={leader.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href={leader.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href={`mailto:${leader.email}`} aria-label="Email" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}

export function LeadershipPage() {
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
              The Team
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our <span className="gradient-text">Leadership</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Meet the dedicated CSE team that drives the HackerRank Club forward — faculty coordinators, student leaders, and domain heads working together to create impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
      <div className="container mx-auto px-4">
    <div className="flex justify-center perspective">
  <div className="w-full max-w-md">
    {leaders
      .filter(
        (leader) => leader.position.trim() === 'HOD-CSE & Coordinator'
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>

     {/* Faculty Coordinators */}
<div className="mb-20">
  <SectionHeader
    eyebrow="Tier 2"
    title="Faculty Coordinators"
    center
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto perspective">
    {leaders
      .filter((leader) =>
        [
          'Faculty Coordinator 1',
          'Faculty Coordinator 2',
        ].includes(leader.position)
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>

{/* Executive Committee */}
<div className="mb-20">
  <SectionHeader
    eyebrow="Tier 3"
    title="Executive Committee"
    center
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective">
    {leaders
      .filter((leader) =>
        [
          'President',
          'Vice President',
        ].includes(leader.position)
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>

{/* Secretaries */}
<div className="mb-20">
  <SectionHeader
    eyebrow="Tier 4"
    title="Secretaries"
    center
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective">
    {leaders
      .filter((leader) =>
        [
          'Secretary (Boys)',
          'Secretary (Girls)',
        ].includes(leader.position)
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>

{/* Technical & Event Heads */}
<div className="mb-20">
  <SectionHeader
    eyebrow="Tier 5"
    title="Technical & Event Heads"
    center
  />

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto perspective">
    {leaders
      .filter((leader) =>
        [
          'Technical Head',
          'Event Head',
        ].includes(leader.position)
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>

{/* Media & Design */}
<div className="mb-20">
  <SectionHeader
    eyebrow="Tier 6"
    title="Media & Design"
    center
  />

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-4xl mx-auto perspective">
    {leaders
      .filter((leader) =>
        [
          'Media Head',
          'Design Head',
        ].includes(leader.position)
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>

{/* Documentation */}
<div className="mb-20">
  <SectionHeader
    eyebrow="Tier 7"
    title="Documentation & Student Coordinators"
    center
  />

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-4xl mx-auto perspective">
    {leaders
      .filter((leader) =>
        [
          'Documentation Head',
          'Student Coordinator',
        ].includes(leader.position)
      )
      .map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}
  </div>
</div>


  </div>
</section>

      {/* Organizational Hierarchy */}

<section className="py-16 md:py-24 bg-card/30 relative overflow-hidden">
  <div className="container mx-auto px-4">
    <SectionHeader
      eyebrow="Structure"
      title="Organizational Hierarchy"
      center
    />

```
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="max-w-6xl mx-auto"
>
  <div className="glass-card rounded-3xl p-8 md:p-12">

    {/* Coordinator */}
    <div className="flex justify-center">
      <div className="px-6 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg">
        Coordinator
      </div>
    </div>

    {/* Line */}
    <div className="w-1 h-10 bg-primary mx-auto"></div>

    {/* Faculty Coordinators */}
    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      <div className="px-5 py-3 rounded-xl bg-card border border-primary/30 text-center font-semibold">
        Faculty Coordinator 1
      </div>

      <div className="px-5 py-3 rounded-xl bg-card border border-primary/30 text-center font-semibold">
        Faculty Coordinator 2
      </div>
    </div>

    <div className="w-1 h-10 bg-primary mx-auto"></div>

    {/* Executive Committee */}
    <div className="text-center mb-6">
      <span className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
        Executive Committee
      </span>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <div className="px-5 py-3 rounded-xl bg-card border border-border text-center">
        President
      </div>

      <div className="px-5 py-3 rounded-xl bg-card border border-border text-center">
        Treasurer
      </div>
    </div>

    <div className="w-1 h-10 bg-primary mx-auto"></div>

    {/* Secretaries */}
    <div className="text-center mb-6">
      <span className="inline-flex px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">
        Secretaries
      </span>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <div className="px-5 py-3 rounded-xl bg-card border border-border text-center">
        Secretary (Boys)
      </div>

      <div className="px-5 py-3 rounded-xl bg-card border border-border text-center">
        Secretary (Girls)
      </div>
    </div>

    <div className="w-1 h-10 bg-primary mx-auto"></div>

    {/* Domain Heads */}
    <div className="text-center mb-6">
      <span className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
        Domain Heads
      </span>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {[
        'Technical Head',
        'Event Head',
        'Media Head',
        'Design Head',
        'Documentation Head',
        'Student Coordinator',
      ].map((role) => (
        <div
          key={role}
          className="px-4 py-3 rounded-xl bg-card border border-border text-center font-medium hover:border-primary transition-colors"
        >
          {role}
        </div>
      ))}
    </div>
  </div>
</motion.div>
</div>
</section>
</div>
)}
