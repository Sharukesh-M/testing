import SectionReveal from './SectionReveal';
import './home-majestic.css';

const About = () => {
  return (
    <section className="home-section-container" id="about">
      <SectionReveal>
        <div className="majestic-card-glass">

          <div className="majestic-heading-group">
            <h2 className="majestic-section-title">THE GRAND VISION</h2>
            <p className="majestic-section-subtitle">INNOVATING THE FUTURE OF AI&DS</p>
          </div>

          <div className="about-text-majestic">
            <p>
              TECHATHONX 2K26 is a premier National Level Hackathon organized by the
              Department of Artificial Intelligence and Data Science at Prathyusha Engineering College.
              This event serves as a high-stakes arena for the most innovative minds in the country
              to converge and tackle complex real-world challenges.
            </p>
            <p>
              Our mission is to foster a professional environment where technical excellence meets
              creative problem-solving. Participants are challenged to architect, develop, and
              demonstrate working prototypes that leverage cutting-edge advancements in
              Artificial Intelligence, Machine Learning, and Big Data.
            </p>
            <p>
              With problem statements revealed at the commencement of the duel, teams are tested
              on their agility, collaborative strength, and implementation precision.
              It is more than a competition; it is a celebration of technical prowess and
              experimental innovation.
            </p>
            <p>
              Prathyusha Engineering College invites all aspiring engineers and developers
              to join us in this 32-hour journey. Secure your place in the chronicles
              of TechathonX and demonstrate your potential to lead the next revolution in technology.
            </p>
          </div>

        </div>
      </SectionReveal>
    </section>
  );
};

export default About;
