import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const Navbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { openTransactionModal, isTransactionModalOpen } = useModal();
  const [openTransactionModal, setOpenTransactionModal] = useState(false)

  return (
    <div className='bg-background border border-b backdrop-blur-[2px] border-gray-300/50 px-7 fixed w-full py-4 flex justify-between items-center top-0 z-30 '>

      {/* Name and toggle */}
      <div className='flex gap-4'>
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
      <button className='nav-btn add-btn-fill'
        onClick={openTransactionModal}
      >
         Add Transaction
      </button>

      {/* <Modal
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
      </Modal> */}


      {openSidebar && (
        <div className="fixed top-16 -ml-4 bg-white">
          <Sidebar activeMenu={activeMenu}/>
        </div>
      )}
    </div>
  )
}

export default Navbar