import mongoose from "mongoose"

const incomeShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }, //e.g income, salary, freelance
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true})

const Income = mongoose.model("Income", incomeShema)

export default Income