import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="home-topbar">
      <Link to="/" className="editorial-brand">
        <span className="editorial-brand__mark"><Activity size={19} /></span>
        <span>MAHSA INTERNATIONAL COLLEGE<small>DENTAL EMERGENCY QUICK REFERENCE</small></span>
      </Link>
      <Link to="/emergencies" className="editorial-home-link">Browse guides</Link>
    </header>
  );
}

export default Navbar;