import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './scroll-video.css';

const ScrollVideo = () => {
    const containerRef = useRef(null);

    // Track scroll progress of the container relative to the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"] // Animation happens as it enters until it centers
    });

    // Transform values based on scroll
    // Shrink effect: Starts at full scale (1) and shrinks to 85%
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const radius = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);

    return (
        <section ref={containerRef} className="scroll-video-container">
            <motion.div
                className="scroll-video-wrapper"
                initial={{ opacity: 0, y: 100 }} // More dramatic entry
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} // Trigger early enough to see it rise
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    scale: scale,
                    borderRadius: radius,
                    // width: width // Optional, scale handles size mostly.
                }}
            >
                <video
                    src="/videos/collegevideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="scroll-video-element"
                    disablePictureInPicture
                />

                {/* Optional Overlay for "Majestic" feel */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 30%)',
                    pointerEvents: 'none'
                }}></div>
            </motion.div>
        </section>
    );
};

export default ScrollVideo;
