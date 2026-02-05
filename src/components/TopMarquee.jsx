import { motion } from "framer-motion";
import "../styles/global.css"; // Ensure global styles (if needed) or inline

export default function TopMarquee() {
  return (
    <div className="sticky top-[72px] left-0 w-full bg-purple-900/40 backdrop-blur-md border-y border-purple-500/30 overflow-hidden z-40 h-10 flex items-center">
      <div className="flex gap-8 whitespace-nowrap overflow-hidden min-w-full">
        <motion.div
          className="flex gap-8 min-w-full"
          animate={{ x: "-100%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {Array(20).fill("🚀 REGISTRATION OPEN NOW — JOIN THE REVOLUTION").map((text, i) => (
            <span key={i} className="text-sm font-bold tracking-widest text-purple-100 uppercase">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
