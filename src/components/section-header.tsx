'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  number?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export function SectionHeader({ eyebrow, number, title, subtitle, center = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-10 md:mb-14', center && 'text-center', className)}>
      {(eyebrow || number) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn('flex items-center gap-3 mb-4', center && 'justify-center')}
        >
          {number && (
            <span className="text-xs font-bold text-primary tabular-nums">{number}</span>
          )}
          {eyebrow && (
            <span className="eyebrow">
              {eyebrow}
            </span>
          )}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="heading-2 text-foreground"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn('mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl', center && 'mx-auto')}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
