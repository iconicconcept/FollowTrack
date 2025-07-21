import { useEffect, useState } from "react"
import CustomBarchart from "./CustomBarchart"
import { prepareIncomeBarChartData } from "@/lib/helper"

const Last30DaysIncomeChart = ({data}) => {
    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareIncomeBarChartData(data)
        setChartData(result);

        return ()=>{}
    }, [data])
  return (
    <div className='card'>
        <div className='flex flex-col justify-between'>
            <h5 className='text-lg'>Last 30 Days Incomes Chart</h5>

           <CustomBarchart data={chartData} />
        </div>
    </div>
  )
}

export default Last30DaysIncomeChart