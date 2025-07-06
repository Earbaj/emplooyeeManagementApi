const express = require('express');
const router = express.Router();
const emp = require('../controllers/employeeController');

router.get('/api/employees', emp.getAll);
router.get('/api/employees/:id', emp.getOne);
router.post('/api/employees', emp.create);
router.put('/api/employees/:id', emp.update);
router.delete('/api/employees/:id', emp.delete);

module.exports = router;
