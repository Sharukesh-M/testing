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
      {/* Main Dot - Direct Follower */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#a855f7] rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_15px_#a855f7]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing Ring - Physics Follower */}
      <motion.div
        className="fixed top-0 left-0 border border-[rgba(168,85,247,0.5)] rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 60 : 32,
          height: hovered ? 60 : 32,
          borderColor: hovered ? "rgba(168, 85, 247, 0.9)" : "rgba(168, 85, 247, 0.5)",
          backgroundColor: hovered ? "rgba(168, 85, 247, 0.15)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
    </>
  );
}
