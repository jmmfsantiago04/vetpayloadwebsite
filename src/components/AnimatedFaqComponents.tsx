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
      staggerChildren: 0.1
    }
  }
}

interface AnimatedFaqProps {
  children: ReactNode
}

export function AnimatedFaqContainer({ children }: AnimatedFaqProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedFaqCard({ children }: AnimatedFaqProps) {
  return (
    <motion.div
      variants={fadeInUp}
      viewport={{ once: true }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedAccordionItem({ children }: AnimatedFaqProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedTitle({ children }: AnimatedFaqProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-12"
    >
      {children}
    </motion.h1>
  )
} 