import { X } from 'lucide-react'
import React from 'react'

const Modal = ({ children, isOpen, onClose, title}) => {
    if(!isOpen) return null
  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* modal content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* modal header */}

                <div className="flex items-center justify-between p-3 md:p-4 borer-b rounded-t dark:border-gray-600 border-gray-200 ">
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white ml-2'>{title}</h3>
                    <button 
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer' 
                        type='button' 
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>

                {/* modal body */}
                <div className="p-3 md:p-4 space-y-3">{children}</div>
            </div>
        </div>
    </div>
  )
}

export default Modal