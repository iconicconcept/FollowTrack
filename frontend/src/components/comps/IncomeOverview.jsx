import React, { useEffect, useState } from 'react'
import CustomBarchart from './CustomBarchart'
import { prepareIncomeBarChartData } from '@/lib/helper'
import { PlusIcon } from 'lucide-react'

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])

    useEffect(()=> {
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result)

        return ()=>{}
    }, [transactions])

  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <div className="">
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your Earnings over time and analyse income transactions</p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <PlusIcon className='size-4'/>
                Add Income
            </button>
        </div>

        <div className='mt-9'>
            <CustomBarchart
                data={chartData}
            />
        </div>
    </div>
  )
}

export default IncomeOverview