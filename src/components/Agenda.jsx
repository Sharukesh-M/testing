import "./agenda.css";

export default function Agenda() {
  return (
    <section className="agenda-section" id="agenda">
      <div className="glass agenda-glass">

        <h2 className="section-heading">EVENT AGENDA</h2>
        <p className="agenda-sub">
          Two days of innovation, collaboration & execution
        </p>

        <div className="agenda-days">

          {/* DAY 1 */}
          <div className="agenda-day">
            <h3 className="day-title">DAY 1 · MARCH 4, 2026</h3>

            <ul className="agenda-timeline">
              <li>
                <span className="time">09:30 AM</span>
                <span className="dot"></span>
                <span className="event">Inauguration Ceremony</span>
              </li>

              <li>
                <span className="time">11:30 AM</span>
                <span className="dot"></span>
                <span className="event">Hackthon starts</span>
              </li>

              <li>
                <span className="time">01:30 PM</span>
                <span className="dot"></span>
                <span className="event">Lunch Break</span>
              </li>

              <li>
                <span className="time">12:30 PM</span>
                <span className="dot"></span>
                <span className="event">Lunch Break</span>
              </li>

              <li>
                <span className="time">01:30 PM</span>
                <span className="dot"></span>
                <span className="event">Development Phase Begins</span>
              </li>

              <li>
                <span className="time">06:00 PM</span>
                <span className="dot"></span>
                <span className="event">Mentor Review & Checkpoint</span>
              </li>
            </ul>
          </div>

          {/* DAY 2 */}
          <div className="agenda-day">
            <h3 className="day-title">DAY 2 · MARCH 5, 2026</h3>

            <ul className="agenda-timeline">
              <li>
                <span className="time">09:00 AM</span>
                <span className="dot"></span>
                <span className="event">Final Development & Testing</span>
              </li>

              <li>
                <span className="time">11:30 AM</span>
                <span className="dot"></span>
                <span className="event">Project Submission</span>
              </li>

              <li>
                <span className="time">12:30 PM</span>
                <span className="dot"></span>
                <span className="event">Lunch Break</span>
              </li>

              <li>
                <span className="time">01:30 PM</span>
                <span className="dot"></span>
                <span className="event">Final Presentations</span>
              </li>

              <li>
                <span className="time">04:30 PM</span>
                <span className="dot"></span>
                <span className="event">Judging & Evaluation</span>
              </li>

              <li>
                <span className="time">05:30 PM</span>
                <span className="dot"></span>
                <span className="event">Valedictory & Prize Distribution</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
