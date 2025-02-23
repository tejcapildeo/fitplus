import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import User from '../model/User';

router.get('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id).exec();
        if(!user){return res.status(404).send('User not found')}
        res.json(user);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
})

// router.get('/', (req, res) => {

// })

router.post('/', async (req, res) => {
    try{
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
})


router.put('/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!user){return res.status(404).send('User not found')};
        res.json(user);
    }
    catch (err){
        res.status(400).json({message : err.message});
    }
})


router.delete('/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){return res.status(404).send('User not found')};
        res.status(204).send();
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
})



// router.post('/login', (req,res) => {

// })


export default router;