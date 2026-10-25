import { Activity, AlertCircle, BookOpenCheck } from "lucide-react";

import Navbar from "../components/Navbar";
import EmergencyButton from "../components/EmergencyButton";
import VideoContainer from "../components/VideoContainer";
import FooterCredit from "../components/FooterCredit";
import "../styles/editorial-pages.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero__copy">
            <p className="editorial-kicker">MAHSA INTERNATIONAL COLLEGE <span>/</span> CLINICAL LEARNING</p>
            <h1>Emergency?<br /><em>Tap Here.</em></h1>
            <p className="home-hero__dek">
              A practical dental emergency quick reference for recognising an emergency and finding the next response pathway.
            </p>
            <div className="home-hero__actions">
              <EmergencyButton />
            </div>
            <p className="home-hero__note"><Activity size={15} /> Clinical reference · Educational use</p>
          </div>
          <div className="home-hero__media">
            <VideoContainer />
            <span className="home-hero__media-caption">DENTAL EMERGENCY QUICK REFERENCE <span>01—07</span></span>
          </div>
          <div className="home-hero__index" aria-hidden="true">01</div>
        </section>

        <section className="home-support">
          <div>
            <span className="home-support__icon"><BookOpenCheck size={19} aria-hidden="true" /></span>
            <p><strong>Structured response</strong><span>Recognition, first actions, and decision pathways in one place.</span></p>
          </div>
          <div>
            <span className="home-support__icon"><AlertCircle size={19} aria-hidden="true" /></span>
            <p><strong>Disclaimer</strong><span>This guide is intended for educational and quick reference purposes only and does not replace professional clinical judgement.</span></p>
          </div>
        </section>
      </main>
      <FooterCredit />
    </div>
  );
}

export default Home;
