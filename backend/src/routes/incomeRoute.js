import express from "express"
import {getAllIncome, getLast30DaysIncome, addIncome, deleteIncome, downloadIncomeExcel} from "../controller/incomeController.js"

const router = express.Router();

router.get("/get",getAllIncome )
router.get("/last30DaysIncomes", getLast30DaysIncome)
router.get("/downloadexcel", downloadIncomeExcel)
router.post("/add", addIncome)
router.delete("/:id", deleteIncome)

export default router