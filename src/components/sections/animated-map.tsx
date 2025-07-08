`use client`
import { motion } from "framer-motion"

export function AnimatedMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative aspect-[4/3] w-full max-w-lg"
    >
      <svg
        viewBox="0 0 500 375"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <path
          d="M0.5 374.5V0.5H499.5V374.5H0.5Z"
          className="fill-muted/50 stroke-border"
        />
        <path
          d="M100 100L400 275"
          className="stroke-muted-foreground/30"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <motion.path
          d="M100 100C150 50, 350 150, 400 100"
          stroke="url(#grad1)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M100 275C200 325, 300 225, 400 275"
          stroke="url(#grad2)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-primary" />
            <stop offset="100%" className="stop-accent" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-secondary" />
            <stop offset="100%" className="stop-primary" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="100" cy="100" r="8"
          className="fill-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <animateMotion dur="10s" repeatCount="indefinite" path="M0,0 C50,-50 250,50 300,0" />
        </motion.circle>
        <motion.circle
          cx="400" cy="100" r="8"
          className="fill-card stroke-primary stroke-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
        <motion.circle
          cx="100" cy="275" r="8"
          className="fill-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />
        <motion.circle
          cx="400" cy="275" r="8"
          className="fill-card stroke-primary stroke-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
      </svg>
      <style jsx>{`
        .stop-primary { stop-color: hsl(var(--primary)); }
        .stop-accent { stop-color: hsl(var(--accent)); }
        .stop-secondary { stop-color: hsl(var(--secondary)); }
      `}</style>
    </motion.div>
  )
}
