import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMagicSound } from '../hooks/useMagicSound';
import { Menu, X } from 'lucide-react';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const playSound = useMagicSound();

  const toggleMenu = () => {
    playSound(isOpen ? 'click' : 'hover');
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            onClick={closeMenu}
          >
            TECHATHON <span>X</span> '26
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} color="#f1c40f" /> : <Menu size={28} color="#f1c40f" />}
        </div>

        {/* Navigation Links */}
        <div className={`nav-right ${isOpen ? 'active' : ''}`}>
          {[
            { path: "/", label: "Home" },
            { path: "/events", label: "Domain" },
            { path: "/competitions", label: "ARENA" },
            { path: "/contact", label: "Contact" }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-btn"
              onMouseEnter={() => playSound('hover')}
              onClick={() => {
                playSound('click');
                closeMenu();
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
