const router = require('express').Router();
const { User, Planner, Comment } = require('../models');
const withAuth = require('../utils/auth');

//still need to add middleware but for now leave as is for testing
router.get('/', withAuth, async (req, res) => {
    try {
        const plannerData = await Planner.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const itineraries = plannerData.map((plan) => plan.get({ plain: true }));

        res.render('homepage', { itineraries, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', { layout: false });
});

router.get('/signup', async (req, res) => {
    res.render('signup', { layout: false });
});

router.get('/my-plans', async (req, res) => {
    try {
        const plannerData = await Planner.findAll({
            where: {
                user_id: req.session.user.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const itineraries = plannerData.map((plan) => plan.get({ plain: true }));

        res.render('homepage', { itineraries, logged_in: req.session.logged_in, my_plans: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create-plan', async (req, res) => {
    try {
        res.render('create-plan', { logged_in: req.session.logged_in, creating_plan: true});
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/plan/:id/comments', async (req, res) => {
    try {
        const planData = await Planner.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                include: [{ model: User, attributes: ['username'] }]
            }],
            attributes: {
                exclude: ['user_id']
            }
        });

        const plan = planData.get({ plain: true });

        res.render('view-plan', {
            plan,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/plan/:id/add-comment', async (req, res) => {
    try {
        const createdComment = await Comment.create({
            content: req.body.content,
            plan_id: req.params.id,
            user_id: req.session.user.id
        });

        res.status(200).json(createdComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;