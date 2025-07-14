import React from 'react'

const customTooltip = ({active, payload}) => {
    if(active && payload && payload.length){
        return(
            <div className='bg-white shadow-md rounded-lg border border-gray-300 '>
                <p className='text-xs font-semibold text-green-600 mb-1'>{payload[0].name}</p>
                <p className='text-sm text-gray-600'>Amount: 
                    <span className='ext-sm font-medium text-gray-900'>₦{payload[0].value}</span>
                </p>
            </div>
        )
    }
  return (
    <div>customTooltip</div>
  )
}

export default customTooltip