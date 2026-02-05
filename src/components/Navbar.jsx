import React from 'react';
import { Link } from 'react-router-dom';
import { useMagicSound } from '../hooks/useMagicSound';
import './navbar.css';

const Navbar = () => {
  const playSound = useMagicSound();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link
          to="/"
          style={{ textDecoration: 'none' }}
        >
          TECHATHON <span>X</span> 26
        </Link>
      </div>
      <div className="nav-right">
        {[
          { path: "/", label: "Home" },
          { path: "/events", label: "Events" },
          { path: "/competitions", label: "Competitions" },
          { path: "/register", label: "Register" },
          { path: "/contact", label: "Contact" }
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="nav-btn"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
