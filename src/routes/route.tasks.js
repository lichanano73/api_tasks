const { Router } = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/controllers.tasks');

const router = Router();

router.get('/',getTasks);
router.post('/',addTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;