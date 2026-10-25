import { Activity, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="home-topbar">
      <Link to="/" className="editorial-brand">
        <span className="editorial-brand__mark"><Activity size={19} /></span>
        <span>MAHSA INTERNATIONAL COLLEGE<small>DENTAL EMERGENCY QUICK REFERENCE</small></span>
      </Link>
      <nav className="home-topbar__actions" aria-label="Quick actions">
        <a className="home-emergency-call" href="tel:999" aria-label="Call emergency services at 999">
          <PhoneCall size={16} aria-hidden="true" />
          <span><span className="home-emergency-call__prefix">Call </span>999</span>
        </a>
        <Link to="/emergencies" className="editorial-home-link">Browse guides</Link>
      </nav>
    </header>
  );
}

export default Navbar;