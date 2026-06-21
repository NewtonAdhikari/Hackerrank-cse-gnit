'use client'

import { HomeHero } from '@/components/home/hero'
import { HomeStats } from '@/components/home/stats'
import { HomeAbout } from '@/components/home/about-preview'
import { HomeLeadership } from '@/components/home/leadership-preview'
import { HomeFeaturedSlider, HomeEvents, HomeSponsors } from '@/components/home/events-preview'

export function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeAbout />
      <HomeLeadership />
      <HomeFeaturedSlider />
      <HomeEvents />
      <HomeSponsors />
    </>
  )
}
