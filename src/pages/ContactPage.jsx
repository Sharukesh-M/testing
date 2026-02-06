import React from 'react';
import VideoBackground from '../components/VideoBackground';
import { useMagicSound } from '../hooks/useMagicSound';
import '../components/contact-premium.css';
import SectionReveal from '../components/SectionReveal';

// Import House Logos
import slytherinLogo from '../assets/images/houses/slytherin.png';
import gryffindorLogo from '../assets/images/houses/gryffindor.png';
import ravenclawLogo from '../assets/images/houses/ravenclaw.png';
import hufflepuffLogo from '../assets/images/houses/hufflepuff.png';

const ContactPage = () => {
    const playSound = useMagicSound();

    const staffCouncil = [
        { name: "Ms. R. Kannamma", role: "HOD, AI & DS", phone: "+91 9444806676", theme: "staff-silver" },
        { name: "Ms. R. Anitha", role: "Faculty Coordinator", phone: "+91 9486016019", theme: "staff-silver" }
    ];

    const studentCouncil = [
        { name: "Harish", role: "Student Executive", phone: "+91 9003009572", theme: "house-slytherin", logo: slytherinLogo },
        { name: "Nirmal", role: "Student Executive", phone: "+91 9344398801", theme: "house-gryffindor", logo: gryffindorLogo },
        { name: "Nithyasri S G", role: "Student Executive", phone: "+91 8610132228", theme: "house-ravenclaw", logo: ravenclawLogo },
        { name: "Chandru B", role: "Student Executive", phone: "+91 6369959510", theme: "house-hufflepuff", logo: hufflepuffLogo }
    ];

    return (
        <div className="contact-page-luxury relative min-h-screen">
            <VideoBackground videoSrc="/videos/vid2.mp4" />

            {/* SNOWFALL EFFECT */}
            <div className="snowfall-layer">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="snowflake"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            fontSize: `${0.5 + Math.random()}rem`,
                            opacity: Math.random()
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            {/* Visual Effects */}
            <div className="aurora-glow-effect"></div>
            <div className="magic-particle-bg">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="contact-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="contact-premium-wrapper">

                {/* MAJESTIC HEADER */}
                <SectionReveal>
                    <div className="majestic-contact-header">
                        <h1>REACH THE CHAMBER</h1>
                        <p>OFFICIAL COMMUNICATION CHANNEL · TECHATHONX 2K26</p>
                    </div>
                </SectionReveal>

                {/* MAIN GRID */}
                <SectionReveal delay={0.2}>
                    <div className="contact-grid-main">

                        {/* LEFT: INFO CARDS */}
                        <div className="contact-info-panel">
                            <div className="info-card-glass" onMouseEnter={() => playSound('hover')}>
                                <span className="info-icon-glow">📍</span>
                                <div className="info-text">
                                    <h3>LOCATION</h3>
                                    <p>Prathyusha Engineering College<br />Poonamallee-Thiruvallur Road<br />Tamil Nadu 602025</p>
                                </div>
                            </div>

                            <div className="info-card-glass" onMouseEnter={() => playSound('hover')}>
                                <span className="info-icon-glow">✉️</span>
                                <div className="info-text">
                                    <h3>ENQUIRIES</h3>
                                    <p>techathonx2k26.pec@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: FORM */}
                        <div className="contact-form-panel">
                            <h2 className="form-title-majestic">DIRECT COMMUNICATION</h2>
                            <form
                                className="majestic-form"
                                action="https://formsubmit.co/techathonx2k26.pec@gmail.com"
                                method="POST"
                            >
                                {/* Configuration for FormSubmit */}
                                <input type="hidden" name="_subject" value="New TechathonX Enquiry!" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                <div className="form-group-majestic">
                                    <label>FULL NAME</label>
                                    <input name="name" type="text" placeholder="Enter your name" required />
                                </div>
                                <div className="form-group-majestic">
                                    <label>EMAIL ADDRESS</label>
                                    <input name="email" type="email" placeholder="email@example.com" required />
                                </div>
                                <div className="form-group-majestic">
                                    <label>MESSAGE</label>
                                    <textarea name="message" rows="4" placeholder="How can we assist you today?" required></textarea>
                                </div>
                                <button type="submit" className="btn-send-majestic" onMouseEnter={() => playSound('hover')}>
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>

                    </div>
                </SectionReveal>

                {/* THE COORDINATION COUNCIL */}
                <SectionReveal delay={0.4}>
                    <div className="majestic-coordinators">

                        {/* STAFF COUNCIL */}
                        <div className="section-label-contact">
                            <span className="label-text-gold">THE STAFF COUNCIL</span>
                        </div>
                        <div className="coordinators-grid mb-20">
                            {staffCouncil.map((person, i) => (
                                <div key={i} className={`coordinator-card-luxury ${person.theme}`} onMouseEnter={() => playSound('hover')}>
                                    <div className="house-logo-placeholder" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎓</div>
                                    <h4>{person.name}</h4>
                                    <p className="role-text">{person.role}</p>
                                    <p className="phone-text">{person.phone}</p>
                                </div>
                            ))}
                        </div>

                        {/* STUDENT COUNCIL */}
                        <div className="section-label-contact mt-20">
                            <span className="label-text-gold">THE STUDENT COUNCIL</span>
                        </div>
                        <div className="coordinators-grid">
                            {studentCouncil.map((person, i) => (
                                <div key={i} className={`coordinator-card-luxury ${person.theme}`} onMouseEnter={() => playSound('hover')}>
                                    <div className="house-logo-placeholder">
                                        <img src={person.logo} alt="House Logo" className="house-logo-img" />
                                    </div>
                                    <h4>{person.name}</h4>
                                    <p className="role-text">{person.role}</p>
                                    <p className="phone-text">{person.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

            </div>
        </div>
    );
};

export default ContactPage;
