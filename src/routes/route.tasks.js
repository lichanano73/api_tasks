const { Router } = require('express');
const { getTasks, getTasksByUserId, addTask, updateTask,
    deleteTask, assignUsersToTask,
} = require('../controllers/controllers.tasks');

const router = Router();

router.get('/', getTasks);
router.post('/', addTask);

router.put('/:id/assign-users', assignUsersToTask);

router.get('/user/:userId', getTasksByUserId);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);


module.exports = router;