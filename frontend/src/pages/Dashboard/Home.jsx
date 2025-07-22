import { useUserAuth } from "@/hooks/useUserAuth"
import DashboardLayout from "../../components/comps/DashboardLayout"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import BalanceCard from "@/components/comps/BalanceCard";
import { addThousandsSeparator } from "@/lib/helper";
import RecentTransaction from "@/components/comps/RecentTransaction";
import TransactionOverview from "@/components/comps/TransactionOverview";
// import ExpenseTransaction from "@/components/comps/ExpenseTransaction";
// import Last30DaysExpensesChart from "@/components/comps/Last30DaysExpensesChart";
// import IncomeTransaction from "@/components/comps/IncomeTransaction";
// import Last30DaysIncomeChart from "@/components/comps/Last30DaysIncomeChart";

const Home = () => {
  useUserAuth();  //used to fetch user data, like the image and name
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchDashboardData = async ()=>{
    if(loading) return;
    setLoading(true)

    try{
      const response = await axiosInstance.get("/dashboard/transactions")

      setDashboardData(response.data || null)
      toast.success("Welcome")

      } catch (error){
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Fail to fetch dashboard data, refresh or try again later")
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDashboardData();
  }, [])  


  return (
    <DashboardLayout activeMenu="Dashboard">
      {loading && <div className="w-full flex justify-center">
          <div className="text-center text-black py-10 flex gap-2 font-mono z-30"><LoaderIcon className='animate-spin size-5 text-black z-30'/>Loading dashboard data...</div>
        </div>}
      {!loading && <div className="my-5 mx-auto">
        {/* balance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BalanceCard 
            icon={<Wallet className="size-5"/>}
            label={"Total Balance"}
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            className="bg-purple-700"
          />

          <BalanceCard 
            icon={<TrendingUp className="size-5"/>}
            label="Total Income"
            value={dashboardData?.totalIncome || 0}
            className="bg-green-600"
          />

          <BalanceCard 
            icon={<TrendingDown className="size-5"/>}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            className="bg-red-600"
          />
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <RecentTransaction 
            transactions={dashboardData?.recentTransactions}
            onSeeMore={()=> navigate("/expense")}
          />

          <TransactionOverview 
            totalBalance = {dashboardData?.totalBalance || 0}
            totalIncome = {dashboardData?.totalIncome || 0}
            totalExpenses = {dashboardData?.totalExpenses || 0}
          />


          {/* last 30 days income $ expenses
          Expenses
          <ExpenseTransaction 
            transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore = {()=> navigate("/expense")}
          />

          <Last30DaysExpensesChart
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          Income
          <IncomeTransaction 
            transactions = {dashboardData?.last30DaysIncome?.transactions || []}
            onSeeMore = {()=> navigate("/income")}
          />

          <Last30DaysIncomeChart
            data={dashboardData?.last30DaysIncome?.transactions || []}
          /> */}

        </div>
      </div>}
    </DashboardLayout>
  )
}

export default Home