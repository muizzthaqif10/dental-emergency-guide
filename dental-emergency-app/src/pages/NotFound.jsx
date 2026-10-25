import { ArrowLeft, BookOpen, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

import FooterCredit from "../components/FooterCredit";
import Navbar from "../components/Navbar";
import "../styles/editorial-pages.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <Navbar />
      <main>
        <span className="not-found-page__mark"><ShieldAlert size={25} aria-hidden="true" /></span>
        <p className="editorial-kicker">PAGE NOT FOUND</p>
        <h1>This emergency guide is unavailable</h1>
        <p>
          The page you requested does not exist. Please return to the emergency list and choose a relevant case.
        </p>
        <div className="not-found-page__actions">
          <Link to="/"><ArrowLeft size={16} aria-hidden="true" /> Back home</Link>
          <Link to="/emergencies"><BookOpen size={16} aria-hidden="true" /> View emergency guides</Link>
        </div>
      </main>
      <FooterCredit />
    </div>
  );
}

export default NotFound;
