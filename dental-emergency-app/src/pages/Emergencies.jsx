import { ArrowLeft, ArrowRight, Activity, PhoneCall } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import EmergencyCard from "../components/EmergencyCard";
import FooterCredit from "../components/FooterCredit";
import { emergencies } from "../data/emergencies";
import { emergencyData } from "../data/emergencyContent";
import "../styles/editorial-pages.css";

function Emergencies() {
  const navigate = useNavigate();

  return (
    <div className="editorial-page">
      <header className="editorial-topbar">
        <Link className="editorial-brand" to="/">
          <span className="editorial-brand__mark"><Activity size={19} /></span>
          <span>MAHSA INTERNATIONAL COLLEGE<small>DENTAL EMERGENCY QUICK REFERENCE</small></span>
        </Link>
        <nav className="home-topbar__actions" aria-label="Quick actions">
          <a className="home-emergency-call" href="tel:999" aria-label="Call emergency services at 999">
            <PhoneCall size={16} aria-hidden="true" />
            <span><span className="home-emergency-call__prefix">Call </span>999</span>
          </a>
          <button type="button" className="editorial-home-link" onClick={() => navigate("/")}>
            <ArrowLeft size={16} /> Home
          </button>
        </nav>
      </header>

      <main className="emergency-index">
        <div className="emergency-index__intro">
          <p className="editorial-kicker">CLINICAL REFERENCE / 01</p>
          <h1>Emergency<br /><em>management.</em></h1>
          <p className="emergency-index__dek">
            Choose the emergency most closely matching the patient presentation and follow the response pathway.
          </p>
          <div className="emergency-index__meta">
            <span><strong>{String(emergencies.length).padStart(2, "0")}</strong> quick-reference guides</span>
            <span><strong>ABC</strong> clinical focus</span>
            <span><strong>Rapid</strong> response flow</span>
          </div>
        </div>

        <section className="emergency-index__list" aria-label="Emergency guides">
          <div className="emergency-index__list-heading">
            <h2>Browse the guides</h2>
            <span>SELECT A TOPIC <ArrowRight size={14} /></span>
          </div>
          {emergencies.map((emergency, index) => {
            const guide = emergencyData.find((item) => item.id === emergency.id);
            return (
              <EmergencyCard
                key={emergency.id}
                index={index + 1}
                title={emergency.title}
                category={emergency.category}
                summary={emergency.summary}
                image={guide?.image}
                imageCredit={guide?.imageCredit}
                onClick={() => navigate(`/emergencies/${emergency.id}`)}
              />
            );
          })}
        </section>

        <aside className="editorial-disclaimer">
          <span>!</span>
          <p><strong>Educational quick reference only.</strong> This material does not replace professional clinical judgement or training.</p>
        </aside>
      </main>
      <FooterCredit />
    </div>
  );
}

export default Emergencies;
