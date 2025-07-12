import mongoose from "mongoose"

const expenseShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, //e.g food, rent, cloth
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        enum: ['expense', 'income']
    },
},{timestamps: true})

const Expense = mongoose.model("Expense", expenseShema)

export default Expense