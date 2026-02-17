import React from "react";
import "./top-marquee.css";

const devfolioLogo = "/sponsors/Devfolio_Logo-Colored.png";

const TopMarquee = () => {
  const announcements = [
    "SPELLS AND CODE: TECHATHONX 2K26 REGISTRATION IS NOW LIVE!",
    "SECURE YOUR SPOT IN THE GREAT HALL — REGISTRATION CLOSES SOON",
    "THE TRIWIZARD TOURNAMENT OF TECH BEGINS ON MARCH 4TH, 2026",
    "CHOOSE YOUR HOUSE AND START BUILDING YOUR MAGICAL INNOVATION",
    "DEPARTMENT OF AI & DS PRESENTS: A JOURNEY INTO THE WIZARDING WORLD OF TECH"
  ];

  // We duplicate the content for seamless infinite scrolling
  const fullContent = [...announcements, ...announcements];

  return (
    <div className="top-marquee-container">
      <div className="marquee-scroll">
        {fullContent.map((text, index) => (
          <div key={index} className="marquee-content">
            <span className="magic-bullet">⚡</span>
            {text}
            <span className="magic-bullet">⚡</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMarquee;
