import "./contact.css";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="contact-glass">

        <h2 className="section-heading">
          CONTACT
        </h2>

        <div className="contact-groups">

          {/* Student Coordinators */}
          <div className="contact-card">
            <h3>STUDENT COORDINATORS</h3>

            <button className="contact-btn">
              Nithyasri S G<br />
              <span>XXX-XXX-XXXX</span>
            </button>

            <button className="contact-btn">
              Chandru B<br />
              <span>XXX-XXX-XXXX</span>
            </button>
          </div>

          {/* Staff Coordinators */}
          <div className="contact-card">
            <h3>STAFF COORDINATORS</h3>

            <button className="contact-btn">
              Dr. R. Kannamma – HOD, AI & DS<br />
              <span>XXX-XXX-XXXX</span>
            </button>

            <button className="contact-btn">
              Dr. R. Anitha – Faculty Coordinator<br />
              <span>XXX-XXX-XXXX</span>
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
