import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '@/lib/helper'
import CustomLinechart from './CustomLinechart'

const Last30DaysExpensesChart = ({ data }) => {
    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseLineChartData(data)
        setChartData(result);

        return ()=>{}
    }, [data])
  return (
    <div className='card'>
        <div className='flex flex-col justify-between'>
            <h5 className='text-[15px] mb-4'>Last 30 Days Expenses Chart</h5>

            <CustomLinechart data={chartData} />
        </div>
    </div>
  )
}

export default Last30DaysExpensesChart