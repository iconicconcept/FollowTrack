import React from 'react'
import {
    Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

const CustomLinechart = ({data}) => {

    const CustomToolTip = ({ active, payload}) => {
        if(active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-green-800 mb-1'>{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className='text-sm font-medium text-gray-800'>₦{payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

  return (
    <>
        {data?.length === 0 && ( 
          <div className='flex items-center justify-center text-sm text-gray-600 gap-4 mt-13 px-2 rounded-lg'>
            Add your first Expense Transaction to get started
          </div> )
        }

    <div className='bg-white mt-1'>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id='incomeGradient' xl='0' yl='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#875cf5' stopOpacity={0.4} />
                        <stop offset='95%' stopColor='#875cf5' stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid stroke='none' />

                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#555" }} stroke='none' />
                <YAxis tick={{ fontSize: 11, fill: "#555" }} stroke='none' />

                <Tooltip content={CustomToolTip} />

                <Area
                    type='monotone'
                    dataKey="amount"
                    stroke='#875cf5'
                    fill='url(#incomeGradient)'
                    strokeWidth={3}
                    dot={{ r: 3, fill: "#ab8df8" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
    </>
  )
}

export default CustomLinechart