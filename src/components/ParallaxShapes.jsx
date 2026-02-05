import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxShapes() {
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 5000], [0, 1000]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -800]);
    const rotate1 = useTransform(scrollY, [0, 5000], [0, 360]);
    const rotate2 = useTransform(scrollY, [0, 5000], [0, -180]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {/* Floating Cube (Wireframe) */}
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute top-[15%] left-[5%] w-20 h-20 md:w-32 md:h-32 border border-purple-500/20 rounded-xl"
            />

            {/* Floating Orb (Glow) */}
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[40%] right-[5%] w-40 h-40 md:w-64 md:h-64 border border-blue-500/10 rounded-full bg-blue-600/5 blur-3xl opacity-50"
            />

            {/* Floating Diamond */}
            <motion.div
                style={{ y: y1, rotate: rotate2 }}
                className="absolute top-[70%] left-[15%] w-16 h-16 md:w-24 md:h-24 border border-orange-500/20 rotate-45"
            />

            {/* Small particle cluster */}
            <motion.div
                style={{ y: y2, x: y1 }}
                className="absolute top-[25%] right-[30%] w-4 h-4 bg-white/10 rounded-full blur-sm"
            />
        </div>
    );
}
