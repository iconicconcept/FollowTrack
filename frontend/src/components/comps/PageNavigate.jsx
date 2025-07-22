import React from 'react'

const PageNavigate = ({ content, navigate }) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-5'>
            <div className='flex gap-4'>

            {/* income */}
                <button
                    type='button'
                    className='income-nav-btn'
                    onClick={() => navigate('income')}
                >
                    Income
                </button>

            {/* expense */}
                <button
                    type='button'
                    className='expense-nav-btn'
                    onClick={() => navigate('expense')}
                >
                    Expense
                </button>

            </div>
        </div>
    </div>
  )
}

export default PageNavigate