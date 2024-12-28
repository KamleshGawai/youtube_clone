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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
