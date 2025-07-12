import React, { useContext } from 'react'
import { Sidebar_Data } from '@/utils/data'
import { UserContext } from '@/context/UserContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from './CharAvatar'

const Sidebar = ({ activeMenu }) => {
  const {user, clearUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleClick = (route)=>{
    if(route=== "logout"){
      handleLogout();
      return;
    }

    navigate(route)
  }

  const handleLogout = ()=>{
    localStorage.clear()
    clearUser();
    navigate("/login")
  }

  return (
    <div className='w-60 h-[calc(100vh-61px)] bg-white border border-gray-200/50 p-5 sticky top-[61px] z-20'>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-5'>
          {user?.profileImageUrl ? (
            <img src={user?.profileImageUrl || ""}
            alt="Profile image"
            className='w-17 h-17 bg-slate-600 rounded-full' />
          ): <CharAvatar
              fullName={user?.fullName}
              width="w-17"
              height="h-17"
              style="text-xl"
            />
          }

          <h5 className='text-green-800 leading-6'>
            {user?.fullName || ""}
          </h5>
        </div>

        {Sidebar_Data.map((item, index)=>(
          <button 
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? 
              "text-white bg-green-700" : "text-green-800"} py-3 px-6 rounded-lg md-3`}
              onClick={()=>handleClick(item.path)}
          >
            <item.icon className='text-xl'/>
            {item.label}
          </button>
        ))}

    </div>
  )
}

export default Sidebar