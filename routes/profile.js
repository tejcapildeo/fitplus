import express from 'express';
import User from '../model/User.js';
import auth from '../middleware/auth.js';
import 'dotenv/config';


const router = express.Router();
router.use(auth);

router.get('/', auth, async (req,res) => {
    try{
        const { password, ...publicFields } = req.user._doc;   //this
        res.json(publicFields);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
})

router.put('/', auth, async (req,res) => {
    try{
        // Merge incoming fields onto the user  
        Object.assign(req.user, req.body);

        // If password was changed, your pre-'save' hook will re-hash it
        const updated = await req.user.save();
        const { password, ...publicFields } = updated._doc;
        res.json(publicFields);
    }
    catch (err){
        res.status(400).json({message : err.message});
    }
})

router.delete('/',auth,  async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id);
        res.status(204).send();
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
})

export default router;