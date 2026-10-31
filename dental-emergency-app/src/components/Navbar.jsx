import { BookOpen, Download, GraduationCap, House, Menu, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "../styles/editorial-pages.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = (
    <>
      <NavLink to="/" end className="editorial-home-link editorial-nav-link" onClick={() => setIsMenuOpen(false)}>
        <House size={16} aria-hidden="true" /> Home
      </NavLink>
      <NavLink to="/emergencies" className="editorial-home-link editorial-nav-link" onClick={() => setIsMenuOpen(false)}>
        <BookOpen size={16} aria-hidden="true" /> Emergencies
      </NavLink>
      <NavLink to="/learn" className="editorial-home-link editorial-nav-link" onClick={() => setIsMenuOpen(false)}>
        <GraduationCap size={16} aria-hidden="true" /> Learn
      </NavLink>
      <a className="editorial-home-link editorial-app-link" href="/#android-app" onClick={() => setIsMenuOpen(false)}>
        <Download size={16} aria-hidden="true" /> Get the App
      </a>
      <a className="home-emergency-call" href="tel:999" aria-label="Call emergency services at 999">
        <PhoneCall size={16} aria-hidden="true" />
        <span>Call 999</span>
      </a>
    </>
  );

  return (
    <>
      {isMenuOpen && (
        <button
          className="editorial-nav-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <header className="editorial-topbar">
        <Link to="/" className="editorial-brand" aria-label="MAHSA International College home" onClick={() => setIsMenuOpen(false)}>
          <img
            className="editorial-brand__logo"
            src="/images/mahsa-international-college.png"
            alt="MAHSA International College"
          />
        </Link>
        <nav id="main-navigation" className={`home-topbar__actions editorial-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navigation}
        </nav>
        <button
          className="editorial-nav-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </header>
    </>
  );
}

export default Navbar;