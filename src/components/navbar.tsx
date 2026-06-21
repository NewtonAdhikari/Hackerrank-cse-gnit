'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowRight, Mail, Phone, ShieldCheck, Instagram, Linkedin } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { PageKey } from '@/lib/types'

const navItems: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about-gnit', label: 'About GNIT' },
  { key: 'about-club', label: 'About Club' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'members', label: 'Members' },
  { key: 'events', label: 'Events' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'contact', label: 'Contact' },
]

export function Navbar() {
  const { page, navigate } = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
   setMounted(true)
  }, [])

  const handleNav = (key: PageKey) => {
    navigate(key)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top utility bar */}
      <div className="utility-bar text-white/80 text-xs hidden md:block">
        <div className="container mx-auto px-4 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-green-400" />
              hackerrank.csegnit@gniindia.org
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Instagram className="w-3 h-3 text-pink-400" />
                @hackerrank.cse
            </span>
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3 h-3 text-blue-400" />
                HackerRank Club_CSE GNIT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-green-400" />
              Official Club · Dept. of CSE, GNIT
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>Established 2026</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
            aria-label="HackerRank Club CSE GNIT Home"
          >
            <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-xl overflow-hidden border border-border shadow-sm group-hover:shadow-md transition-shadow">
              <img src="/logo.png" alt="HackerRank Club Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="text-sm lg:text-base font-bold tracking-tight text-foreground">
                HackerRank Club
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                CSE · Guru Nanak Institute of Technology
              </span>
            </div>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={cn(
                  'relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg',
                  page === item.key
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {item.label}
                {page === item.key && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-px left-3 right-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg hover:bg-muted"
            >
             {mounted &&
                (theme === 'dark'
                   ? <Sun className="w-4 h-4" />
                    : <Moon className="w-4 h-4" />
                    )}
            </Button>
            <Button
              onClick={() => handleNav('events')}
              className="hidden md:inline-flex bg-primary text-white hover:bg-primary/90 group"
            >
              Join Club
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className={cn(
                    'px-4 py-2.5 text-left text-sm font-medium rounded-lg transition-colors',
                    page === item.key
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleNav('events')}
                className="mt-2 bg-primary text-white hover:bg-primary/90"
              >
                Join Club
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
