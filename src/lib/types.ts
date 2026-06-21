import type { Achievement as AchievementType } from "./types";

export type PageKey =
  | 'home'
  | 'about-gnit'
  | 'about-club'
  | 'leadership'
  | 'members'
  | 'events'
  | 'gallery'
  | 'achievements'
  | 'contact'
  | 'admin'
  | 'event-details'
  | 'event-register'

export interface Leader {
  id: string
  name: string
  position: string
  photo: string
  department: string
  branch: string
  year: string
  linkedin: string
  github: string
  email: string
}

export interface Member {
  id: string
  name: string
  roll: string
  branch: string
  year: string
  role: string
  photo: string
}

export interface ClubEvent {
  id: string
  title: string
  slug: string
  banner: string
  description: string
  date: string
  venue: string
  status: 'upcoming' | 'completed'
  registrationLink: string
  schedule?: { time: string; activity: string }[]
  speakers?: { name: string; role: string; bio: string }[]
  coordinators?: { name: string; contact: string }[]
  gallery?: string[]
  sponsors?: string[]
}

export interface GalleryItem {
  id: string
  title: string
  type: 'photo' | 'video'
  url: string
  event: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  year: string
  image: string
  category: 'competition' | 'hackathon' | 'research' | 'award' | 'certificate' | 'Event' | 'national'
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

export interface Registration {
  id: string
  event: string
  name: string
  roll: string
  branch: string
  year: string
  email: string
  phone: string
  timestamp: string
}

export interface ContactFormPayload {
  name: string
  email: string
  message: string
}

export interface NewsletterFormPayload {
  email: string
}

export interface EventRegistrationPayload {
  fullName: string
  roll: string
  department: string
  year: string
  email: string
  phone: string
  gender: 'male' | 'female' | 'other'
  event: string
}

export type ApiSuccessResponse<T extends object = Record<string, never>> = {
  success: true
  message: string
} & T

export interface ApiErrorResponse {
  success: false
  error: string
  details?: Record<string, string[]>
}

export type ApiResponse<T extends object = Record<string, never>> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse

export type FormStatus = {
  type: 'success' | 'error'
  message: string
} | null
export const achievements: Achievement[] = [
  {
    id: 'A1',
    title: 'Successful Organization of Meta Storm 2026',
    description: 'HackerRank Club CSE GNIT successfully organized Meta Storm 2026, a two-day technical fest featuring Coding Challenges, Technical Quiz, AI & ML Competition, Tech Treasure Hunt, Poster Presentation, and E-Sports. The event attracted students from multiple departments and showcased innovation, teamwork, and technical excellence.',
    year: '2026',
    image: '/Metastrom/Poster.jpeg',
    category: 'Event',
  },

  {
    id: 'A2',
    title: 'Launch of HackerRank Club CSE GNIT',
    description: 'The HackerRank Club was officially established under the Department of Computer Science & Engineering, GNIT, with the vision of promoting coding culture, innovation, technical leadership, and industry-oriented learning among students.',
    year: '2026',
    image: '/achievements/club-launch.jpg',
    category: 'award',
  },

  {
    id: 'A3',
    title: 'CreateX 2026 Innovation Challenge',
    description: 'The club successfully conducted CreateX 2026, encouraging students to showcase innovative ideas, creative designs, entrepreneurship concepts, technical solutions, and real-world problem-solving skills.',
    year: '2026',
    image: '/Metastrom/CreateX Poster.jpeg',
    category: 'competition',
  },

  {
    id: 'A4',
    title: '100+ Active Student Members',
    description: 'Within its first year, HackerRank Club expanded rapidly and built a strong community of over 100 active student members from various domains including programming, design, content creation, media, and event management.',
    year: '2026',
    image: '/achievements/members-community.jpg',
    category: 'national',
  },

  {
    id: 'A5',
    title: 'Technical Workshops & Coding Sessions',
    description: 'The club organized multiple coding sessions, technical workshops, and peer-learning programs covering Competitive Programming, Web Development, AI/ML, Git & GitHub, and Career Development.',
    year: '2026',
    image: '/achievements/workshop.jpg',
    category: 'certificate',
  },

  {
    id: 'A6',
    title: 'Student Leadership Development',
    description: 'The club successfully developed a structured leadership hierarchy consisting of Coordinators, Faculty Coordinators, Technical Heads, Student Representatives, Promotion Heads, Content Heads, and Media Teams, enabling effective student leadership and management.',
    year: '2026',
    image: '/achievements/leadership.jpg',
    category: 'award',
  },

  {
    id: 'A7',
    title: 'Interdisciplinary Technical Participation',
    description: 'Students from different academic backgrounds actively participated in HackerRank Club activities, promoting collaboration, innovation, and cross-domain learning throughout the academic year.',
    year: '2026',
    image: '/achievements/participation.jpg',
    category: 'competition',
  },

  {
    id: 'A8',
    title: 'Building a Strong Coding Culture at GNIT',
    description: 'The club played a significant role in strengthening the coding and innovation culture at GNIT by encouraging students to participate in hackathons, coding contests, project showcases, and technology-driven events.',
    year: '2026',
    image: '/achievements/coding-culture.jpg',
    category: 'national',
  },
]
