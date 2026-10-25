import { ArrowLeft, BookOpen, PhoneCall } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import "../styles/editorial-pages.css";

function Navbar() {
  const isHome = useLocation().pathname === "/";

  return (
    <header className="editorial-topbar">
      <Link to="/" className="editorial-brand">
        <span className="editorial-brand__identity">
          <img
            className="editorial-brand__logo"
            src="/images/mahsa-international-college.png"
            alt="MAHSA International College"
          />
          <small>Dental Emergency Quick Reference</small>
        </span>
      </Link>
      <nav className="home-topbar__actions" aria-label="Quick actions">
        <a className="home-emergency-call" href="tel:999" aria-label="Call emergency services at 999">
          <PhoneCall size={16} aria-hidden="true" />
          <span><span className="home-emergency-call__prefix">Call </span>999</span>
        </a>
        {isHome ? (
          <Link to="/emergencies" className="editorial-home-link"><BookOpen size={16} /> Browse guides</Link>
        ) : (
          <Link to="/" className="editorial-home-link"><ArrowLeft size={16} /> Home</Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;