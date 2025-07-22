import { prepareExpenseLineChartData } from '@/lib/helper'
import React, { useEffect, useState } from 'react'
import CustomLinechart from './CustomLinechart'
import { PlusIcon } from 'lucide-react'

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([])
  
      useEffect(()=> {
          const result = prepareExpenseLineChartData(transactions)
          setChartData(result)
  
          return ()=>{}
      }, [transactions])

  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <div className="">
                <h5 className='text-lg'>OverAll Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your spendings over time and gain insight of your transactions</p>
            </div>

            <button className='add-btn' onClick={onAddExpense}>
                <PlusIcon className='size-4'/>
                Add Expense
            </button>
        </div>

        <div className='mt-9'>
            <CustomLinechart
                data={chartData}
            />
        </div>
    </div>
  )
}

export default ExpenseOverview