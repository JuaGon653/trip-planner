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

router.delete('/:id', async (req, res) => {
    try {
        const deletedPlan = await Planner.destroy({
            where: {
                planId: req.params.id
            }
        });

        res.status(200).json(deletedPlan);
    } catch (err) {
        res.status(400).json(err);;
    }
});

router.put('/:id/update', async (req, res) => {
    try {
        const updatePlan = Planner.update(
            {
                plan_name: req.body.plan_name,
                description: req.body.description,
                start_date: req.body.start_date,
                end_date: req.body.end_date
            },
            {
                where: {
                    plan_id: req.params.id
                }
            }
        );

        res.status(200).json(updatePlan);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;

