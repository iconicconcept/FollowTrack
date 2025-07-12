import mongoose from "mongoose"

const incomeShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    type: {
        type: String,
        required: true,
        enum: ['expense', 'income']
    },
}, {timestamps: true})

const Income = mongoose.model("Income", incomeShema)

export default Income