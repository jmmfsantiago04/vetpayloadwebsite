'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from 'react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
}

export function AnimatedServiceCard({ children, index }: { children: ReactNode, index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedText({ children, delay }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: delay || 0 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedConditionCard({ children, index }: { children: ReactNode, index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  )
} 