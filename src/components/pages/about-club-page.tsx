'use client'

import { motion } from 'framer-motion'
import { Eye, Target, Rocket, Code2, Users, BookOpen, Briefcase, Lightbulb, Trophy, GraduationCap, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/lib/router'

const objectives = [
  'Foster a strong coding culture through regular practice sessions and competitive programming contests.',
  'Bridge the gap between academic learning and industry requirements through hands-on workshops.',
  'Provide a platform for students to showcase their technical skills at national and international events.',
  'Encourage research and innovation in emerging technologies like AI, ML, Blockchain, and IoT.',
  'Develop soft skills, leadership qualities, and team collaboration through group projects.',
  'Build a strong alumni network and industry connections for placements and mentorship.',
]

const activities = [
  { icon: Trophy, title: 'Coding Competitions', desc: 'Monthly contests on HackerRank, CodeChef, and LeetCode with prizes for top performers.' },
  { icon: Rocket, title: 'Hackathons', desc: 'Organize and participate in 24-48 hour hackathons with industry-defined problem statements.' },
  { icon: BookOpen, title: 'Research Activities', desc: 'Read, discuss, and reproduce cutting-edge research papers in AI, ML, and systems.' },
  { icon: Code2, title: 'Technical Workshops', desc: 'Hands-on workshops on React, Node.js, Python, DSA, system design, and more.' },
  { icon: Lightbulb, title: 'AI & ML Sessions', desc: 'Specialized sessions covering fundamentals to advanced topics in AI, ML, and deep learning.' },
  { icon: GraduationCap, title: 'Career Guidance', desc: 'Mock interviews, resume reviews, and mentorship from alumni working at top companies.' },
  { icon: Briefcase, title: 'Industry Talks', desc: 'Guest lectures and Q&A sessions with industry leaders from FAANG, startups, and unicorns.' },
  { icon: Users, title: 'Open Source Drives', desc: 'Contribute to open source during Hacktoberfest and GSOC with experienced mentors.' },
]

export function AboutClubPage() {
  const { navigate } = useRouter()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary/30 text-primary bg-primary/5">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About the <span className="gradient-text">Club</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              The official HackerRank Club of the Computer Science & Engineering Department at GNIT — a community of passionate learners, builders, and innovators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader eyebrow="Who We Are" title="Introduction" center={false} />
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The HackerRank Club at the Department of Computer Science & Engineering, Guru Nanak Institute of Technology, is the official student-driven technical community of CSE. Born out of a shared passion for coding and technology, the club was founded in 2019 by a small group of enthusiastic CSE students who believed that the best way to learn was by building, competing, and collaborating.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Today, we are a thriving community of over 250 active CSE members spanning all four years of the undergraduate program. Our members have won prestigious hackathons, published research papers in IEEE conferences, secured internships at FAANG companies, and contributed to major open-source projects. We are proud to be the most respected technical club within the CSE department and one of the leading coding communities in the state.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What sets us apart is our commitment to peer-to-peer learning. Every senior CSE member is a mentor, every junior member is a future leader. Together, we create an environment where curiosity is celebrated, mistakes are welcomed, and growth is inevitable. From first-year students taking their first steps in Python to final-year students cracking product-based company interviews, the club is the common thread that binds the CSE community together.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Estd.', value: '2026' },
                { label: 'Active Members', value: '30+' },
                { label: 'Event Conducted', value: '2+' },
                { label: 'Events in Last Six Months', value: '2+' },
              ].map((s, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="h-full glass-card border-primary/20">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl gradient-bg-green-red flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the most impactful student technical community in India's CSE ecosystem, where every member discovers their potential, builds meaningful products, and emerges as a confident, skilled, and ethical computer scientist ready to lead the future of innovation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="h-full glass-card border-primary/20">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl gradient-bg-green-red flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower CSE students at GNIT with industry-relevant technical skills, foster a culture of innovation through hands-on projects and competitions, build strong industry connections with leading software companies, and create leaders who can solve real-world problems with technology and integrity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Our Goals" title="Objectives" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {objectives.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{String(i + 1).padStart(2, '0')}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{o}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Benefits" title="Why Join HackerRank Club?" subtitle="Five reasons why being part of our community will accelerate your growth as a developer." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: Code2, title: 'Skill Building', desc: 'Structured curriculum and practice problems to level up your coding.' },
              { icon: Users, title: 'Community', desc: 'Connect with 250+ like-minded peers and a strong alumni network.' },
              { icon: Trophy, title: 'Compete & Win', desc: 'Represent GNIT at top hackathons and competitive programming events.' },
              { icon: Briefcase, title: 'Career Boost', desc: 'Get referrals, mock interviews, and exclusive job opportunities.' },
              { icon: Rocket, title: 'Build Real Products', desc: 'Work on live projects that solve real problems and build your portfolio.' },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card rounded-2xl p-5 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-bg-green-red flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-sm">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => navigate('events')} size="lg" className="gradient-bg-green-red text-white border-0 group">
              Become a Member
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="What We Do" title="Club Activities" subtitle="A wide range of activities designed to cover every aspect of technical growth." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {activities.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-5 group"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 group-hover:gradient-bg-green-red flex items-center justify-center transition-all">
                  <a.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold mb-1.5">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
