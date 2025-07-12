import express from "express"
import {getAllIncome, addIncome, deleteIncome, downloadIncomeExcel} from "../controller/incomeController.js"

const router = express.Router();

router.get("/get",getAllIncome )
router.get("/downloadexcel", downloadIncomeExcel)
router.post("/add", addIncome)
router.delete("/:id", deleteIncome)

export default router