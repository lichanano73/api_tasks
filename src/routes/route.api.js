const { Router } = require('express');
const auth = require('../middelwares/auth');
const router_users = require('./route.users');
const router_tasks = require('./route.tasks');

const router = Router();

router.use('/users',router_users);
router.use('/tasks',auth.verifyToken,router_tasks);

module.exports = router;