import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import stickImg from '../assets/images/stick.png';

const SPARK_LIFETIME = 800; // ms
const MAX_SPARKS = 30;

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [sparks, setSparks] = useState([]);
  const requestRef = useRef();

  // Smooth stick movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Generate sparks on move
      if (Math.random() > 0.6) {
        addSpark(e.clientX, e.clientY);
      }
    };

    const checkHover = (e) => {
      const target = e.target;
      // Enhanced hover detection for navigation and buttons
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.classList.contains("nav-link") ||
        target.classList.contains("nav-item")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const addSpark = (x, y) => {
      const id = Date.now() + Math.random();
      const newSpark = {
        id,
        x,
        y,
        size: Math.random() * 8 + 4, // Increased spark size
        angle: Math.random() * 360,
        speed: Math.random() * 2 + 1,
        life: 1
      };

      setSparks(prev => [...prev.slice(-MAX_SPARKS), newSpark]);
    };

    // Animation Loop for Sparks
    const animateSparks = () => {
      setSparks(prevSparks =>
        prevSparks
          .map(spark => ({
            ...spark,
            x: spark.x + Math.cos(spark.angle) * spark.speed,
            y: spark.y + Math.sin(spark.angle) * spark.speed,
            life: spark.life - 0.02,
            size: spark.size * 0.96
          }))
          .filter(spark => spark.life > 0)
      );
      requestRef.current = requestAnimationFrame(animateSparks);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", checkHover);
    requestRef.current = requestAnimationFrame(animateSparks);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", checkHover);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Golden Sparks Trail */}
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="fixed pointer-events-none rounded-full z-[100000]"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            background: `rgba(241, 196, 15, ${spark.life})`, // Gold color
            boxShadow: `0 0 ${spark.size * 2}px rgba(241, 196, 15, 0.8)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Magic Stick Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100001]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-10%", // Adjust tip position
          translateY: "-10%",
          rotate: hovered ? 15 : 0, // Tilt effect on hover
        }}
      >
        <img
          src={stickImg}
          alt="Magic Wand"
          style={{
            width: '60px', // Increased stick size
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(241, 196, 15, 0.6))'
          }}
        />
      </motion.div>
    </>
  );
}
