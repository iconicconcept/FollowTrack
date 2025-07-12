import express from "express"
import {getAllExpense, downloadExpenseExcel, addExpense, deleteExpense} from "../controller/expenseController.js"

const router = express.Router()

router.get("/get",getAllExpense )
router.get("/downloadexcel", downloadExpenseExcel)
router.post("/add", addExpense)
router.delete("/:id", deleteExpense)

export default router