import "./resources.css";

export default function Resources() {
  return (
    <section className="resources-section">
      <div className="resources-glass glass">
        <h2 className="section-title">EVENT RESOURCES</h2>

        <p className="resources-sub">
          Download official documents related to TECHATHON 2K26
        </p>

        <div className="resources-row">
          <a
            href="/src/assets/docs/poster.png"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <span className="icon">🖼️</span>
            <span className="label">EVENT POSTER</span>
          </a>

          <a
            href="/src/assets/docs/brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <span className="icon">📘</span>
            <span className="label">BROCHURE</span>
          </a>

          <a
            href="/src/assets/docs/bus.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <span className="icon">🚌</span>
            <span className="label">BUS INFO</span>
          </a>

          <a
            href="/src/assets/docs/rule.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <span className="icon">📄</span>
            <span className="label">RULEBOOK</span>
          </a>
        </div>
      </div>
    </section>
  );
}
