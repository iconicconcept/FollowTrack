import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'

const Navbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className='bg-background border border-b backdrop-blur-[2px] border-gray-300/50 px-7 py-4 flex gap-5 top-0 z-30'>
      <button
        className='block lg:hidden text-black'
        onClick={()=>{setOpenSidebar(!openSidebar)}}
      >
        {openSidebar ? (
            <X className="text-2xl cursor-pointer" />
          ) : (
            <Menu className="text-2xl cursor-pointer" />
          )}
      </button>

      <h2 className='text-2xl tracking-tight font-medium text-black'>FollowTrack</h2>

      {openSidebar && (
        <div className="fixed mt-12 -ml-6 bg-black">
          <Sidebar activeMenu={activeMenu}/>
        </div>
      )}
    </div>
  )
}

export default Navbar