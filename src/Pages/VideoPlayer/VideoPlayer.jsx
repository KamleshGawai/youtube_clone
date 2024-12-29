import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    // Fetch video details
    fetch(`http://localhost:5000/videos/${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setVideo(data.video);
          setRelatedVideos(data.relatedVideos);
        }
      })
      .catch((error) => console.error('Error fetching video:', error));
  }, [videoId]);

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="video-player-page">
      <div className="video-section">
        <video controls className="video-player">
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1>{video.title}</h1>
        <p>{video.description}</p>
        <div className="video-stats">
          <span>{video.views} views</span>
          <span>{video.likes} likes</span>
          <span>{video.uploadDate}</span>
        </div>
      </div>
      <div className="related-videos">
        <h3>Related Videos</h3>
        {relatedVideos.map((related) => (
          <div key={related.videoId} className="related-video-card">
            <img src={related.thumbnailUrl} alt={related.title} />
            <p>{related.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
