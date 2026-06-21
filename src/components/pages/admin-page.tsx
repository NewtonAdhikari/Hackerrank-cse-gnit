'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Users, UserCog, Calendar, Image as ImageIcon, Trophy, ClipboardList, Mail, Settings, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from '@/lib/router'
import { leaders, members, events, galleryItems } from '@/lib/mock-data'
import { achievements } from '@/lib/types'
import { cn } from '@/lib/utils'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

type Section = 'dashboard' | 'members' | 'leadership' | 'events' | 'gallery' | 'achievements' | 'registrations' | 'messages' | 'settings'

const sections: { key: Section; label: string; icon: typeof Users }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'members', label: 'Members', icon: Users },
  { key: 'leadership', label: 'Leadership', icon: UserCog },
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'gallery', label: 'Gallery', icon: ImageIcon },
  { key: 'achievements', label: 'Achievements', icon: Trophy },
  { key: 'registrations', label: 'Registrations', icon: ClipboardList },
  { key: 'messages', label: 'Messages', icon: Mail },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export function AdminPage() {
  const { isAdminAuthed, setAdminAuthed } = useRouter()
  const [section, setSection] = useState<Section>('dashboard')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAdminAuthed(true)
      setError('')
    } else {
      setError('Invalid password. Hint: admin123 for demo')
    }
  }

  if (!isAdminAuthed) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg-green-red flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold">Admin Login</h1>
                  <p className="text-sm text-muted-foreground mt-1">Enter password to access the admin panel.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label className="mb-1.5 block">Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-background"
                    />
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full gradient-bg-green-red border-0 text-white">
                    Login
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Demo password: <code className="px-1.5 py-0.5 rounded bg-muted font-mono">admin123</code>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={cn(
            'fixed lg:sticky top-20 left-0 z-40 w-64 h-[calc(100vh-5rem)] glass-card rounded-2xl p-3 transition-transform lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}>
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-sm font-bold">Admin Panel</span>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.key}
                  onClick={() => { setSection(s.key); setSidebarOpen(false) }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    section === s.key ? 'gradient-bg-green-red text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </button>
              ))}
            </nav>
            <Button
              variant="ghost"
              onClick={() => setAdminAuthed(false)}
              className="w-full mt-3 text-muted-foreground hover:text-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </aside>

          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          {/* Main */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold capitalize">{sections.find((s) => s.key === section)?.label}</h1>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {section === 'dashboard' && <DashboardSection />}
                {section === 'members' && <MembersSection />}
                {section === 'leadership' && <LeadershipSection />}
                {section === 'events' && <EventsSection />}
                {section === 'gallery' && <GallerySection />}
                {section === 'achievements' && <AchievementsSection />}
                {section === 'registrations' && <RegistrationsSection />}
                {section === 'messages' && <MessagesSection />}
                {section === 'settings' && <SettingsSection />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Users }) {
  return (
    <Card className="glass-card">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl gradient-bg-green-red flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Members" value={members.length} icon={Users} />
        <StatCard label="Leaders" value={leaders.length} icon={UserCog} />
        <StatCard label="Events" value={events.length} icon={Calendar} />
        <StatCard label="Gallery" value={galleryItems.length} icon={ImageIcon} />
      </div>
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="font-bold mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: 'New member registration: Aarav Sharma', time: '2 hours ago' },
              { text: 'Event registration: Hackathon GNIT 2026', time: '5 hours ago' },
              { text: 'New contact message from visitor', time: '1 day ago' },
              { text: 'Gallery updated with 5 new photos', time: '2 days ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                <span>{a.text}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MembersSection() {
  return (
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="p-5 flex justify-between items-center">
          <h3 className="font-bold">Members Directory ({members.length})</h3>
          <Button size="sm" className="gradient-bg-green-red border-0 text-white">+ Add Member</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-3 font-semibold">Photo</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Roll</th>
                <th className="p-3 font-semibold">Branch</th>
                <th className="p-3 font-semibold">Year</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 10).map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-3">{ }<img src={m.photo} alt={m.name} className="w-8 h-8 rounded-full object-cover" /></td>
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 font-mono text-xs">{m.roll}</td>
                  <td className="p-3">{m.branch}</td>
                  <td className="p-3">{m.year}</td>
                  <td className="p-3">{m.role}</td>
                  <td className="p-3"><Button size="sm" variant="ghost">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function LeadershipSection() {
  return (
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="p-5 flex justify-between items-center">
          <h3 className="font-bold">Leadership Team ({leaders.length})</h3>
          <Button size="sm" className="gradient-bg-green-red border-0 text-white">+ Add Leader</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 pt-0">
          {leaders.map((l) => (
            <div key={l.id} className="glass-card rounded-xl p-3 flex items-center gap-3">
              <img src={l.photo} alt={l.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{l.name}</div>
                <div className="text-xs text-muted-foreground truncate">{l.position}</div>
              </div>
              <Button size="sm" variant="ghost">Edit</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function EventsSection() {
  return (
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="p-5 flex justify-between items-center">
          <h3 className="font-bold">Events ({events.length})</h3>
          <Button size="sm" className="gradient-bg-green-red border-0 text-white">+ Add Event</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4 p-5 pt-0">
          {events.map((e) => (
            <div key={e.id} className="glass-card rounded-xl overflow-hidden flex">
              <img src={e.banner} alt={e.title} className="w-24 h-24 object-cover" />
              <div className="flex-1 p-3">
                <div className="font-medium text-sm line-clamp-1">{e.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{new Date(e.date).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full', e.status === 'upcoming' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500')}>
                    {e.status}
                  </span>
                  <Button size="sm" variant="ghost">Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function GallerySection() {
  return (
    <Card className="glass-card">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Gallery ({galleryItems.length})</h3>
          <Button size="sm" className="gradient-bg-green-red border-0 text-white">+ Add Media</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {galleryItems.map((g) => (
            <div key={g.id} className="relative aspect-square rounded-lg overflow-hidden group">
              {g.type === 'photo' ? (
                <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" variant="ghost" className="text-white">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AchievementsSection() {
  return (
    <Card className="glass-card">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Achievements ({achievements.length})</h3>
          <Button size="sm" className="gradient-bg-green-red border-0 text-white">+ Add Achievement</Button>
        </div>
        <div className="space-y-3">
          {achievements.map((a) => (
            <div key={a.id} className="glass-card rounded-xl p-3 flex gap-3">
              <img src={a.image} alt={a.title} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="font-medium text-sm">{a.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{a.description}</div>
                <div className="text-xs text-primary mt-1">{a.year} · {a.category}</div>
              </div>
              <Button size="sm" variant="ghost">Edit</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RegistrationsSection() {
  const sample = [
    { id: 'REG-001', event: 'Hackathon GNIT 2026', name: 'Aarav Sharma', email: 'aarav@gnit.ac.in', date: '2026-06-15' },
    { id: 'REG-002', event: 'AI & ML Bootcamp', name: 'Diya Patel', email: 'diya@gnit.ac.in', date: '2026-06-14' },
    { id: 'REG-003', event: 'CodeFest 2026', name: 'Vivaan Reddy', email: 'vivaan@gnit.ac.in', date: '2026-06-13' },
  ]
  return (
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="p-5 flex justify-between items-center">
          <h3 className="font-bold">Event Registrations</h3>
          <Button size="sm" variant="outline">Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-3 font-semibold">Reg. ID</th>
                <th className="p-3 font-semibold">Event</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {sample.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-3 font-mono text-xs">{r.id}</td>
                  <td className="p-3">{r.event}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3 text-muted-foreground">{r.email}</td>
                  <td className="p-3 text-muted-foreground">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function MessagesSection() {
  const sample = [
    { name: 'Riya Kumar', email: 'riya@gmail.com', message: 'Hi, I want to know about the upcoming hackathon registration process.', time: '2 hours ago' },
    { name: 'Arjun Nair', email: 'arjun@gmail.com', message: 'Interested in joining the AI/ML workshop. What are the prerequisites?', time: '1 day ago' },
  ]
  return (
    <div className="space-y-3">
      {sample.map((m, i) => (
        <Card key={i} className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.email}</div>
              </div>
              <span className="text-xs text-muted-foreground">{m.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{m.message}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="gradient-bg-green-red border-0 text-white">Reply</Button>
              <Button size="sm" variant="ghost">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SettingsSection() {
  return (
    <Card className="glass-card">
      <CardContent className="p-6 space-y-5">
        <h3 className="font-bold">Site Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5 block">Club Name</Label>
            <Input defaultValue="HackerRank Club" className="bg-background" />
          </div>
          <div>
            <Label className="mb-1.5 block">Institution</Label>
            <Input defaultValue="Guru Nanak Institute of Technology" className="bg-background" />
          </div>
          <div>
            <Label className="mb-1.5 block">Contact Email</Label>
            <Input defaultValue="hackerrank@gnit.ac.in" className="bg-background" />
          </div>
          <div>
            <Label className="mb-1.5 block">Contact Phone</Label>
            <Input defaultValue="+91 98765 43210" className="bg-background" />
          </div>
        </div>
        <Button className="gradient-bg-green-red border-0 text-white">Save Changes</Button>
      </CardContent>
    </Card>
  )
}
