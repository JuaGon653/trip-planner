const router = require('express').Router();
const {Project, Planner} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const newPlanner = await Planner.create({
            ...req.body,
            user_id: req.session.user.id,
        });
        res.status(200).json(newPlanner);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

