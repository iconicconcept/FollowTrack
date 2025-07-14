import React from 'react'
import CustomPieChart from './CustomPieChart'

const COLORS = ["#875CF5", "#FA2C33", "#FF6900"]

const TransactionOverview = ({totalBalance, totalExpenses, totalIncome}) => {
    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expenses", amount: totalExpenses},
        {name: "Total Income", amount: totalIncome}
    ]
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5>Financial Overview</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount= { `₦${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default TransactionOverview