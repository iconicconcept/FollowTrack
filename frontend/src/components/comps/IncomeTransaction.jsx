import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import TransactionCard from './TransactionCard'
import { LuDownload } from 'react-icons/lu'

const IncomeTransaction = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5>Last 30days Incomes</h5>
  
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> DownLoad
            </button>
        </div>


        {transactions === 0 && ( 
          <div className='flex items-center justify-center text-sm text-gray-800 bg-gray-100/50 border border-gray-100 gap-4 mt-2 p-3 rounded-lg'>
            Add your first Income Transaction to get started
          </div> )
        }

        {transactions > 0 && (
          <div className="mt-5">
            {transactions.map((income)=> (
              <TransactionCard
                key={income._id}
                title={income.source}
                date={moment(income.date).format('DD MM YYYY')}
                amount={income.amount}
                type="income"
                onDelete={()=> onDelete(income._id)}
              />
            ))}
          </div>
        )}
    </div>
  )
}

export default IncomeTransaction