const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hash],
      (err) => {
        if (err) {
          console.error('[DB ERROR]', err);
          return res.status(400).json({ error: 'Email already exists or DB error' });
        }
        res.json({ message: 'User registered' });
      }
    );
  } catch (e) {
    console.error('[REGISTER ERROR]', e);
    res.status(500).json({ error: 'Server error' });
  }
};

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err) => {
//     if (err) return res.status(400).json({ error: 'Email already exists' });
//     res.json({ message: 'User registered' });
//   });
// };

// exports.login = (req, res) => {
//   const { email, password } = req.body;
//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//     if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
//     const match = await bcrypt.compare(password, results[0].password);
//     if (!match) return res.status(401).json({ error: 'Invalid credentials' });
//     res.json({ message: 'Login successful', user: results[0] });
//   });
// };

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email
      }
    });
  });
};
