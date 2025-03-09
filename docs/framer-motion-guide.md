# Framer Motion Guide

## Table of Contents
1. [Basic Setup](#basic-setup)
2. [Core Concepts](#core-concepts)
3. [Animation Properties](#animation-properties)
4. [Variants](#variants)
5. [Practical Examples](#practical-examples)
6. [Best Practices](#best-practices)
7. [Real Project Examples](#real-project-examples)

## Basic Setup

### Installation
```bash
npm install framer-motion
```

### Component Setup
```typescript
'use client'  // Required for Next.js 13+
import { motion } from 'framer-motion'
```

## Core Concepts

### 1. Basic Animation
```typescript
<motion.div
  initial={{ opacity: 0 }}    // Starting state
  animate={{ opacity: 1 }}    // End state
  transition={{ duration: 0.5 }}  // Animation configuration
>
  Content
</motion.div>
```

### 2. Interactive Animations
```typescript
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Click me
</motion.button>
```

### 3. Scroll-Based Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Appears on scroll
</motion.div>
```

## Animation Properties

### Common Properties
```typescript
{
  opacity: 0-1,        // Transparency
  scale: 0-1+,        // Size
  x: 0-n,            // Horizontal movement
  y: 0-n,            // Vertical movement
  rotate: 0-360,     // Rotation in degrees
  backgroundColor: "color"
}
```

### Transition Options
```typescript
transition: {
  duration: 0.5,      // Animation duration
  delay: 0.2,         // Start delay
  ease: "easeOut",    // Animation curve
  type: "spring",     // Animation type
  stiffness: 100,     // Spring configuration
  damping: 10         // Spring damping
}
```

## Variants

### Basic Variants
```typescript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
>
```

### Stagger Children
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}
```

## Practical Examples

### 1. Animated Card Component
```typescript
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.1)"
  }
}

function Card() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      Content
    </motion.div>
  )
}
```

### 2. Animated List
```typescript
function AnimatedList({ items }) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {items.map(item => (
        <motion.li
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {item.content}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

## Best Practices

1. **Component Organization**
   - Keep animations in client components
   - Use 'use client' directive in Next.js
   - Separate animation logic from business logic

2. **Performance**
   - Use `viewport={{ once: true }}` for one-time animations
   - Use `layout` prop for automatic layout animations
   - Implement `whileInView` for scroll-based animations

3. **Reusability**
   - Create reusable animation components
   - Define variants outside components
   - Use props to customize animations

## Real Project Examples

### 1. Blog Card Animation (from our project)
```typescript
export function BlogPostCard({ post }: { post: Post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Content */}
    </motion.article>
  )
}
```

### 2. Section Animation Component (from our project)
```typescript
export function AnimatedSection({ children, type }: AnimatedAboutContentProps) {
  const variants = type === 'hero' ? heroVariants : 
                  type === 'stagger' ? staggerContainer : 
                  sectionVariants;
  
  return (
    <motion.div
      initial={type === 'section' ? "offscreen" : "hidden"}
      animate={type === 'section' ? "onscreen" : "visible"}
      whileInView={type === 'section' ? "onscreen" : undefined}
      viewport={type === 'section' ? { once: true, amount: 0.3 } : undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
```

### 3. Text Animation (from our project)
```typescript
export function AnimatedText({ children, delay }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  )
}
```

## Tips and Tricks

1. **Debugging Animations**
   - Use the React Developer Tools to inspect motion components
   - Console.log transition states
   - Use the Framer Motion debug prop

2. **Common Patterns**
   - Page transitions
   - Loading states
   - Modal animations
   - List item animations
   - Hover effects

3. **Advanced Features**
   - Gestures
   - Drag and drop
   - Path animations
   - Layout animations
   - AnimatePresence for mount/unmount animations

Remember: Keep animations subtle and purposeful. They should enhance the user experience, not distract from it. 