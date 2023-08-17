const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config"); 
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration', 
        [
            check('email', 'Incorrect email').isEmail(),
            check('password', 'Password must be longer than 1').isLength({min: 1, max: 12})
        ],
        async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request", errors})
            }

            const {username, email, password} = req.body;

            const candidate = await User.findOne({email});

            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({username, email, password: hashPassword});
            await user.save();
            res.json({message: "User has been created"});

        } catch(e) {
            console.log(e);
            res.send({message: 'Server error!'})
        }
})

router.post('/login', 
        async (req, res) => {
        try {
            const {email, password, logindate} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) {
                return res.status(400).json({message: 'Invalid password'})
            }
            user.logindate = new Date();
            await user.save();
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            }) 

        } catch(e) {
            console.log(e);
            res.send({message: 'Server error!'})
        }
})

router.get('/auth', authMiddleware,
        async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    username: user.username,
                    id: user.id,
                    email: user.email
                }
            }) 
        } catch(e) {
            console.error(e);
            res.status(500).json({ message: 'Error' });
        }
})

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;

        if (req.user.id !== userId) {
            return res.status(403).json({ message: "You don't have permission to delete this user." });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;