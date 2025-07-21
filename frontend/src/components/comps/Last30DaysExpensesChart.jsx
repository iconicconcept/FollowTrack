import React, { useEffect, useState } from 'react'
import { prepareExpenseChartData } from '@/lib/helper'
import CustomBarchart from './CustomBarchart'

const Last30DaysExpensesChart = ({ data }) => {
    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseChartData(data)
        setChartData(result);

        return ()=>{}
    }, [data])
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>

            <CustomBarchart data={chartData} />
        </div>
    </div>
  )
}

export default Last30DaysExpensesChart