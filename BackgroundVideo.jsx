const BackgroundVideo = () => {
  return (
    <div className="global-background-video">
      <video
        className="global-background-video__video"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-tropical-island-8769/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className="global-background-video__overlay" />
    </div>
  )
}

export default BackgroundVideo

