'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
      staggerChildren: 0.2
    }
  }
}

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
}

const sectionVariants = {
  offscreen: {
    y: 20,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1
    }
  }
}

interface AnimatedAboutContentProps {
  children: React.ReactNode;
  type: 'hero' | 'section' | 'stagger';
}

export function AnimatedSection({ children, type }: AnimatedAboutContentProps) {
  const variants = type === 'hero' ? heroVariants : 
                  type === 'stagger' ? staggerContainer : 
                  sectionVariants;
  
  const initial = type === 'section' ? "offscreen" : "hidden";
  const animate = type === 'section' ? "onscreen" : "visible";
  
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={type === 'section' ? animate : undefined}
      viewport={type === 'section' ? { once: true, amount: 0.3 } : undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({ children, delay }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
} 