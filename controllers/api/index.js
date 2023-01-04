const router = require('express').Router();

const userRoutes = require('./user-routes');
const plannerRoutes = require('./planner-routes');

router.use('/planner', plannerRoutes);
router.use('/users', userRoutes);

module.exports = router;