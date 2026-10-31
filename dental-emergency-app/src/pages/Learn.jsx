import { useState } from "react";
import { CirclePlay, VideoOff } from "lucide-react";

import FooterCredit from "../components/FooterCredit";
import Navbar from "../components/Navbar";
import { emergencies } from "../data/emergencies";
import { emergencyData } from "../data/emergencyContent";
import "../styles/learn.css";

const lessonVideos = {};

function Learn() {
  const [selectedId, setSelectedId] = useState(emergencies[0]?.id ?? "");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const selectedEmergency = emergencies.find((emergency) => emergency.id === selectedId) ?? emergencies[0];
  const selectedGuide = emergencyData.find((guide) => guide.id === selectedEmergency?.id);
  const selectedVideo = lessonVideos[selectedEmergency?.id];

  function selectEmergency(id) {
    setSelectedId(id);
    setVideoLoading(Boolean(lessonVideos[id]?.url));
    setVideoFailed(false);
  }

  return (
    <div className="editorial-page learn-page">
      <Navbar />

      <main className="learn-main">
        <header className="learn-heading">
          <p className="editorial-kicker">LEARNING LIBRARY <span>/</span> {String(emergencies.length).padStart(2, "0")} TOPICS</p>
          <h1>Learn the response.</h1>
          <p>Explore the key signs and response pathway for each dental emergency.</p>
        </header>

        {selectedEmergency && (
          <section className="learn-layout" aria-label="Emergency lessons">
            <div className="learn-current">
              <div className="learn-player" aria-label={`${selectedEmergency.title} lesson video`}>
                {selectedVideo?.url && !videoFailed ? (
                  <>
                    <video
                      key={selectedEmergency.id}
                      className="learn-player__video"
                      src={selectedVideo.url}
                      poster={selectedGuide?.image}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={`${selectedEmergency.title} lesson video`}
                      onLoadStart={() => setVideoLoading(true)}
                      onCanPlay={() => setVideoLoading(false)}
                      onError={() => {
                        setVideoLoading(false);
                        setVideoFailed(true);
                      }}
                    />
                    {videoLoading && <span className="learn-player__loading" role="status">Loading lesson…</span>}
                  </>
                ) : (
                  <div className="learn-player__placeholder">
                    {selectedGuide?.image && <img src={selectedGuide.image} alt="" />}
                    <div className="learn-player__placeholder-copy">
                      {videoFailed ? <VideoOff size={28} aria-hidden="true" /> : <CirclePlay size={34} aria-hidden="true" />}
                      <strong>{videoFailed ? "Lesson video unavailable" : "Lesson video coming soon"}</strong>
                      <span>{videoFailed ? "Please try another lesson." : "Video not yet configured"}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="learn-current__copy" aria-live="polite">
                <p className="learn-current__category">{selectedEmergency.category}</p>
                <h2>{selectedEmergency.title}</h2>
                <p>{selectedGuide?.introduction ?? selectedEmergency.summary}</p>
              </div>

            </div>

            <aside className="learn-playlist" aria-label="Emergency lesson playlist">
              <div className="learn-playlist__heading">
                <div>
                  <p className="editorial-kicker">PLAYLIST</p>
                  <h2>All emergencies</h2>
                </div>
                <span>{String(emergencies.length).padStart(2, "0")}</span>
              </div>
              <div className="learn-playlist__items">
                {emergencies.map((emergency) => {
                  const guide = emergencyData.find((item) => item.id === emergency.id);
                  const isSelected = emergency.id === selectedEmergency.id;
                  const video = lessonVideos[emergency.id];
                  return (
                    <button
                      className={`learn-lesson${isSelected ? " is-selected" : ""}`}
                      key={emergency.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectEmergency(emergency.id)}
                    >
                      <span className="learn-lesson__thumbnail">
                        {guide?.image && <img src={guide.image} alt="" loading="lazy" />}
                        <CirclePlay size={19} aria-hidden="true" />
                      </span>
                      <span className="learn-lesson__copy">
                        <strong>{emergency.title}</strong>
                        <span>{video?.duration ?? "Video not yet configured"}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </section>
        )}

      </main>
      <FooterCredit />
    </div>
  );
}

export default Learn;