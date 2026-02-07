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
import ashenLogo from '../assets/images/houses/ashen.png';
import violetLogo from '../assets/images/houses/violet.png';

const ContactPage = () => {
    const playSound = useMagicSound();

    const staffCouncil = [
        {
            name: "Ms. R. Kannamma",
            role: "HOD, AI & DS",
            phone: "+91 9444806676",
            theme: "house-ravenclaw",
            logo: violetLogo,
            linkedin: "https://www.linkedin.com/in/kannamma-sridharan-999161130?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        },
        {
            name: "Ms. R. Anitha",
            role: "Faculty Coordinator",
            phone: "+91 9486016019",
            theme: "house-slytherin",
            logo: ashenLogo,
            linkedin: "https://www.linkedin.com/in/anitha-senthilkumar-3b03a7259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        }
    ];

    const studentCouncil = [
        {
            name: "Harish",
            role: "Student Executive",
            phone: "+91 9003009572",
            theme: "house-slytherin",
            logo: slytherinLogo,
            linkedin: "https://www.linkedin.com/in/harish-m-4b2870302?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            name: "Nirmal",
            role: "Student Executive",
            phone: "+91 9344398801",
            theme: "house-gryffindor",
            logo: gryffindorLogo,
            linkedin: "https://www.linkedin.com/in/nirmal-thulasingam?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        },
        {
            name: "Nithyasri S G",
            role: "Student Executive",
            phone: "+91 8610132228",
            theme: "house-ravenclaw",
            logo: ravenclawLogo,
            linkedin: "https://www.linkedin.com/in/nithyasri-govindaraj-b85024388?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            name: "Chandru B",
            role: "Student Executive",
            phone: "+91 6369959510",
            theme: "house-hufflepuff",
            logo: hufflepuffLogo,
            linkedin: "https://www.linkedin.com/in/chandru-carrierno1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        }
    ];

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        playSound('click');

        const form = e.target;
        const formData = new FormData(form);

        // Add FormSubmit configuration
        formData.append("_subject", "New TechathonX Enquiry!");
        formData.append("_captcha", "false");
        formData.append("_template", "table");

        try {
            const response = await fetch("https://formsubmit.co/ajax/techathonx2k26.pec@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Message sent successfully! The council will summon you shortly.");
                form.reset();
            } else {
                alert("The raven lost its way. Please try again.");
            }
        } catch (error) {
            alert("Connection spell failed.");
        }
    };

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
                                onSubmit={handleContactSubmit}
                            >
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
                                <a
                                    key={i}
                                    href={person.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`coordinator-card-luxury ${person.theme}`}
                                    onMouseEnter={() => playSound('hover')}
                                    onClick={() => playSound('click')}
                                    style={{ textDecoration: 'none', cursor: 'pointer', display: 'block' }}
                                >
                                    <div className="house-logo-placeholder">
                                        <img src={person.logo} alt="House Logo" className="house-logo-img" />
                                    </div>
                                    <h4>{person.name}</h4>
                                    <p className="role-text">{person.role}</p>
                                    <p className="phone-text">{person.phone}</p>
                                </a>
                            ))}
                        </div>

                        {/* STUDENT COUNCIL */}
                        <div className="section-label-contact mt-20">
                            <span className="label-text-gold">THE STUDENT COUNCIL</span>
                        </div>
                        <div className="coordinators-grid">
                            {studentCouncil.map((person, i) => (
                                <a
                                    key={i}
                                    href={person.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`coordinator-card-luxury ${person.theme}`}
                                    onMouseEnter={() => playSound('hover')}
                                    onClick={() => playSound('click')}
                                    style={{ textDecoration: 'none', cursor: 'pointer', display: 'block' }}
                                >
                                    <div className="house-logo-placeholder">
                                        <img src={person.logo} alt="House Logo" className="house-logo-img" />
                                    </div>
                                    <h4>{person.name}</h4>
                                    <p className="role-text">{person.role}</p>
                                    <p className="phone-text">{person.phone}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

            </div>
        </div>
    );
};

export default ContactPage;
