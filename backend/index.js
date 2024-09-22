require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Deriv Analysis Tool backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
