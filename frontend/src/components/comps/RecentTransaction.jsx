import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionCard from './TransactionCard';
import moment from 'moment';

const RecentTransaction = ({transactions, onSeeMore}) => {

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5>Recent Transactions</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <ArrowRight className='text-black size-4 hover:text-green-700'/>
            </button>
        </div>

        <div className="mt-5">
          {transactions?.slice(0, 5)?.map((item)=> (
            <TransactionCard
              key={item._id}
              title={item.type == 'expense' ? item.category : item.source}
              description={item.description}
              date={moment(item.date).format('DD MM YYYY')}
              amount={item.amount}
              hideDeleteBtn
            />
          ))}
        </div>
    </div>
  )
}

export default RecentTransaction