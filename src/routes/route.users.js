const { Router } = require('express');
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/controllers.users');

const router = Router();

router.get('/',getUsers);
router.post('/',addUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;