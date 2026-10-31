import { Activity, AlertCircle, BookOpenCheck, Bot, Download, Smartphone, Toothbrush } from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import EmergencyButton from "../components/EmergencyButton";
import VideoContainer from "../components/VideoContainer";
import FooterCredit from "../components/FooterCredit";
import "../styles/editorial-pages.css";

function Home() {
  const [apkAvailable, setApkAvailable] = useState(false);

  useEffect(() => {
    fetch("/downloads/dental-emergency-guide.apk", { method: "HEAD", cache: "no-store" })
      .then((response) => {
        const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
        setApkAvailable(response.ok && !contentType.includes("text/html"));
      })
      .catch(() => setApkAvailable(false));
  }, []);

  useEffect(() => {
    if (window.location.hash === "#android-app") {
      document.getElementById("android-app")?.scrollIntoView();
    }
  }, []);

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
            <picture className="home-hero__tooth-art">
              <source
                srcSet="/images/tooth-thinking-static.png"
                media="(prefers-reduced-motion: reduce)"
              />
              <img
                src="/images/Heart%20Love%20GIF%20by%20dental_sozai.gif"
                alt="Animated tooth character thinking"
                width="480"
                height="480"
                loading="eager"
                decoding="async"
              />
            </picture>
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

        <section className="home-app-download" id="android-app" aria-labelledby="home-app-download-title">
          <div className="home-app-download__visual" aria-hidden="true">
            <div className="home-app-download__device">
              <Smartphone className="home-app-download__phone" size={108} strokeWidth={1.35} />
              <span className="home-app-download__app-icon"><Activity size={20} /></span>
              <span className="home-app-download__android-mark"><Bot size={34} strokeWidth={1.8} /></span>
            </div>
          </div>
          <div className="home-app-download__copy">
            <p className="editorial-kicker">ANDROID APP <span>/</span> QUICK ACCESS</p>
            <h2 id="home-app-download-title">Get the Android App</h2>
            <p>
              Keep the dental emergency guide close at hand on your Android device for quick access to response pathways when you need them.
            </p>
          </div>
          <div className="home-app-download__action">
            {apkAvailable ? (
              <a className="home-app-download__button" href="/downloads/dental-emergency-guide.apk" download="dental-emergency-guide.apk">
                <Download size={18} aria-hidden="true" /> Download for Android
              </a>
            ) : (
              <p className="home-app-download__unavailable" role="status">Android app download is not currently available.</p>
            )}
            <span className="home-app-download__file">APK file <span aria-hidden="true">·</span> Android installer</span>
          </div>
        </section>
      </main>
      <FooterCredit />
    </div>
  );
}

export default Home;