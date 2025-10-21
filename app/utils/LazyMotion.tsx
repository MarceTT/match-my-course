"use client";

import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * LazyMotion wrapper para tree-shaking de Framer Motion
 * Reduce bundle size de ~80kB a ~40kB
 *
 * Usage:
 * 1. Import { LazyMotionWrapper } from '@/app/utils/LazyMotion'
 * 2. Import { m } instead of { motion } from 'framer-motion'
 * 3. Wrap component with <LazyMotionWrapper>
 * 4. Replace motion.div with m.div
 */
export function LazyMotionWrapper({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// Re-export domAnimation for direct use
export { domAnimation };
