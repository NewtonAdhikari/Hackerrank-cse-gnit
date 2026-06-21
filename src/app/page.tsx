'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useRouter } from '@/lib/router'
import { HomePage } from '@/components/pages/home-page'
import { AboutGnitPage } from '@/components/pages/about-gnit-page'
import { AboutClubPage } from '@/components/pages/about-club-page'
import { LeadershipPage } from '@/components/pages/leadership-page'
import { MembersPage } from '@/components/pages/members-page'
import { EventsPage } from '@/components/pages/events-page'
import { EventDetailsPage } from '@/components/pages/event-details-page'
import { EventRegisterPage } from '@/components/pages/event-register-page'
import { GalleryPage } from '@/components/pages/gallery-page'
import { AchievementsPage } from '@/components/pages/achievements-page'
import { ContactPage } from '@/components/pages/contact-page'
import { AdminPage } from '@/components/pages/admin-page'

export default function Home() {
  const { page, eventSlug } = useRouter()

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />
      case 'about-gnit': return <AboutGnitPage />
      case 'about-club': return <AboutClubPage />
      case 'leadership': return <LeadershipPage />
      case 'members': return <MembersPage />
      case 'events': return <EventsPage />
      case 'event-details': return <EventDetailsPage slug={eventSlug || ''} />
      case 'event-register': return <EventRegisterPage slug={eventSlug || ''} />
      case 'gallery': return <GalleryPage />
      case 'achievements': return <AchievementsPage />
      case 'contact': return <ContactPage />
      case 'admin': return <AdminPage />
      default: return <HomePage />
    }
  }

  const isAdmin = page === 'admin'

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page + (eventSlug || '')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}
