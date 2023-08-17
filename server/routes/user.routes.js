const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');

const User = require('../models/User');

router.get('/all', authMiddleware, async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;