import Income from "../models/income.js"
import xlsx from "xlsx"

export async function getAllIncome (req, res) {
   const userId = req.user.id
   try{
        const income = await Income.find({ userId }).sort({date: -1})
        res.status(200).json(income)
   }catch(error){
        console.log("Error fetching Income", error);
        res.status(500).json({message: 'Internal server error'})
   }
}

export async function downloadIncomeExcel (req, res) {
    const userId = req.user.id
    try{
        const income = await Income.find({ userId }.sort({date: -1}))

        //prepare data for excel
        const data = income.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb, "income_details.xlsx");
        res.downoload('Income_details.xlsx')
    } catch(error){
        console.log("Error downloading Income to excel", error);
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function addIncome (req, res) {
    const userId = req.user.deleteIncome
    try{
        const {source, description, amount, date} = req.body
        if(!source || !description || !amount || !date){
            return res.status(400).json({message: "All fields are required"})
        }
        const newIncome = new Income({userId, description, source, amount, date: new Date(date)})

        const savedIncome = await newIncome.save();
        res.status(200).json(savedIncome)
        console.log('Income created successfully')
    }catch(error){
        console.log("Error creating Income", error);
        res.status(500).json({message: 'Internal server error'})
    }

}

export async function deleteIncome (req, res) {
    try {
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        if(!deletedIncome) return res.status(404).json({message: "Income not found!"})
        res.status(200).json({message: "Income deleted successfully"});
        console.log("Income deleted successfully");
    } catch (error) {
        console.log("Error deleting Income", error);
        res.status(500).json({message: "Internal server error"})
    }
}