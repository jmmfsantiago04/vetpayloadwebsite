'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

interface AnimatedProps {
  children: ReactNode
}

export function AnimatedHero({ children }: AnimatedProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20"
    >
      {children}
    </motion.section>
  )
}

export function AnimatedServiceContainer({ children }: AnimatedProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedServiceCard({ children }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedConditionsContainer({ children }: AnimatedProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedConditionCard({ children }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCTA({ children }: AnimatedProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] text-white"
    >
      {children}
    </motion.section>
  )
} 