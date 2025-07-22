import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/Auth/Register"
import Home from "./pages/Dashboard/Home"
import Expense from "./pages/Dashboard/Expense"
import Income from "./pages/Dashboard/Income"
import UserProvider from "./context/UserContext"



const App = () => (
      <UserProvider>
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route path="/auth" element={<Register />}/>
          <Route path="/dashboard" element={<Home />}/>
          <Route path="/income" element={<Income />}/>
          <Route path="/expense" element={<Expense />}/>
        </Routes>
      </UserProvider>
  )


const Root = ()=>{
  //check if token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token")

  //Redirect to dashboard if authenticated, if not, direct to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/auth" />
  )
}

export default App