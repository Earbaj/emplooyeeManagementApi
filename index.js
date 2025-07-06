const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Middleware to parse incoming JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes with base path
app.use('/api', authRoutes);
app.use('/api', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack); // this shows up in Render logs
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
