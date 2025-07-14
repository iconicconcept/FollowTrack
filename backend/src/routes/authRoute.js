import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res)=>{
    const {fullName, email, password, profileImageUrl} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    try {
        const oldUser = await User.findOne({email})
        if(oldUser){
           res.status(409).json({message: "User with the email already exist"}) 
        } else{
            const newUser = new User({fullName, email, password: hashedPassword, profileImageUrl});
            const user = await newUser.save();
            const payload = {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin || false
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
            res.status(200).json({ token})
        }
        
    } catch (err) {
        console.error("Error creating account", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    try {
       const user = await User.findOne({email})
       if(!user) { return res.status(404).json({message: "User not found"}) }

       const validPassword = bcrypt.compareSync(password, user.password)
       if(!validPassword) {return res.status(401).json({message: "invalid credentials"})}
       const payload = {
           id: user.id,
           fullName: user.fullName,
           email: user.email,
           isAdmin: user.isAdmin || false
       };

       const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})
       res.status(200).json({token})
    } catch (err) {
       console.error("error logging in", err.message);
       res.status(500).json({message: "Internal server error"})
    }
})

router.get("/getUser", authMiddleware, async (req, res)=>{
    try {
        // const user = await User.findById(req.user.id).select("-password")

        // if(!user){
        //     return res.status(404).json({message: "user not found"})
        // }
        res.status(200).json(req.user)
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: 'Error fetching user data', error})
    }
})

router.post("/upload-image", upload.single('image'), (req, res)=>{
    if(!req.file){
        return res.status(400).json({mesage: "No file uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl })
});

export default router