import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05000c] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {/* Portal Container - Scales up to "teleport" user */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          scale: 30,
          opacity: 0,
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* Ring 1 - Outer Sparks */}
        <motion.div
          className="absolute w-64 h-64 border-[3px] border-dashed border-purple-500/60 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)" }}
        />

        {/* Ring 2 - Middle Energy */}
        <motion.div
          className="absolute w-56 h-56 border-[2px] border-purple-400/80 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.2)"
          }}
        />

        {/* Ring 3 - Inner Core */}
        <motion.div
          className="absolute w-40 h-40 border-[4px] border-double border-purple-300 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ boxShadow: "0 0 60px rgba(168, 85, 247, 0.6)" }}
        />

        {/* Particles Effect (Simple Dots) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-200 rounded-full"
            style={{ top: "50%", left: "50%" }}
            animate={{
              x: Math.cos(i * 45 * (Math.PI / 180)) * 140,
              y: Math.sin(i * 45 * (Math.PI / 180)) * 140,
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Loading Text */}
        <motion.div
          className="z-10 text-sm font-bold tracking-[0.4em] text-purple-100 font-orbitron"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          LOADING
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
