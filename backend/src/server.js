import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from 'path';
import { connectDB } from "../config/db.js"
import authMiddleware from "./middleware/authMiddleware.js";
import authRoute from "./routes/authRoute.js"
import incomeRoute from "./routes/incomeRoute.js"
import expenseRoute from "./routes/expenseRoute.js"
import dashRoute from "./routes/dashboardRoute.js"
import rateLimiter from "./middleware/rateLimiter.js";
//import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000
const __dirname = path.resolve();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
    }));
//}


app.use(express.json());

app.use(rateLimiter)
app.use("/api/auth", authRoute)
app.use("/api/income", authMiddleware, incomeRoute)
app.use("/api/expense", authMiddleware, expenseRoute)
app.use("/api/dashboard", authMiddleware, dashRoute)

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "../client/dist")));
//     app.get("files{/*path}",(req, res)=>{
//         res.sendFile(path.join(__dirname,"../client","dist","index.html"))
//     });
// };

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

connectDB().then(() =>{
        app.listen(PORT, ()=>{
        console.log(`Server has started on port: ${PORT}`)
    });
})