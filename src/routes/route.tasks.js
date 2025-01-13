const { Router } = require('express');
const { getTasks, getTasksByUserId, addTask, updateTask,
    deleteTask, assignUsersToTask, addPartHours
} = require('../controllers/controllers.tasks');

const router = Router();

router.get('/', getTasks);//ok
router.post('/', addTask);//ok

router.put('/:id/assign-users', assignUsersToTask);//ok
router.post('/:id/add-part-hours', addPartHours);
router.get('/user/:userId', getTasksByUserId);//ok

router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);


module.exports = router;