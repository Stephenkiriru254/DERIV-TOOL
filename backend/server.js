require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this line

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../src/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
  });
}

const users = {
  Developer: { devices: [] }
};

app.post('/api/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, deviceId } = req.body;
  
  if (username === 'Developer') {
    if (!users[username].devices.includes(deviceId)) {
      if (users[username].devices.length >= 2) {
        console.log('Max devices reached');
        return res.status(403).json({ error: 'Max devices reached' });
      }
      users[username].devices.push(deviceId);
    }
    
    console.log('Login successful');
    res.json({ success: true, username });
  } else {
    console.log('Invalid credentials');
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  const { username, deviceId } = req.body;
  
  if (users[username]) {
    users[username].devices = users[username].devices.filter(d => d !== deviceId);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Add any additional API routes here

// Catch-all route to serve the React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
