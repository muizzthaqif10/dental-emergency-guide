import { ArrowLeft, ArrowRight, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import EmergencyCard from "../components/EmergencyCard";
import { emergencies } from "../data/emergencies";
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
        <button type="button" className="editorial-home-link" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Home
        </button>
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
          {emergencies.map((emergency, index) => (
            <EmergencyCard
              key={emergency.id}
              index={index + 1}
              title={emergency.title}
              category={emergency.category}
              summary={emergency.summary}
              onClick={() => navigate(`/emergencies/${emergency.id}`)}
            />
          ))}
        </section>

        <aside className="editorial-disclaimer">
          <span>!</span>
          <p><strong>Educational quick reference only.</strong> This material does not replace professional clinical judgement or training.</p>
        </aside>
      </main>
    </div>
  );
}

export default Emergencies;
