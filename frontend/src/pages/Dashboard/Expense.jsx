import AddExpenseForm from "@/components/comps/AddExpenseForm";
import DashboardLayout from "@/components/comps/DashboardLayout";
import DeleteAlert from "@/components/comps/DeleteAlert";
import ExpenseList from "@/components/comps/ExpenseList";
import ExpenseOverview from "@/components/comps/ExpenseOverview";
import ExpenseTransaction from "@/components/comps/ExpenseTransaction";
import Last30DaysExpensesChart from "@/components/comps/Last30DaysExpensesChart";
import Modal from "@/components/comps/Modal";
import { useUserAuth } from "@/hooks/useUserAuth";
import axiosInstance from "@/lib/axios";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Expense = () => {
  useUserAuth();  //used for fetch user data, like the image and name

  const [loading, setLoading] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  //Get Expense
  const fetchExpenseTransactions = async () =>{
    if(loading) return;
        setLoading(true)
    
        try{
          const response = await axiosInstance.get("/expense/getExpense")
    
          if(response.data){
            setExpenseData(response.data)
          }
          toast.success("Welcome")
        } catch (error){
          console.error("Failed to fetch expense data:", error);
          toast.error("Fail to fetch expense data, refresh or try again later")
        } finally{
          setLoading(false)
        }
  }

  //Add Expense
  const handleAddExpense = async (expense) =>{
    const {category, amount, date} = expense 
    
    //validation check
    if(!category.trim()){
      toast.error("category is required!")
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
      //const date = new Date(date).toISOString().split("T")[0];

      await axiosInstance.post("/expense/addExpense", {
        category, amount, date
      })

      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseTransactions()

    } catch (error) {
      console.error("Failed to add Expense data:", error);
      toast.error("Fail to add Expense transaction, retry")
    }
  }
  
  //Delete Expense
  const handleDeleteExpense = async (id) =>{ 
    try{
      await axiosInstance.delete(`/expense/${id}`)

      setOpenDeleteAlert({ show: false, data: null});
      toast.success("Expense detail deleted successfully")
      fetchExpenseTransactions();
    }  catch(error){
      console.error("Failed to add Expense data:", error);
      toast.error("Fail to add Expense transaction, retry")
    }
  }
  
  //Download Expense Transactions
  const handleDownloadExpense = async () =>{  
    try {
      const response = await axiosInstance.get("/expense/downloadExcelExpense",
        {responseType: 'blob',}
      );

      //create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download Expense data:", error);
      toast.error("Fail to download Expense transaction, retry")
    }
  }

  useEffect(()=>{
      fetchExpenseTransactions();
      //return ()=>{}
    }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      {loading && <div className="w-full flex justify-center">
          <div className="text-center text-black z-30 py-10 flex gap-2 font-mono"><LoaderIcon className='animate-spin size-5 text-black'/>Loading income transactions...</div>
        </div>}
      {!loading &&<div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-5">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={()=> setOpenAddExpenseModal(true)}
            />
          </div>

          {/* last 30 days expense */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <Last30DaysExpensesChart
              data={expenseData?.last30DaysExpenses?.transactions || []}
            />  

            <ExpenseTransaction
              transactions = {expenseData?.last30DaysExpenses?.transactions || []}
              onDelete={(id)=> setOpenDeleteAlert({ show:true, data:id })}
              onDownload= {handleDownloadExpense}
            />
          </div>

          {/* all expense lists */}
            <ExpenseList
              transactions={expenseData}
              onDelete={(id)=> setOpenDeleteAlert({ show:true, data:id })}
              onDownload= {handleDownloadExpense}
            />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=>setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal
            isOpen={openDeleteAlert.show}
            onClose={()=> setOpenDeleteAlert({ show: false, data: null})}
            title='Delete Expense'
          >
            <DeleteAlert 
              content='Are you sure you want to delete this Expense transaction detail?'
              onDelete={()=> handleDeleteExpense(openDeleteAlert.data)}
            />
          </Modal>
      </div>}
    </DashboardLayout>
  )
}

export default Expense