"use client";

import { motion } from 'framer-motion'

const InfiniteLoaderScroll = () => {
  return (
    <motion.div
    className="flex flex-col items-center justify-center gap-2 mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
      aria-label="Loading spinner"
    />
    <span className="text-sm text-gray-500">Loading more schools...</span>
  </motion.div>
      );
}

export default InfiniteLoaderScroll