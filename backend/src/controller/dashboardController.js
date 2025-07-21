import Income from "../models/income.js"
import Expense from "../models/expense.js"
import { isValidObjectId, Types } from "mongoose"

export async function getDashboardData (req, res) {
    try{
        const userId = req.user.id
        const userObjectId = new Types.ObjectId(String(userId));

        //fetch total Income
        const totalIncome = await Income.aggregate([
            {$match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)})

        //fetch total Expense
        const totalExpense = await Expense.aggregate([
            {$match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        console.log("totalExpense", {totalExpense, userId: isValidObjectId(userId)})

        // //get last 30 days income transanctions
        // const last30DaysIncomeTransactions = await Income.find({
        //     userId, // userObjectId, 
        //     date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        // }).sort({date: -1})

        // //get total income of last 30days
        // const last30DaysIncome = last30DaysIncomeTransactions.reduce(
        //     (sum, transaction) => sum + transaction.amount,
        //     0
        // )


        // //get 30 days expense transactions
        // const last30DaysExpenseTransactions = await Expense.find({
        //     userId, //userObjectId, 
        //     date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        // }).sort({date: -1})

        // //get total expense of last 30days
        // const last30DaysExpenses = last30DaysExpenseTransactions.reduce(
        //     (sum, transaction) => sum + transaction.amount,
        //     0
        // )

        //get 5 last transactions
        const recentTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),

            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            )
        ].sort((a, b)=> b.date - a.date); //sort latest first

        //final response
        res.json({
                totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome: totalIncome[0]?.total || 0,
                totalExpenses: totalExpense[0]?.total || 0,
                //last30DaysExpenses: {total: last30DaysExpenses, transactions: last30DaysExpenseTransactions},
                //last30DaysIncome: {total: last30DaysIncome, transactions: last30DaysIncomeTransactions},
                recentTransactions: recentTransactions,
            }
        );
    }catch(error){
        console.log("Error fetching dashboard data", error);
        res.status(500).json({message: 'Internal server error'})
   }
}