import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function SectionReveal({ children, delay = 0.2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 100, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1.0, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }} // easeOutQuad-ish
    >
      {children}
    </motion.div>
  );
}
