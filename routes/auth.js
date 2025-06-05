import express from 'express';
const router = express.Router();
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

//REGISTER
router.post('/register', async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
        res.status(201).json({ user: { _id: user._id, username, email }, token });
        }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

//LOGIN
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRES_IN
        });
        res.json({ user: { _id: user._id, username: user.username, email }, token });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

export default router;
