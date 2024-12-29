import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Save } from 'lucide-react';
import "./VideoPage.css"

const VideoPage = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comment, setComment] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const { videoId } = useParams();
  const navigate = useNavigate();

  const fetchVideoData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/videos/${videoId}`);
      const data = await response.json();
      if (data.success) {
        setVideo(data.video);
        setRelatedVideos(data.relatedVideos);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await fetch(`http://localhost:5000/videos/${videoId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setVideo(prev => ({
          ...prev,
          likes: data.likes
        }));
      } else {
        console.error('Failed to update likes:', data.message);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    if (isDisliking) return;
    
    setIsDisliking(true);
    try {
      const response = await fetch(`http://localhost:5000/videos/${videoId}/dislike`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setVideo(prev => ({
          ...prev,
          dislikes: data.dislikes
        }));
      } else {
        console.error('Failed to update dislikes:', data.message);
      }
    } catch (error) {
      console.error('Error updating dislikes:', error);
    } finally {
      setIsDisliking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (isCommenting || !comment.trim()) return;

    setIsCommenting(true);
    try {
      const response = await fetch(`http://localhost:5000/videos/${videoId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123', // Replace with actual user ID from auth
          comment: comment.trim()
        }),
      });

      const data = await response.json();
      if (data.success) {
        setVideo(prev => ({
          ...prev,
          comments: [...prev.comments, data.comment]
        }));
        setComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  if (!video) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="video-page-container">
      <div className="content-container">
        {/* Primary Content */}
        <div className="primary">
          {/* Video Player */}
          <div className="video-container">
            <video controls src={video.src} />
          </div>

          {/* Video Info */}
          <div className="video-info">
            <h1 className="video-title">{video.title}</h1>
            
            <div className="video-stats">
              <div className="views-date">
                <span>{video.views?.toLocaleString()} views</span>
                <span> • </span>
                <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>
              
              <div className="video-actions">
                <button 
                  className="action-button"
                  onClick={handleLike}
                  disabled={isLiking}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{video?.likes || 0}</span>
                </button>
                <button 
                  className="action-button"
                  onClick={handleDislike}
                  disabled={isDisliking}
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span>{video?.dislikes || 0}</span>
                </button>
                <button className="action-button">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="action-button">
                  <Save className="w-5 h-5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Channel Info */}
          <div className="channel-info">
            <div className="channel-avatar"></div>
            <div className="channel-details">
              <h3 className="channel-name">{video.uploader}</h3>
              <p className="subscriber-count">500K subscribers</p>
            </div>
            <button className="subscribe-button">Subscribe</button>
          </div>

          {/* Description */}
          <div className="video-description">
            <p>{video.description}</p>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h3 className="comments-header">
              {video.comments?.length || 0} Comments
            </h3>
            
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="comment-avatar"></div>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
                disabled={isCommenting}
              />
            </form>

            <div className="comment-list">
              {video.comments?.map((comment) => (
                <div key={comment.commentId} className="comment-item">
                  <div className="comment-avatar"></div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">User</span>
                      <span className="comment-date">
                        {new Date(comment.commentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comment-text">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Content (Related Videos) */}
        <div className="secondary">
          <div className="related-videos">
            {relatedVideos.map((relatedVideo) => (
              <div
                key={relatedVideo.videoId}
                className="related-video-card"
                onClick={() => navigate(`/video/${relatedVideo.videoId}`)}
              >
                <div className="thumbnail-container">
                  <img
                    src={relatedVideo.thumbnailUrl}
                    alt={relatedVideo.title}
                    className="thumbnail"
                  />
                </div>
                <div className="video-details">
                  <h3 className="video-title-secondary">{relatedVideo.title}</h3>
                  <p className="channel-name-secondary">{relatedVideo.uploader}</p>
                  <p className="video-stats-secondary">
                    {relatedVideo.views?.toLocaleString()} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;