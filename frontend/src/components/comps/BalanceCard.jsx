import React from 'react'

const BalanceCard = ({icon, value, label, color}) => {
  return (
    <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color}`}>
          {icon}
        </div>
        <div>
          <h1 className='text-sm text-gray-500 mb-1'>{label}</h1>
          <span className='text-[22px]'>${value}</span>
        </div>
    </div>
  )
}

export default BalanceCard