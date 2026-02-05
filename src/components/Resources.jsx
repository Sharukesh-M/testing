import React from 'react';
import { FileText, Map, Image as ImageIcon, Gavel, Download } from 'lucide-react';
import './home-majestic.css';

const Resources = () => {
  const documents = [
    {
      name: "Official Brochure",
      icon: <FileText size={40} />,
      link: "/brochure.pdf",
      desc: "Event full details & overview"
    },
    {
      name: "Bus Routes",
      icon: <Map size={40} />,
      link: "/bus.pdf",
      desc: "Transport service locations"
    },
    {
      name: "Event Poster",
      icon: <ImageIcon size={40} />,
      link: "/POSTER.png",
      desc: "Majestic visual summary",
      target: "_blank"
    },
    {
      name: "Rules & Regulations",
      icon: <Gavel size={40} />,
      link: "/rules.pdf",
      desc: "Guidelines for participation"
    }
  ];

  return (
    <section className="home-section-container" id="artifacts">
      <div className="majestic-card-glass" style={{ zIndex: 100 }}>
        <div className="majestic-heading-group">
          <h2 className="majestic-section-title">EVENT ARTIFACTS</h2>
          <p className="majestic-section-subtitle">ESSENTIAL DOCUMENTS & GUIDELINES</p>
        </div>

        <div className="resources-grid">
          {documents.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              className="resource-item-glass cursor-pointer"
              target={doc.target || "_self"}
              rel="noopener noreferrer"
              download={doc.target !== "_blank"}
              style={{ textDecoration: 'none' }}
            >
              <div className="resource-icon-aura">{doc.icon}</div>
              <h3>{doc.name}</h3>
              <p>{doc.desc}</p>

              <div className="download-label-ink-wrapper">
                <span className="download-label-ink">
                  <Download size={14} className="inline mr-2" />
                  {doc.target === "_blank" ? "VIEW NOW" : "DOWNLOAD"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
