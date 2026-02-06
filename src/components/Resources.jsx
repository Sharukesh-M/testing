import React from 'react';
import { FileText, Map, Image as ImageIcon, Gavel, Download } from 'lucide-react';
import SectionReveal from './SectionReveal';
import './home-majestic.css';

// Import Assets directly from docs using Vite's URL resolution
import brochurePdf from '../assets/docs/brochure.pdf?url';
import busPdf from '../assets/docs/bus.pdf?url';
import rulesPdf from '../assets/docs/rules.pdf?url';
import posterImg from '../assets/docs/POSTER.png?url';

const Resources = () => {
  const documents = [
    {
      name: "Event Poster",
      icon: <ImageIcon size={40} />,
      link: posterImg,
      desc: "Majestic visual summary"
    },
    {
      name: "Rules & Regulations",
      icon: <Gavel size={40} />,
      link: rulesPdf,
      desc: "Guidelines for participation"
    },
    {
      name: "Bus Routes",
      icon: <Map size={40} />,
      link: busPdf,
      desc: "Transport service locations"
    },
    {
      name: "Sponsorship Brochure",
      icon: <FileText size={40} />,
      link: brochurePdf,
      desc: "Event full details & overview"
    }
  ];

  return (
    <section className="home-section-container" id="event-resources" style={{ position: 'relative', zIndex: 50 }}>
      <SectionReveal>
        <div className="majestic-card-glass" style={{ position: 'relative', zIndex: 60 }}>
          <div className="majestic-heading-group">
            <h2 className="majestic-section-title">EVENT ARTIFACTS</h2>
            <p className="majestic-section-subtitle">ESSENTIAL DOCUMENTS & GUIDELINES</p>
          </div>

          <div className="resources-grid">
            {documents.map((doc, idx) => (
              <a
                key={idx}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-item-glass"
                style={{
                  display: 'flex',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 70,
                  position: 'relative'
                }}
              >
                <div className="resource-icon-aura">{doc.icon}</div>
                <h3>{doc.name}</h3>
                <p>{doc.desc}</p>

                <div className="download-label-ink-wrapper">
                  <span className="download-label-ink">
                    <Download size={14} style={{ display: 'inline-block', marginRight: '8px' }} />
                    OPEN / VIEW
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default Resources;
