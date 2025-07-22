import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionCard from './TransactionCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-start'>
            <h5>Income Sources</h5>

            {/* <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> DownLoad
            </button> */}
        </div>


        {transactions.length === 0 && ( 
            <div className='flex items-center justify-center text-sm text-gray-700 gap-4 mt-8 p-3 rounded-lg'>
                Add your first Income Transaction to get started
            </div> )
        }

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((income) => (
                    <TransactionCard
                        key={income._id}
                        title={income.source}
                        date={moment(income.date).format('DD MM YYYY')}
                        amount={income.amount}
                        type='income'
                        onDelete={()=> onDelete(income._id)}
                    />
                ))}
            </div>
    </div>
  )
}

export default IncomeList