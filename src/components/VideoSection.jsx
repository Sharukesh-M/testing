import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import collegeVideo from "../assets/videos/collegevideo.mp4";

export default function VideoSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Tighter scale/radius transformation for less vertical "air"
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["40px", "0px", "40px"]);
    const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className="relative w-full py-4 overflow-hidden flex items-center justify-center">
            <motion.div
                className="relative w-[90%] max-w-[1200px] aspect-video overflow-hidden"
                style={{
                    scale,
                    borderRadius,
                    border: `1px solid rgba(168, 85, 247, 0.3)`,
                    boxShadow: `0 0 40px rgba(168, 85, 247, 0.2)`
                }}
            >
                <motion.video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-[130%] object-cover"
                    style={{ y: videoY }}
                >
                    <source src={collegeVideo} type="video/mp4" />
                </motion.video>

                {/* Overlay for text readability or style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </motion.div>
        </section>
    );
}
