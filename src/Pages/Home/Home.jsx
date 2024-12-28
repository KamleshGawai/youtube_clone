import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.css';
import reactImage from "../../assets/React.jpeg"

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // Use navigate for routing

  // Fetch video data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setVideos(data.videos); // Set videos in state
        }
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <>
      <Sidebar setCategory={setCategory} sidebar={sidebar} category={category} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <div className="video-list">
          {videos.map((video) => (
            <div
              key={video.videoId}
              className="video-card"
              onClick={() => navigate(`/video/${video.videoId}`)} // Navigate on click
            >
              <img
                src={reactImage}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="video-details">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
                <div className="video-stats">
                  <span>{video.views} views</span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
