import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics for the trailing effect ("Antigravity")
  const springConfig = { damping: 20, stiffness: 250, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkHover = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Target Cursor Main */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Crosshair SVG */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" stroke="#f1c40f" strokeWidth="1.5" strokeOpacity="0.8" />
          <line x1="20" y1="5" x2="20" y2="12" stroke="#f1c40f" strokeWidth="1.5" />
          <line x1="20" y1="28" x2="20" y2="35" stroke="#f1c40f" strokeWidth="1.5" />
          <line x1="5" y1="20" x2="12" y2="20" stroke="#f1c40f" strokeWidth="1.5" />
          <line x1="28" y1="20" x2="35" y2="20" stroke="#f1c40f" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2" fill="#f1c40f" />
        </svg>
      </motion.div>

      {/* Trailing Stabilization Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-[#f1c40f] rounded-full pointer-events-none z-[9998] opacity-30"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 60 : 45,
          height: hovered ? 60 : 45,
          scale: hovered ? 1.2 : 1,
          borderColor: hovered ? "#f1c40f" : "rgba(241, 196, 15, 0.3)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />
    </>
  );
}
