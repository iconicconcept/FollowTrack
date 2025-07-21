import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts"

const CustomBarchart = ({ data }) => {
    // function to alternate colors
    const getColor = (index) =>{
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    };

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
    <div className='bg-white mt-5'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke='none' />

                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#555" }} stroke='none' />
                <YAxis tick={{ fontSize: 11, fill: "#555" }} stroke='none' />

                <Tooltip content={CustomToolTip} />

                <Bar
                    dataKey="amount"
                    fill='#22c55e'
                    radius={[10, 10, 0, 0]}
                    activeDot={{ r: 6, fill: "#fff" }}
                    activeStyle={{ fill: "#16a34a" }}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={getColor(index)}/>
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarchart