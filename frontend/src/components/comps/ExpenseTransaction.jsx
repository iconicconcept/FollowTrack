import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import TransactionCard from './TransactionCard'
import { LuDownload } from 'react-icons/lu'

const ExpenseTransaction = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5>Last 30days Expenses</h5>
  
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> DownLoad
            </button>
        </div>

        {transactions === 0 && ( 
          <div className='flex items-center justify-center text-sm text-gray-800 bg-gray-100/50 border border-gray-100 gap-4 mt-2 p-3 rounded-lg'>
            Add your first Expense Transaction to get started
          </div> )
        }

        {transactions > 0 && (
          <div className="mt-5">
            {transactions.map((expense)=> (
              <TransactionCard
                key={expense._id}
                title={expense.category}
                date={moment(expense.date).format('DD MM YYYY')}
                amount={expense.amount}
                type="expense"
                onDelete={()=> onDelete(expense._id)}
              />
            ))}
          </div>
        )}
    </div>
  )
}

export default ExpenseTransaction