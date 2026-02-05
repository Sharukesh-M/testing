import "./prize.css";

export default function Prize() {
  return (
    <section className="prize-section">

      <div className="prize-glass">

        <h2 className="section-heading">
          PRIZE POOL
        </h2>

        <div className="prize-amount">
          <span className="trophy">🏆</span>
          <span className="amount">EXCITING PRIZES</span>
        </div>

        <p className="certificate-text">
          Participation Certificate for All Participants
        </p>

        {/* Documents */}
        <div className="doc-buttons">
          <a href="/src/assets/docs/poster.png" className="doc-btn">POSTER</a>
          <a href="/src/assets/docs/brochure.pdf" className="doc-btn">BROCHURE</a>
          <a href="/src/assets/docs/bus.pdf" className="doc-btn">BUS INFO</a>
          <a href="/src/assets/docs/rules.pdf" className="doc-btn">RULEBOOK</a>
        </div>

      </div>

    </section>
  );
}
