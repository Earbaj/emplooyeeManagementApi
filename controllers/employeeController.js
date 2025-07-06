const db = require('../db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getOne = (req, res) => {
  db.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { name, email, phone } = req.body;
  db.query('INSERT INTO employee (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Employee added' });
  });
};

exports.update = (req, res) => {
  const { name, email, phone } = req.body;
  db.query('UPDATE employee SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Employee updated' });
  });
};

exports.delete = (req, res) => {
  db.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Employee deleted' });
  });
};
