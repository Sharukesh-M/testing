import React from 'react';
import { FileText, Map, Image as ImageIcon, Gavel } from 'lucide-react';
import './home-majestic.css';

// Import Assets
import brochurePdf from '../assets/docs/brochure.pdf';
import busPdf from '../assets/docs/bus.pdf';
import rulesPdf from '../assets/docs/rules.pdf';
import posterHtml from '../assets/docs/POSTER.html?url';

const Resources = () => {
  const documents = [
    { name: "Official Brochure", icon: <FileText size={40} />, link: brochurePdf, desc: "Event full details & overview" },
    { name: "Bus Routes", icon: <Map size={40} />, link: busPdf, desc: "Transport service locations" },
    { name: "Event Poster", icon: <ImageIcon size={40} />, link: posterHtml, desc: "Majestic visual summary", target: "_blank" },
    { name: "Rules & Regulations", icon: <Gavel size={40} />, link: rulesPdf, desc: "Guidelines for participation" }
  ];

  return (
    <section className="home-section-container" id="resources">
      <div className="majestic-card-glass">
        <div className="majestic-heading-group">
          <h2 className="majestic-section-title">EVENT ARTIFACTS</h2>
          <p className="majestic-section-subtitle">ESSENTIAL DOCUMENTS & GUIDELINES</p>
        </div>

        <div className="resources-grid">
          {documents.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              className="resource-item-glass"
              download={!doc.target}
              target={doc.target || "_self"}
              rel="noopener noreferrer"
            >
              <div className="resource-icon-aura">{doc.icon}</div>
              <h3>{doc.name}</h3>
              <p>{doc.desc}</p>
              <span className="download-label-ink">DOWNLOAD NOW</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
