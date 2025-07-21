import AddIncomeForm from "@/components/comps/AddIncomeForm"
import DashboardLayout from "@/components/comps/DashboardLayout"
import DeleteAlert from "@/components/comps/DeleteAlert"
import IncomeList from "@/components/comps/IncomeList"
import IncomeOverview from "@/components/comps/IncomeOverview"
import IncomeTransaction from "@/components/comps/IncomeTransaction"
import Last30DaysIncomeChart from "@/components/comps/Last30DaysIncomeChart"
import Modal from "@/components/comps/Modal"
import { useUserAuth } from "@/hooks/useUserAuth"
import axiosInstance from "@/lib/axios"
import { LoaderIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

const Income = () => {
  useUserAuth();  //used to fetch user data, like the image and name
  const [loading, setLoading] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)


  //Get Incomes
  const fetchIncomeTransactions = async () =>{
    if(loading) return;
        setLoading(true)
    
        try{
          const response = await axiosInstance.get("/income/get")
    
          setIncomeData(response.data || [])
          toast.success("Welcome")
        } catch (error){
          console.error("Failed to fetch income data:", error);
          toast.error("Fail to fetch income data, refresh or try again later")
        } finally{
          setLoading(false)
        }
  }

  //Add Income
  const handleAddIncome = async (income) =>{
    const {source, amount, date} = income 
    
    //validation check
    if(!source.trim()){
      toast.error("source is required!")
      return
    }
 
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0")
      return
    }

    if(!date){
      toast.error("date is required!")
      return
    }

    try {
      await axiosInstance.post("/income/add", {
        source, amount, date
      })

      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeTransactions()

    } catch (error) {
      console.error("Failed to add income data:", error);
      toast.error("Fail to add income transaction, retry")
    }
  }
  
  //Delete Income
  const handleDeleteIncome = async (id) =>{ 
    try{
      await axiosInstance.delete(`/income/${id}`)

      setOpenDeleteAlert({ show: false, data: null});
      toast.success("Income detail deleted successfully")
      fetchIncomeTransactions();
    }  catch(error){
      console.error("Failed to add income data:", error);
      toast.error("Fail to add income transaction, retry")
    }
  }
  
  //Download Income Transactions
  const handleDownloadIncome = async () =>{ 
    try {
      const response = await axiosInstance.get("/income/downloadexcel",
        {responseType: 'blob',}
      );

      //create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download Income data:", error);
      toast.error("Fail to download Income transaction, retry")
    } 
  }
  
  useEffect(()=>{
    fetchIncomeTransactions();
    //return ()=>{}
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      {loading && <div className="w-full flex justify-center">
          <div className="text-center text-black z-30 py-10 flex gap-2 font-mono"><LoaderIcon className='animate-spin size-5 text-black'/>Loading income transactions...</div>
        </div>}
      {!loading &&<div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-5">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=> setOpenAddIncomeModal(true)}
            />
          </div>

          {/* last 30 days income */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <IncomeTransaction 
              transactions = {incomeData?.last30DaysIncome?.transactions || []}
              onDelete={(id)=> setOpenDeleteAlert({ show:true, data:id })}
              onDownload= {handleDownloadIncome}
            />

            <Last30DaysIncomeChart
              data={incomeData?.last30DaysIncome?.transactions || []}
            />  
          </div>

          {/* all income lists */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id)=> setOpenDeleteAlert({ show:true, data:id })}
            onDownload= {handleDownloadIncome}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title='Add Income'
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal
            isOpen={openDeleteAlert.show}
            onClose={()=> setOpenDeleteAlert({ show: false, data: null})}
            title='Delete Income'
          >
            <DeleteAlert 
              content='Are you sure you want to delete this income transaction detail?'
              onDelete={()=> handleDeleteIncome(openDeleteAlert.data)}
            />
        </Modal>
      </div>}
    </DashboardLayout>
  )
}

export default Income