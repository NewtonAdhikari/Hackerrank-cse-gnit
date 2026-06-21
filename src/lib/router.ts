'use client'

import { create } from 'zustand'
import type { PageKey } from './types'

interface RouterState {
  page: PageKey
  eventSlug: string | null
  navigate: (page: PageKey, eventSlug?: string) => void
  isAdminAuthed: boolean
  setAdminAuthed: (v: boolean) => void
}

export const useRouter = create<RouterState>((set) => ({
  page: 'home',
  eventSlug: null,
  isAdminAuthed: false,
  navigate: (page, eventSlug) => {
    set({ page, eventSlug: eventSlug ?? null })
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  setAdminAuthed: (v) => set({ isAdminAuthed: v }),
}))
