import { Activity, AlertCircle, BookOpenCheck, Toothbrush } from "lucide-react";

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
        <div className="home-meta">
          <span><i className="home-meta__dot" aria-hidden="true" />Quick reference</span>
          <span>Recognise · Act · Escalate</span>
          <span>Edition 2026</span>
        </div>

        <section className="home-hero">
          <header className="home-hero__copy">
            <p className="editorial-kicker">
              <Toothbrush className="home-hero__tooth-icon" size={17} aria-hidden="true" />
              DENTAL EMERGENCIES REFERENCES<span>/</span> CLINICAL LEARNING
            </p>
            <h1>Emergency?<br /><em>Tap Here.</em></h1>
            <p className="home-hero__dek">
              A practical dental emergency quick reference for recognising an emergency and finding the next response pathway.
            </p>
          </header>

          <figure className="home-plate">
            <div className="home-plate__frame">
              <VideoContainer />
            </div>
            <figcaption className="home-plate__caption">
              <span>Fig. 01</span>
              <span>Educational use</span>
            </figcaption>
          </figure>

          <div className="home-hero__actions">
            <p className="home-hero__cue">Need help now?</p>
            <EmergencyButton />
            <p className="home-hero__note">
              <Activity size={14} aria-hidden="true" /> Clinical reference · Educational use
            </p>
          </div>
        </section>

        <section className="home-support" aria-label="About this guide">
          <article className="home-support__item">
            <span className="home-support__index">01</span>
            <span className="home-support__icon"><BookOpenCheck size={18} aria-hidden="true" /></span>
            <div className="home-support__body">
              <strong>Structured response</strong>
              <span>Recognition, first actions, and decision pathways in one place.</span>
            </div>
          </article>
          <article className="home-support__item">
            <span className="home-support__index">02</span>
            <span className="home-support__icon"><AlertCircle size={18} aria-hidden="true" /></span>
            <div className="home-support__body">
              <strong>Disclaimer</strong>
              <span>This guide is intended for educational and quick reference purposes only and does not replace professional clinical judgement.</span>
            </div>
          </article>
        </section>
      </main>
      <FooterCredit />
    </div>
  );
}

export default Home;