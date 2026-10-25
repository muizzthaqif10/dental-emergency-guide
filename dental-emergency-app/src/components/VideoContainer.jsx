function VideoContainer() {
  return (
    <figure className="home-video">
      <video
        className="home-video__video"
        src="/videos/homepage-bg.mp4"
        aria-label="Cat video"
        autoPlay
        muted
        loop
        playsInline
      />
    </figure>
  );
}

export default VideoContainer;