const express = require('express');
const router = express.Router();
const emp = require('../controllers/employeeController');

const auth = require('../middleware/authMiddleware');

router.get('/api/employees', auth,emp.getAll);
router.get('/api/employees/:id',  auth,emp.getOne);
router.post('/api/employees',  auth,emp.create);
router.put('/api/employees/:id',  auth,emp.update);
router.delete('/api/employees/:id',  auth,emp.delete);

module.exports = router;
