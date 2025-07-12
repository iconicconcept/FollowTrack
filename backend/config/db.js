import mongoose from "mongoose";

export const connectDB = async ()=>{
        //console.log("MONGO_URI from db.js:", process.env.MONGO_URI); // Add this line for debugging
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MONGODB CONNECTED SUCCESSFULLY!") 
    } catch (error) {
        console.error("Error connecting to MONGODB", error);
        process.exit(1);
    };
}