const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(employeeRoutes);

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
