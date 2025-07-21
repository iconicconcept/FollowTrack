import Expense from "../models/expense.js"
import xlsx from "xlsx"

export async function getAllExpense (req, res) {
   const userId = req.user.id

   try{
       //get 30 days expense transactions
        const last30DaysExpenseTransactions = await Expense.find({
            userId, //userObjectId, 
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({date: -1})
    
        //get total expense of last 30days
        const last30DaysExpenses = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        const expense = await Expense.find({ userId }).sort({date: -1})

        res.status(200).json({
            expense,
            last30DaysExpenses: {total: last30DaysExpenses, transactions: last30DaysExpenseTransactions}
        })
   }catch(error){
        console.log("Error fetching expense", error);
        res.status(500).json({message: 'Internal server error'})
   }
}

export async function downloadExpenseExcel (req, res) {
    const userId = req.user.id
    try{
        const expense = await Expense.find({ userId }.sort({date: -1}))

        //prepare data for excel
        const data = expense.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, "Expense_details.xlsx");
        res.downoload('Expense_details.xlsx')
    } catch(error){
        console.log("Error downloading Expense to excel", error);
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function addExpense (req, res) {
    const userId = req.user.id
    try{
        const {category, amount, date} = req.body
        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"})
        }
        const newIncome = new Expense({userId, category, amount, date: new Date(date)})

        const savedIncome = await newIncome.save();
        res.status(200).json(savedIncome)
        console.log('expense created successfully')
    }catch(error){
        console.log("Error creating expense", error);
        res.status(500).json({message: 'Internal server error'})
    }

}

export async function deleteExpense (req, res) {
    try {
        const deletedIncome = await Expense.findByIdAndDelete(req.params.id);
        if(!deletedIncome) return res.status(404).json({message: "expense not found!"})
        res.status(200).json({message: "expense deleted successfully"});
        console.log("expense deleted successfully");
    } catch (error) {
        console.log("Error deleting expense", error);
        res.status(500).json({message: "Internal server error"})
    }
}