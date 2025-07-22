import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'
import Modal from './Modal'
import PageNavigate from './PageNavigate'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const Navbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  //const [transactionType, setTransactionType] = useState(null);
  const [openTransactionModal, setOpenTransactionModal] = useState(false)

  return (
    <>
    <div className='bg-background border border-b backdrop-blur-[2px] border-gray-300/50 px-3 md:px-7 lg:px-7 fixed w-full py-4 flex justify-between items-center top-0 z-99 '>

      <div className='flex items-center justify-between w-full max-w-[1250px] mx-auto'>
        {/* Name and toggle */}
        <div className='flex gap-2 md:gap-4'>
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

          <h2 className='text-2xl tracking-tight font-medium text-green-800'>FollowTrack</h2>
        </div>

        {/* button to income and expense */}
        {location.pathname==='/dashboard' && <button className='nav-btn add-btn-fill px-1 md:px-4'
          onClick={()=> setOpenTransactionModal(true)}
        >
          Add Transaction
        </button>}


        {openSidebar && (
          <div className="fixed top-16 -ml-4 bg-white">
            <Sidebar activeMenu={activeMenu}/>
          </div>
        )}
      </div>

    </div>
      <Modal
        isOpen={openTransactionModal}
        onClose={()=> setOpenTransactionModal(false)}
        title='Add new Transaction'
      >
        <PageNavigate
          content="Choose the type of transaction to add:"
          navigate={(type) => {
            navigate(`/${type}`);
            setOpenTransactionModal(false);
          }}
        />
      </Modal>
      </>
  )
}

export default Navbar