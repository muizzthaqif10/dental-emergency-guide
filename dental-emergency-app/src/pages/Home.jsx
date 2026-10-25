import { ArrowRight, Activity, BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import VideoContainer from "../components/VideoContainer";
import "../styles/editorial-pages.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero__copy">
            <p className="editorial-kicker">MAHSA INTERNATIONAL COLLEGE <span>/</span> CLINICAL LEARNING</p>
            <h1>Calm, clear care<br />in an <em>emergency.</em></h1>
            <p className="home-hero__dek">
              A practical dental emergency quick reference for recognising an emergency and finding the next response pathway.
            </p>
            <Link className="home-hero__action" to="/emergencies">
              Explore emergency guides <ArrowRight size={17} />
            </Link>
            <p className="home-hero__note"><Activity size={15} /> Clinical reference · Educational use</p>
          </div>
          <div className="home-hero__media">
            <VideoContainer />
            <span className="home-hero__media-caption">DENTAL EMERGENCY QUICK REFERENCE <span>01—07</span></span>
          </div>
          <div className="home-hero__index" aria-hidden="true">01</div>
        </section>

        <section className="home-support">
          <div><BookOpenCheck size={19} /><p><strong>Structured response</strong><span>Recognition, first actions, and decision pathways in one place.</span></p></div>
          <p className="editorial-disclaimer"><strong>Disclaimer</strong> This guide is intended for educational and quick reference purposes only and does not replace professional clinical judgement.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
