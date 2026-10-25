function VideoContainer() {
  return (
    <div className="home-video">
      <div className="home-video__placeholder" role="img" aria-label="image letak sini: Emergency overview">
        <span>image letak sini</span>
        <small>Emergency overview</small>
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="home-video__player"
      >
        <source
          src="/videos/homepage-bg.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default VideoContainer;