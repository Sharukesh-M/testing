import "./arena.css";
import Prize from "./Prize";
import Rules from "./Rules";

export default function Arena() {
  return (
    <section className="arena-section" id="arena">
      <div className="arena-wrapper" style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <Prize />
        <Rules />
      </div>
    </section>
  );
}
