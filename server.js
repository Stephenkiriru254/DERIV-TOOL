const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://your-frontend-ip:3000'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add body-parsing middleware
app.use(express.json());

// Your routes here...

// Login route
app.post('/login', (req, res) => {
  console.log('Received login request. Body:', req.body);
  console.log('Headers:', req.headers);
  
  const { username, password } = req.body;

  console.log(`Attempting login for username: ${username}, password: ${password}`);

  if (username === 'admin' && password === 'password') {
    console.log('Login successful');
    res.json({ success: true, username });
  } else {
    console.log('Login failed. Received:', { username, password });
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
