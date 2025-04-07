import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Logo from '@/public/logos/Logo_Match.png'

const InfiniteLoaderScroll = () => {
  return (
    <>
    <AnimatePresence>
      {true && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className="animate-pulse"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

export default InfiniteLoaderScroll