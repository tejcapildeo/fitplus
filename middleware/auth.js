import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import 'dotenv/config';

/**
 *  Reads the Authorization: Bearer <token> header,

    Verifies the JWT using process.env.TOKEN_SECRET,

    Loads the corresponding User document into req.user,

    Rejects if token is missing/invalid.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export default async function auth(req, res, next){
    console.log('▶ process.env.TOKEN_SECRET is:', process.env.TOKEN_SECRET);
    const header = req.header('Authorization') || '';
    if (!header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // 3. Extract the token (everything after "Bearer ")
    const token = header.slice(7).trim();
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // 4. Verify the token
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(payload._id);
        if (!user) throw new Error('User not found');

        // 5. Attach the user document to req.user
        req.user = user;
        next();
    } catch (err) {
        console.log('✖ Token verification failed:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}