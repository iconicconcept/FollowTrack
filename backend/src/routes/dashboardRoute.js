import express from "express"
import {getDashboardData} from "../controller/dashboardController.js"

const router = express.Router();

router.get("/transactions", getDashboardData)

export default router