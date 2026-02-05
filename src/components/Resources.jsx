import React from 'react';
import { FileText, Map, Image as ImageIcon, Gavel, Download } from 'lucide-react';
import './home-majestic.css';

// Import Assets with ?url to ensure we get a clean string URL
import brochurePdf from '../assets/docs/brochure.pdf?url';
import busPdf from '../assets/docs/bus.pdf?url';
import rulesPdf from '../assets/docs/rules.pdf?url';
import posterImg from '../assets/docs/POSTER.png?url';

const Resources = () => {
  const documents = [
    {
      name: "Official Brochure",
      icon: <FileText size={40} />,
      link: brochurePdf,
      desc: "Event full details & overview",
      fileName: "TechathonX_Brochure.pdf"
    },
    {
      name: "Bus Routes",
      icon: <Map size={40} />,
      link: busPdf,
      desc: "Transport service locations",
      fileName: "TechathonX_Bus_Routes.pdf"
    },
    {
      name: "Event Poster",
      icon: <ImageIcon size={40} />,
      link: posterImg,
      desc: "Majestic visual summary",
      target: "_blank"
    },
    {
      name: "Rules & Regulations",
      icon: <Gavel size={40} />,
      link: rulesPdf,
      desc: "Guidelines for participation",
      fileName: "TechathonX_Rules.pdf"
    }
  ];

  const handleDownload = (doc) => {
    if (doc.target === "_blank") {
      window.open(doc.link, '_blank');
    } else {
      // Programmatic download fallback if simple anchor fails
      const link = document.createElement('a');
      link.href = doc.link;
      link.download = doc.fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="home-section-container" id="artifacts">
      <div className="majestic-card-glass" style={{ zIndex: 100 }}>
        <div className="majestic-heading-group">
          <h2 className="majestic-section-title">EVENT ARTIFACTS</h2>
          <p className="majestic-section-subtitle">ESSENTIAL DOCUMENTS & GUIDELINES</p>
        </div>

        <div className="resources-grid">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="resource-item-glass cursor-pointer"
              onClick={() => handleDownload(doc)}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
