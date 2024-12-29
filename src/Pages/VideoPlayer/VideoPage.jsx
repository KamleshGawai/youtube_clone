import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, Save } from "lucide-react";
import "./VideoPage.css";

const VideoPage = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comment, setComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
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
      console.error("Error fetching video:", error);
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setVideo((prev) => ({ ...prev, likes: data.likes }));
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    if (isDisliking) return;

    setIsDisliking(true);
    try {
      const response = await fetch(`http://localhost:5000/videos/${videoId}/dislike`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setVideo((prev) => ({ ...prev, dislikes: data.dislikes }));
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123", comment: comment.trim() }),
      });
      const data = await response.json();
      if (data.success) {
        setVideo((prev) => ({ ...prev, comments: [...prev.comments, data.comment] }));
        setComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setVideo((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c.commentId !== commentId),
        }));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (commentId, currentText) => {
    setIsEditingComment(true);
    setCommentToEdit(commentId);
    setComment(currentText);
  };

  const handleUpdateComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/comments/${commentToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment.trim() }),
      });
      const data = await response.json();
      if (data.success) {
        setVideo((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c.commentId === commentToEdit ? { ...c, comment: comment.trim() } : c
          ),
        }));
        setComment("");
        setIsEditingComment(false);
        setCommentToEdit(null);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (!video) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="video-page">
      <div className="main-content">
        <div className="video-section">
          {/* Video Player */}
          <video controls src={video.src} className="video-player" />
          <h1 className="video-title">{video.title}</h1>
          <div className="video-actions">
            <button onClick={handleLike} disabled={isLiking}>
              <ThumbsUp className="icon" />
              {video.likes}
            </button>
            <button onClick={handleDislike} disabled={isDisliking}>
              <ThumbsDown className="icon" />
              {video.dislikes}
            </button>
            <button>
              <Share2 className="icon" />
              Share
            </button>
            <button>
              <Save className="icon" />
              Save
            </button>
          </div>
          <div className="comments-section">
            <h3>Comments ({video.comments?.length || 0})</h3>
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                disabled={isCommenting}
              />
              <button type="submit" disabled={isCommenting}>
                Comment
              </button>
            </form>
            <div className="comment-list">
              {video.comments?.map((c) => (
                <div key={c.commentId} className="comment-item">
                  <p>{c.comment}</p>
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(c.commentId, c.comment)}>Edit</button>
                    <button onClick={() => handleDeleteComment(c.commentId)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            {isEditingComment && (
              <div className="edit-comment">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Edit your comment..."
                />
                <button onClick={handleUpdateComment}>Update</button>
                <button onClick={() => setIsEditingComment(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
        <div className="related-videos">
          <h3>Related Videos</h3>
          {relatedVideos.map((rv) => (
            <div
              key={rv.videoId}
              className="related-video"
              onClick={() => navigate(`/video/${rv.videoId}`)}
            >
              <img src={rv.thumbnailUrl} alt={rv.title} className="thumbnail" />
              <div className="video-info">
                <p className="related-title">{rv.title}</p>
                <p>{rv.uploader}</p>
                <p>{rv.views?.toLocaleString()} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
