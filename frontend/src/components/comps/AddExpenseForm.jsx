import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
          category: "",
          amount: "",
          date: ""
      })
    const handleChange = (key, value)=> setExpense({...expense, [key]: value});

    return (
      <div>
          <div className="space-y-2 relative mb-5">
              <Label htmlFor="category" className='ml-2'>Category</Label>
              <Input
                  id='category'
                  value={expense.category}
                  onChange={({target})=>handleChange("category", target.value)}
                  label='Expense Category'
                  placeholder='Food, Rent, Entertainment etc'
                  type="text"
              />
          </div>
  
          <div className="space-y-2 relative mb-5">
              <Label htmlFor="amount" className='ml-2'>Amount</Label>
              <Input
                  id='amount'
                  value={expense.amount}
                  onChange={({target})=>handleChange("amount", target.value)}
                  label='Amount'
                  placeholder='Amount'
                  type="text"
              />
          </div>
  
          <div className="space-y-2 relative mb-5">
              <Label htmlFor="date" className='ml-2'>Date</Label>
              <Input
                  id='date'
                  value={expense.date}
                  onChange={({target})=>handleChange("date", target.value)}
                  label='date'
                  placeholder='DD-MM-YYYY'
                  type="text"
              />
          </div>
  
          <div className="flex justify-end mt-5">
              <button
                  type='button'
                  className='add-btn add-btn-fill'
                  onClick={()=> onAddExpense(expense)}
              >
                  Add Expense
              </button>
          </div>
      </div>
  )
}

export default AddExpenseForm