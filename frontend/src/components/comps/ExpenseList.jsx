import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionCard from './TransactionCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-start'>
          <h5>All Expense Transactions</h5>

          {/* <button className='card-btn' onClick={onDownload}>
              <LuDownload className='text-base' /> DownLoad
          </button> */}
      </div>
      
      {transactions?.length === 0 && ( 
        <div className='flex items-center justify-center text-sm text-gray-900 bg-gray-100 border border-gray-100 gap-4 mt-2 p-3 rounded-lg'>
          Add your first Expense Transaction to get started
        </div> )
      }

        <div className='grid grid-cols-1 md:grid-cols-2'>
          {transactions.map((expense) => (
              <TransactionCard
                  key={expense._id}
                  title={expense.category}
                  date={moment(expense.date).format('DD MM YYYY')}
                  amount={expense.amount}
                  type='expense'
                  onDelete={()=> onDelete(expense._id)}
              />
          ))}
        </div>
  </div>
  )
}

export default ExpenseList