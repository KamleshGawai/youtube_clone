
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB without deprecated options
mongoose.connect("mongodb://127.0.0.1:27017/todo")
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error:", error));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  dob: Date,
  email: String,
  mobile: String,
  country: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Video Schema
const videoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  thumbnailUrl: String,
  src: String,
  description: String,
  channelId: String,
  uploader: String,
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  comments: [
    {
      commentId: String,
      userId: String,
      comment: String,
      commentDate: Date
    }
  ]
});

const Video = mongoose.model('Video', videoSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { firstName, lastName, username, dob, email, mobile, country, password } = req.body;

  // Check if username exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to database
  const newUser = new User({ firstName, lastName, username, dob, email, mobile, country, password: hashedPassword });
  await newUser.save();

  res.json({ success: true, user: newUser });
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid username or password' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ success: true, token, user });
});

// Route to fetch all videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching videos' });
  }
});

// Route to fetch a single video by ID
app.get('/videos/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findOne({ videoId });
    const relatedVideos = await Video.find({ videoId: { $ne: videoId } }).limit(10);
    
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.json({ success: true, video, relatedVideos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching video details' });
  }
});

// Route to add a video (for testing purposes)
app.post('/add-video', async (req, res) => {
  const { videoId, title, thumbnailUrl, src, description, channelId, uploader, views, likes, dislikes, uploadDate, comments } = req.body;

  const newVideo = new Video({
    videoId,
    title,
    thumbnailUrl,
    src,
    description,
    channelId,
    uploader,
    views,
    likes,
    dislikes,
    uploadDate,
    comments
  });

  app.get('/videos/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    // Fetch related videos (excluding the current video)
    const relatedVideos = await Video.find({ videoId: { $ne: videoId } }).limit(5);

    res.json({ success: true, video, relatedVideos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching video' });
  }
});
  try {
    await newVideo.save();
    res.json({ success: true, video: newVideo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding video' });
  }
});

app.post('/videos/:videoId/comment', async (req, res) => {
  const { videoId } = req.params;
  const { userId, comment } = req.body;
  
  try {
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    
    const newComment = {
      commentId: new mongoose.Types.ObjectId().toString(),
      userId,
      comment,
      commentDate: new Date()
    };
    
    video.comments.push(newComment);
    await video.save();
    
    res.json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding comment' });
  }
});

// Route to handle likes
app.put('/videos/:videoId/like', async (req, res) => {
  const { videoId } = req.params;
  
  try {
    // Using findOneAndUpdate to atomically update the likes count
    const updatedVideo = await Video.findOneAndUpdate(
      { videoId: videoId },
      { $inc: { likes: 1 } },  // Increment likes by 1
      { new: true }  // Return the updated document
    );

    if (!updatedVideo) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    
    res.json({ 
      success: true, 
      likes: updatedVideo.likes
    });
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ success: false, message: 'Error updating likes' });
  }
});

// Route to handle dislikes
app.put('/videos/:videoId/dislike', async (req, res) => {
  const { videoId } = req.params;
  
  try {
    const updatedVideo = await Video.findOneAndUpdate(
      { videoId: videoId },
      { $inc: { dislikes: 1 } },  // Increment dislikes by 1
      { new: true }  // Return the updated document
    );

    if (!updatedVideo) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    
    res.json({ 
      success: true, 
      dislikes: updatedVideo.dislikes
    });
  } catch (error) {
    console.error('Error updating dislikes:', error);
    res.status(500).json({ success: false, message: 'Error updating dislikes' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
