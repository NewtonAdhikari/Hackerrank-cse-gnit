'use client'

import { Code2, Mail, MapPin, Linkedin, Instagram, Send, ArrowUpRight, ShieldCheck, Loader2 } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import type { FormStatus } from '@/lib/types'

const quickLinks = [
  { key: 'about-gnit', label: 'About GNIT' },
  { key: 'about-club', label: 'About Club' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'members', label: 'Members' },
  { key: 'events', label: 'Events' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'contact', label: 'Contact' },
] as const

export function Footer() {
  const { navigate } = useRouter()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || submitting) return

    setSubmitting(true)
    setStatus(null)

    try {
      const result = await api.newsletter({ email })
      const message = result.message || 'Subscribed to newsletter successfully!'
      setStatus({ type: 'success', message })
      toast.success(message)
      setEmail('')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Newsletter subscription failed. Please try again.'
      setStatus({ type: 'error', message })
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="mt-auto border-t border-border bg-card">
      {/* Newsletter band */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-red-500/5">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-primary tabular-nums">07</span>
                <span className="eyebrow">Newsletter</span>
              </div>
              <h3 className="heading-3 mb-3">
                Stay in the <span className="gradient-text">loop</span>
              </h3>
              <p className="text-muted-foreground max-w-md">
                Subscribe for the latest events, workshops, and tech news. No spam, just curated updates from the club.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your.email@cse.gnit.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className="bg-background h-12"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-white hover:bg-primary/90 h-12 px-6 shrink-0 min-w-32"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
              {status && (
                <p
                  role={status.type === 'error' ? 'alert' : 'status'}
                  className={status.type === 'error' ? 'text-sm text-red-500' : 'text-sm text-primary'}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-border">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-base">HackerRank Club</h3>
                <p className="text-xs text-muted-foreground">CSE · Guru Nanak Institute of Technology</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-5">
              The official Computer Science & Engineering technical club of GNIT. Empowering Future Innovators Through Technology — fostering coding culture, innovation, and excellence in 2026.
            </p>
            <div className="flex items-center gap-2 mb-5">
              <span className="official-badge">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official Club
              </span>
            </div>
            <div className="flex gap-2">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/hackerrank.cse' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/hackerrank-cse-gnit' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.key}>
                  <button
                    onClick={() => navigate(l.key)}
                    className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>Department of CSE, GNIT Campus, Ibrahimpatnam, Hyderabad, Telangana 501506</span>
              </li>
              <li>
                <a href="mailto:hackerrank.csegnit@gniindia.org" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  hackerrank.csegnit@gniindia.org
                </a>
              </li>
              <li>
                <a href="https://instagram.com/hackerrank.cse" target="_blank"  rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                   <Instagram className="w-3 h-3 text-pink-400" />
                    @hackerrank.cse
                   </a>
              </li>
              <li>
                <a href="https://in.linkedin.com/company/hackerrank-club-cse-gnit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-3 h-3 text-blue-400" />
                    HackerRank Club_CSE GNIT
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HackerRank Club CSE, GNIT. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('admin')}
              className="hover:text-primary transition-colors flex items-center gap-1.5"
              aria-label="Admin Panel"
            >
              <Code2 className="w-3.5 h-3.5" />
              Admin Panel
            </button>
            <span className="flex items-center gap-1.5">
              Designed and Developed by Newton Adhikari
            </span>
          </div>
        </div>
      </div>

      {/* Bottom strip — green to red */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #16A34A 0%, #22C55E 50%, #EF4444 100%)' }} />
    </footer>
  )
}
