import "./arena.css";

export default function Arena() {
  return (
    <section className="arena-section" id="arena">

      <div className="arena-glass">

        <h2 className="section-heading">
          EVENT ARENA
        </h2>

        <div className="arena-content">

          <div className="arena-card">
            <div className="arena-icon">📍</div>
            <h3>LOCATION</h3>
            <p>
              Prathyusha Engineering College<br />
              Thiruvallur, Tamil Nadu
            </p>
          </div>

          <div className="arena-card">
            <div className="arena-icon">🏛️</div>
            <h3>VENUE</h3>
            <p>
              Main Auditorium<br />
              Central Library
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
