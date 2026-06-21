'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Users, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { members } from '@/lib/mock-data'
import { SectionHeader } from '@/components/section-header'
import { cn } from '@/lib/utils'

const branches = ['All', 'CSE']
const years = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year']
const roles = ['All', 'Member', 'Senior Member', 'Technical Lead', 'Event Coordinator', 'Content Writer', 'Designer']
const PER_PAGE = 12

export function MembersPage() {
  const [query, setQuery] = useState('')
  const [branch, setBranch] = useState('All')
  const [year, setYear] = useState('All')
  const [role, setRole] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (query && !m.name.toLowerCase().includes(query.toLowerCase()) && !m.roll.toLowerCase().includes(query.toLowerCase())) return false
      if (branch !== 'All' && m.branch !== branch) return false
      if (year !== 'All' && m.year !== year) return false
      if (role !== 'All' && m.role !== role) return false
      return true
    })
  }, [query, branch, year, role])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const resetPage = () => setPage(1)

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
              Our Community
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Members</span> Directory
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Meet the 250+ talented CSE students who make HackerRank Club GNIT a powerhouse of innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          {/* Search & Filters */}
          <div className="glass-card rounded-2xl p-5 md:p-6 mb-8 sticky top-20 z-30">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); resetPage() }}
                className="pl-10 bg-background"
              />
              {query && (
                <button onClick={() => { setQuery(''); resetPage() }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FilterDropdown label="Branch" value={branch} options={branches} onChange={(v) => { setBranch(v); resetPage() }} />
              <FilterDropdown label="Year" value={year} options={years} onChange={(v) => { setYear(v); resetPage() }} />
              <FilterDropdown label="Role" value={role} options={roles} onChange={(v) => { setRole(v); resetPage() }} />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> members
            </div>
          </div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-2xl">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No members found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {paginated.map((m, i) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -6 }}
                    className="glass-card rounded-2xl overflow-hidden group"
                  >
                    <div className="aspect-square overflow-hidden relative">
                      { }
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-700 via-green-500 to-red-600 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>

  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <span className="text-[90px] font-black text-white">{'</>'}</span>
  </div>

  <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
    <span className="text-white text-3xl md:text-4xl font-black tracking-wider">
      {(m?.name || 'NA')
        .trim()
        .split(' ')
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()}
    </span>
  </div>
</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono">
                        {m.roll}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-1">{m.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{m.branch}</span>
                        <span className="text-muted-foreground">{m.year}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-wider">{m.role}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    'w-9 h-9 rounded-lg text-sm font-medium transition-all',
                    page === i + 1 ? 'gradient-bg-green-red text-white' : 'glass-card hover:bg-muted'
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function FilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-md transition-all',
              value === o ? 'gradient-bg-green-red text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
