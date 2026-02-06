import React from "react";
import { useMagicSound } from "../hooks/useMagicSound";
import "./contact.css";

const staff = [
  { name: "Ms. R. Kannamma", role: "HOD, AI & DS", phone: "XXX-XXX-XXXX", house: "ravenclaw" },
  { name: "Mrs. R. Anitha", role: "Faculty Coordinator", phone: "XXX-XXX-XXXX", house: "gryffindor" }
];

const students = [
  { name: "Harish", role: "Student Coordinator", phone: "9360432312", house: "slytherin" },
  { name: "Nithyasri S G", role: "Student Coordinator", phone: "XXX-XXX-XXXX", house: "gryffindor" },
  { name: "Chandru B", role: "Student Coordinator", phone: "XXX-XXX-XXXX", house: "ravenclaw" },
  { name: "Nirmal", role: "Student Coordinator", phone: "XXX-XXX-XXXX", house: "hufflepuff" }
];

const Contact = () => {
  const playSound = useMagicSound();

  return (
    <section className="contact-section" id="contact">
      <div className="contact-glass">
        <div className="contact-groups">
          {/* STAFF */}
          <div className="group-container">
            <h3 className="group-title text-gold">Staff Coordinators</h3>
            <div className="cards-row">
              {staff.map((person, index) => (
                <div
                  key={index}
                  className={`magic-card house-${person.house}`}
                  onMouseEnter={() => playSound('hover')}
                >
                  <div className="card-border"></div>
                  <h4 className="person-name">{person.name}</h4>
                  <p className="person-role">{person.role}</p>
                  <p className="person-phone">{person.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STUDENTS */}
          <div className="group-container">
            <h3 className="group-title text-silver">Student Coordinators</h3>
            <div className="cards-row">
              {students.map((person, index) => (
                <div
                  key={index}
                  className={`magic-card house-${person.house}`}
                  onMouseEnter={() => playSound('hover')}
                >
                  <div className="card-border"></div>
                  <h4 className="person-name">{person.name}</h4>
                  <p className="person-role">{person.role}</p>
                  <p className="person-phone">{person.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
