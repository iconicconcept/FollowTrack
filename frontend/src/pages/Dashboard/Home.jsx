import { useUserAuth } from "@/hooks/useUserAuth"
import DashboardLayout from "../../components/comps/DashboardLayout"
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import BalanceCard from "@/components/comps/BalanceCard";
import { addThousandsSeparator } from "@/lib/helper";
const Home = () => {
  useUserAuth();
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  //const navigate = useNavigate()

  const fetchDashboardData = async ()=>{
    if(loading) return;
    setLoading(true)

    try{
      const response = await axiosInstance.get("/dashbaord/transactions")

      if(response.data){
        setDashboardData(response.data)
      }
      toast.success("Welcome")
    } catch{
      console.log("something went wrong");
      toast.error("Fail to fetch dashboard data, refresh or try again later")
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDashboardData();
    return ()=>{};
  })
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* balance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BalanceCard 
            icon={Wallet}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="text-primary"
          />

          <BalanceCard 
            icon={TrendingUp}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="text-green-600"
          />

          <BalanceCard 
            icon={TrendingDown}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="text-red-600"
          />
        </div>

        {/* last 30 days income */}
        <div></div>
      </div>
    </DashboardLayout>
  )
}

export default Home