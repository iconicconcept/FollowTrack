import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const AddIncomeForm = ({ onAddIncome, loading, setLoading }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: ""
    })
    const handleChange = (key, value)=> setIncome({...income, [key]: value});
  return (
    <div>
        <div className="space-y-2 relative mb-5">
            <Label htmlFor="source" className='ml-2'>Source</Label>
            <Input
                id='source'
                value={income.source}
                onChange={({target})=>handleChange("source", target.value)}
                label='Income Source'
                placeholder='Salary, Freelance etc'
                type="text"
            />
        </div>

        <div className="space-y-2 relative mb-5">
            <Label htmlFor="amount" className='ml-2'>Amount</Label>
            <Input
                id='amount'
                value={income.amount}
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
                className='cursor-pointer'
                value={income.date}
                onChange={({target})=>handleChange("date", target.value)}
                label='date'
                placeholder='DD-MM-YYYY'
                type="date"
            />
        </div>

        <div className="flex justify-end mt-5">
            <button
                type='button'
                className='add-btn add-btn-fill'
                disabled={loading}
                onClick={()=> {
                        onAddIncome(income)
                        setLoading(true)
                    }
                }
            >
                {loading? 'Adding...' : 'Add Income'}
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm