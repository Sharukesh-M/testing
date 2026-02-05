import './AuroraBackground.css';

export default function AuroraBackground() {
    return (
        <div className="aurora-container">
            {/* Aurora Wave Layers */}
            <div className="aurora-wave"></div>
            <div className="aurora-wave"></div>
            <div className="aurora-wave"></div>

            {/* Floating Particles */}
            <div className="aurora-particles">
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
                <div className="aurora-particle"></div>
            </div>

            {/* Shimmer Effect */}
            <div className="aurora-shimmer"></div>

            {/* Glowing Accent Lines */}
            <div className="aurora-glow-line"></div>
            <div className="aurora-glow-line"></div>
            <div className="aurora-glow-line"></div>
        </div>
    );
}
