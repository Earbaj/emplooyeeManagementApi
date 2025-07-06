const db = require('../db');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err) => {
    if (err) return res.status(400).json({ error: 'Email already exists' });
    res.json({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: results[0] });
  });
};
