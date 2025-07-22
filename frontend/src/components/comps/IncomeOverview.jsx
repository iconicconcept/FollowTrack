import React, { useEffect, useState } from 'react'
import CustomBarchart from './CustomBarchart'
import { prepareIncomeBarChartData } from '@/lib/helper'
import { PlusIcon } from 'lucide-react'

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
    try {
      const result = prepareIncomeBarChartData(transactions);
      setChartData(result);
      setError(null);
    } catch (err) {
      console.error("Error preparing income chart data:", err);
      setError("Error loading chart data.");
      setChartData([]);
    }
    return () => {};
  }, [transactions]);

  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <div className="">
                <h5 className='text-lg'>OverAll Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your Earnings over time and analyse income transactions</p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <PlusIcon className='size-4'/>
                Add Income
            </button>
        </div>

        <div className='mt-9'>
            {error? <p className="text-red-500">{error}</p> : <CustomBarchart
                data={chartData}
            /> }
        </div>
    </div>
  )
}

export default IncomeOverview