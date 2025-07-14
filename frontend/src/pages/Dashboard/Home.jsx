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
const Home = () => {
  useUserAuth();
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchDashboardData = async ()=>{
    if(loading) return;
    setLoading(true)

    try{
      const response = await axiosInstance.get("/dashboard/transactions")

      if(response.data){
        setDashboardData(response.data)
      }
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


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h2></h2>
      </div>
    );
  }
  return (
    <DashboardLayout activeMenu="Dashboard">
        {loading && <div className="w-full flex justify-center">
            <div className="text-center text-gray-200 py-10 flex gap-2 font-mono"><LoaderIcon className='animate-spin size-5 text-black'/>Loading events...</div>
          </div>}
      {!loading &&<div className="my-5 mx-auto">
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

        {/* last 30 days income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <RecentTransaction 
            transactions={dashboardData?.recentTransactions}
            onSeeMore={()=> navigate("/expense")}
          />

          <TransactionOverview 
            totalBalance = {dashboardData?.totalBalance || 0}
            totalIncome = {dashboardData?.totalIncome || 0}
            totalExpenses = {dashboardData?.totalExpenses || 0}
          />
        </div>
      </div>}
    </DashboardLayout>
  )
}

export default Home