import jwt from 'jsonwebtoken';
//import dotenv from 'dotenv';
import User from '../models/user.js';

//dotenv.config();

const authMiddleware = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: "Not Authorized, no token"})

    try {
        // 3. Verify the token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 4. Find the user from the database using the ID from the token.
        const user = await User.findById(decoded.id).select("-password");

        // If the user associated with the token doesn't exist anymore, deny access.
        if (!user) {
            return res.status(401).json({ message: 'Authentication invalid: User not found.' });
        }

        req.user = user; 
        
        // 5. Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Handle specific JWT errors for better client-side feedback
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Authentication invalid: Token has expired.' });
        }
        return res.status(401).json({ message: 'Authentication invalid: Token is not valid.' });
    }
};

export default authMiddleware;
