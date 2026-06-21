'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Video, X } from 'lucide-react'
import { galleryItems } from '@/lib/mock-data'
import { SectionHeader } from '@/components/section-header'
import { Lightbox } from '@/components/lightbox'
import { cn } from '@/lib/utils'

const eventFilters = ['All', ...Array.from(new Set(galleryItems.map((g) => g.event)))]

export function GalleryPage() {
  const [tab, setTab] = useState<'photo' | 'video'>('photo')
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const filtered = useMemo(() => {
    return galleryItems.filter((g) => {
      if (g.type !== tab) return false
      if (filter !== 'All' && g.event !== filter) return false
      return true
    })
  }, [tab, filter])

  const photoLightboxItems = filtered
    .filter((g) => g.type === 'photo')
    .map((g) => ({ url: g.url, title: g.title }))

  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    setLightboxOpen(true)
  }

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
              Moments
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Club <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Captured memories from our events, workshops, hackathons, and celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="inline-flex p-1 rounded-xl glass-card">
              {(['photo', 'video'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all relative flex items-center gap-2',
                    tab === t ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab === t && (
                    <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-lg gradient-bg-green-red -z-10" />
                  )}
                  {t === 'photo' ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  {t}s
                </button>
              ))}
            </div>

            {/* Event filter */}
            <div className="flex flex-wrap gap-1.5 justify-center max-w-full overflow-x-auto no-scrollbar">
              {eventFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap',
                    filter === f ? 'gradient-bg-green-red text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid - masonry style */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-2xl">
              <p className="text-muted-foreground">No items found for this filter.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.04 }}
                    className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => item.type === 'photo' && openLightbox(photoLightboxItems.findIndex((p) => p.url === item.url))}
                  >
                    {item.type === 'photo' ? (
                       
                      <img src={item.url} alt={item.title} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="relative aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.url}`}
                          title={item.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-sm font-medium">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.event}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        images={photoLightboxItems}
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  )
}
