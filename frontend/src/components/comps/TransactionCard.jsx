import React from 'react'
import { Trash2, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from '../ui/button';

const TransactionCard = ({amount, type, description, title, date, hideDeleteBtn}) => {
    const getAmountStyles = ()=> type === 'income' ? "text-green-500" : "text-red-500"
  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-xl bg-gray-100">
            {type === 'income' ? (<TrendingUp className='size-4 text-green-600'/> ):(
                <TrendingDown className='size-4 text-red-600'/> )}
        </div>

        <div className="flex-1 flex items-center justify-between">
            <div>
                <p className='text-sm text-gray-700 font-medium'>{title}</p>
                <p className='text-xs  text-gray-400 mt-1'>{date}</p>
            </div>

            <div className='flex items-center'>
                <div className="flex flex-col justify-start items-center gap-2 px-3 py-1.5 rounded-md ${}">
                    <h6 className={`text-sm font-medium ${getAmountStyles()}`}>{type === 'income' ? '+' : '-'} ${amount}</h6>
                    <p className=''>{description}</p>
                </div>

                {hideDeleteBtn && (
                    <Button
                        variant="ghost"
                        size="sm"
                        //onClick={onDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    </div>
  )
}

export default TransactionCard