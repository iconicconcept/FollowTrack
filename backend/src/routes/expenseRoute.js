import express from "express"
import {getAllExpense, downloadExpenseExcel, addExpense, deleteExpense} from "../controller/expenseController.js"

const router = express.Router()

router.get("/getExpense",getAllExpense )
router.get("/downloadExcelExpense", downloadExpenseExcel)
router.post("/addExpense", addExpense)
router.delete("/:id", deleteExpense)

export default router