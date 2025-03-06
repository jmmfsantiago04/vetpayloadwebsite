'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity?: number;
  offset?: number;
}

export const ParallaxLayer: React.FC<ParallaxProps> = ({
  children,
  baseVelocity = 0.5,
  offset = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${offset * 100}%`]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        y,
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {children}
    </div>
  );
}; 