import { motion, useScroll, useTransform } from "framer-motion";
import collegeVideo from "../assets/videos/collegevideo.mp4";

export default function ParallaxImageBg() {
    const { scrollY } = useScroll();

    // Using scrollY (pixels) instead of progress for much more predictable transition
    const scale = useTransform(scrollY, [0, 600], [1, 0.88]);
    const borderRadius = useTransform(scrollY, [0, 600], ["0px", "40px"]);
    const borderOpacity = useTransform(scrollY, [0, 200, 600], [0, 0.4, 1]);
    const padding = useTransform(scrollY, [0, 600], ["0px", "30px"]);

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-black overflow-hidden">
            {/* Background Layer revealed when shrinking */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f061e] to-black opacity-60" />

            <motion.div
                className="relative w-full h-full overflow-hidden flex items-center justify-center p-0"
                style={{ padding }}
            >
                <motion.div
                    className="w-full h-full relative overflow-hidden bg-black"
                    style={{
                        scale,
                        borderRadius,
                        border: `2px solid rgba(168, 85, 247, ${borderOpacity})`,
                        boxShadow: `0 0 50px rgba(168, 85, 247, ${borderOpacity})`
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={collegeVideo} type="video/mp4" />
                    </video>

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                </motion.div>
            </motion.div>
        </div>
    );
}
