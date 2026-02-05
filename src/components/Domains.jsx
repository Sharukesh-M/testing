import { useState } from "react";
import "./domains.css";

const domainData = [
  {
    id: "ar",
    title: "AR / VR",
    img: "/src/assets/images/domains/ar.jpg",
    desc: "Immersive augmented and virtual reality solutions enabling interactive digital experiences."
  },
  {
    id: "coremodernai",
    title: "GEN AI",
    img: "/src/assets/images/domains/coremodernai.jpg",
    desc: "Advanced AI models, intelligent automation, and next-generation machine learning systems."
  },
  {
    id: "cs",
    title: "FINANCIAL TECH",
    img: "/src/assets/images/domains/cs.jpg",
    desc: "Secure systems, threat detection, ethical hacking, and digital protection mechanisms."
  },
  {
    id: "hc",
    title: "HEALTHCARE",
    img: "/src/assets/images/domains/hc.jpeg",
    desc: "AI-powered healthcare solutions for diagnosis, monitoring, and medical innovation."
  },
  {
    id: "oi",
    title: "OPEN INNOVATION",
    img: "/src/assets/images/domains/oi.jpg",
    desc: "Creative, real-world problem solving with innovative technical approaches."
  },
  {
    id: "sus",
    title: "SUSTAINABILITY",
    img: "/src/assets/images/domains/sus.jpg",
    desc: "Green technology, sustainable systems, and eco-friendly AI-driven solutions."
  }
];

export default function Domains() {
  const [active, setActive] = useState(null);

  return (
    <section className="domains-section" id="domains">

      <div className="domains-glass">

        <h2 className="section-heading">
          DOMAINS
        </h2>

        <div className="domains-grid">
          {domainData.map(domain => (
            <div
              key={domain.id}
              className="domain-card"
              onClick={() =>
                setActive(active === domain.id ? null : domain.id)
              }
            >
              <img src={domain.img} alt={domain.title} />

              <h3>{domain.title}</h3>

              {active === domain.id && (
                <p className="domain-desc">{domain.desc}</p>
              )}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
